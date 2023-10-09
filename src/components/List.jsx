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
    getDocs,
    onSnapshot,
    addDoc,
    deleteDoc,
    updateDoc,
    query,
    where,
    orderBy
} from "../firebase"
import Modal from './Modal'
import Delete from './Delete'

const List = ({documentPath, signedin}) => {
   
    const range = 5
    const [data, setData] = useState([])
    const [editMode, setEditMode] = useState({mode: false, id: null})
    const [deleteMode, setDeleteMode] = useState({mode: false, id: null})
    const [error, setError] = useState({add: null, edit: null})
    const [searchQuery, setSearchQuery] = useState("")
    const [arrows, setArrows] = useState({})
    const [pageNumber, setPageNumber] = useState(0)

    useEffect(() => {
        const collectionRef = collection(db, documentPath)
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
    }, [pageNumber, searchQuery, documentPath])

    const validate = (phone, date, type) => {
        const isValidPhone = /^\+\d{11}$/.test(phone)
        const isValidDate = /^(0[1-9]|[12]\d|3[01])-(0[1-9]|1[0-2])-(19\d{2}|20[01]\d|202[0-2])$/.test(date)
        if (!isValidPhone || !isValidDate) {
            setError({...error, [type]: isValidPhone ? "Please use this date format: 'DD-MM-YYYY'" : "Please use this phone format: '+37400000000'"})
            setTimeout(() => setError({...error, [type]: null}), 2000);
            return false
        }
        return true
    }

    const format = (string) => {
        return string[0].toUpperCase() + string.slice(1).toLowerCase()
    }
    
    const addPerson = (e) => {
        e.preventDefault()
        const {fname, lname, phone, bday} = {...Object.fromEntries([...new FormData(e.target)])}
        if (validate(phone, bday, "add")) {
            const collectionRef = collection(db, documentPath)
            const queryData = query(collectionRef,
            where("fname", "==", format(fname)),
            where("lname", "==", format(lname)),
            where("phone", "==", phone))
            getDocs(queryData)
            .then(querySnapshot => {
                if(querySnapshot.docs.length == 0) return addDoc(collectionRef, {fname: format(fname), lname: format(lname), phone, bday})
                else {
                    setError({...error, add: "This contact already exists!"})
                    setTimeout(() => setError({...error, add: null}), 2000);
                }
            })
            .then(() => {})
            .catch(error => console.log(error))
            .finally(() => e.target.reset())
        }
    }

    const openEditModal = (id) => {
        setEditMode({mode: true, id})
    }

    const openDeleteModal = (id) => {
        setDeleteMode({mode: true, id})
    }

    const editPerson = (e, id) => {
        e.preventDefault()
        const {fname, lname, phone, bday} = {...Object.fromEntries([...new FormData(e.target)])}
        if (validate(phone, bday, "edit")) {
            const documentRef = doc(db, documentPath, id)
            updateDoc(documentRef, {fname: format(fname), lname: format(lname), phone, bday})
            .then(() => {
                e.target.reset()
                setEditMode({mode: false, id: null})
            })
            .catch(error => console.log(error))
        }
    }

    const deletePerson = (id) => {
        const documentRef = doc(db, documentPath, id)
        deleteDoc(documentRef)
        .then(() => setDeleteMode({mode: false, id: null}))
        .catch(error => console.log(error))
    }

  return (
  <>
    {!signedin && <h4>Sign up to store your contacts</h4>}

    {signedin && <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} setPageNumber={setPageNumber} />}

    <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} arrows={arrows} />

    <div className='person header'>
        <div className='layout heading'>First Name</div>
        <div className='layout heading'>Last Name</div>
        <div className='layout heading'>Phone Number</div>
        <div className='layout heading'>Date of Birth</div>
        {signedin && <div className='layout heading'>Actions</div>}
    </div>

    {data.map(({id, fname, lname, phone, bday}) => {
        return <div key={id} className='person'>
            <div className='layout'><span>{fname}</span></div>
            <div className='layout'><span>{lname}</span></div>
            <div className='layout'><span>{phone}</span></div>
            <div className='layout'><span>{bday}</span></div>
            {signedin && <div className='controls layout'>
                <AiFillEdit className='edit' onClick={() => openEditModal(id)}/>
                <AiFillDelete className='delete' onClick={() => openDeleteModal(id)}/>
            </div>}
        </div>
    })}

    {signedin && <Form addPerson={addPerson} />}

    <div className="error">{error.add && <p>{error.add}</p>}</div>

    {editMode.mode && <Modal data={data} id={editMode.id} exit={setEditMode} func={editPerson} error={error}>
        <Edit />
    </Modal>}

    {deleteMode.mode && <Modal data={data} id={deleteMode.id} exit={setDeleteMode} func={deletePerson}>
        <Delete />
    </Modal>}
  </>
  )
}

export default List