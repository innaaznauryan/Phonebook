import {useState, useEffect} from 'react'
import Edit from './Edit'
import Search from './Search'
import Form from './Form'
import Pagination from './Pagination'
import "./list.scss"
import {AiFillDelete, AiFillEdit} from "react-icons/ai"
import {
    db, 
    collection,
    doc,
    onSnapshot,
    addDoc,
    deleteDoc,
    updateDoc,
    query,
    orderBy
} from "../firebase"

const List = () => {
   
    const range = 5
    const [data, setData] = useState([])
    const [editMode, setEditMode] = useState({mode: false, id: null})
    const [error, setError] = useState({add: null, edit: null})
    const [searchQuery, setSearchQuery] = useState("")
    const [arrows, setArrows] = useState({})
    const [pageNumber, setPageNumber] = useState(0)

    useEffect(() => {
        const collectionRef = collection(db, "phonebook")
        const orderedCol = query(collectionRef, orderBy("fname", "asc"), orderBy("lname", "asc"))
        try {
            const unsubscribe = onSnapshot(orderedCol, snapshot => {
                const phonebook = []
                if (searchQuery) {
                    const lowerCasedSearchQuery = searchQuery.toLowerCase()
                    snapshot.docs.forEach(doc => {
                        const fname = doc.data().fname.toLowerCase()
                        const lname = doc.data().lname.toLowerCase()
                        if(fname.includes(lowerCasedSearchQuery) || lname.includes(lowerCasedSearchQuery)){
                          phonebook.push({...doc.data(), id: doc.id})
                        }
                    })
                    setArrows({DECREMENT: false, INCREMENT: false})
                } else {
                    const docs = snapshot.docs.slice(pageNumber * range, pageNumber * range + range)
                    docs.forEach(doc => {
                        phonebook.push({...doc.data(), id: doc.id})
                    })
                    setArrows({
                        DECREMENT: pageNumber <= 0 ? false : true,
                        INCREMENT: pageNumber + 1 >= Math.ceil((snapshot.docs.length / range)) ? false : true
                    })
                }
                setData(phonebook)
            })
            return () => unsubscribe()
        }
        catch (error) {
            console.log(error)
        }
    }, [pageNumber, searchQuery])

    const validate = (phone, date, type) => {
        const isValidPhone = /^\+\d{11}$/.test(phone)
        const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(date)
        if (!isValidPhone || !isValidDate) {
            setError({...error, [type]: isValidPhone ? "Wrong date format!" : "Wrong phone format!"})
            setTimeout(() => setError({...error, [type]: null}), 2000);
            return false
        }
        return true
    }

    const addPerson = (e) => {
        e.preventDefault()
        const {phone, bday} = e.target
        if (validate(phone.value, bday.value, "add")) {
            const newPerson = {...Object.fromEntries([...new FormData(e.target)])}
            const collectionRef = collection(db, "phonebook")
            addDoc(collectionRef, newPerson)
            .then(() => e.target.reset())
            .catch(error => console.log(error))
        }
    }

    const openEditModal = (id) => {
        setEditMode({mode: true, id})
    }

    const editPerson = (e, id) => {
        e.preventDefault()
        const {phone, bday} = e.target
        if (validate(phone.value, bday.value, "edit")) {
            const renewed = {...Object.fromEntries([...new FormData(e.target)])}
            const documentRef = doc(db, "phonebook", id)
            updateDoc(documentRef, renewed)
            .then(() => {
                e.target.reset()
                setEditMode({mode: false, id: null})
            })
            .catch(error => console.log(error))
        }
    }

    const deletePerson = (id) => {
        const documentRef = doc(db, "phonebook", id)
        deleteDoc(documentRef)
        .then(() => console.log(id))
        .catch(error => console.log(error))
    }

  return (
  <>
    <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} setPageNumber={setPageNumber} />

    <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} arrows={arrows} />

    <div className='person header'>
        <div className='layout heading'>First Name</div>
        <div className='layout heading'>Last Name</div>
        <div className='layout heading'>Phone Number</div>
        <div className='layout heading'>Date of Birth</div>
        <div className='layout heading'>Actions</div>
    </div>

    {data.map(({id, fname, lname, phone, bday}) => {
        return <div key={id} className='person'>
            <div className='layout'><span>{fname[0].toUpperCase() + fname.slice(1).toLowerCase()}</span></div>
            <div className='layout'><span>{lname[0].toUpperCase() + lname.slice(1).toLowerCase()}</span></div>
            <div className='layout'><span>{phone}</span></div>
            <div className='layout'><span>{bday}</span></div>
            <div className='controls layout'>
                <AiFillEdit className='edit' onClick={() => openEditModal(id)}/>
                <AiFillDelete className='delete' onClick={() => deletePerson(id)}/>
            </div>
        </div>
    })}

    <Form addPerson={addPerson} />

    <div className="error">{error.add && <p>{error.add}</p>}</div>

    {editMode.mode && <Edit data={data} id={editMode.id} exit={setEditMode} editPerson={editPerson} error={error} />}
  </>
  )
}

export default List