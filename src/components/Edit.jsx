import {useState, useEffect} from 'react'
import "./edit.scss"

const Edit = ({data, id, exit, editPerson, error}) => {

    const [editInfo, setEditInfo] = useState(() => {
        const {fname, lname, phone, bday} = data.find(elem => elem.id == id)
        return {
            fname: fname[0].toUpperCase() + fname.slice(1).toLowerCase(),
            lname: lname[0].toUpperCase() + lname.slice(1).toLowerCase(),
            phone: phone, 
            bday: bday
        }
    })
    const [isLoaded, setIsLoaded] = useState(false)

    const handleEditChange = (e) => {
        setEditInfo({...editInfo, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        setIsLoaded(true)
        return () => setIsLoaded(false)
    }, [])
    
  return (
    <>
    <div className="veil"></div>
    <div className='modal'>
        <h2>Edit</h2>
        <form action="" onSubmit={(e) => editPerson(e, id)}>
            <input className={isLoaded ? "animated" : ""} onChange={handleEditChange} name="fname" type="text" value={editInfo.fname}/>
            <input className={isLoaded ? "animated" : ""} onChange={handleEditChange} name="lname" type="text" value={editInfo.lname}/>
            <input className={isLoaded ? "animated" : ""} onChange={handleEditChange} name="phone" type="text" value={editInfo.phone}/>
            <input className={isLoaded ? "animated" : ""} onChange={handleEditChange} name="bday" type="text" value={editInfo.bday}/>
            <button className='edit' type="button" onClick={()=> exit({mode: false, id: null})}>Cancel</button>
            <button className='edit' type="submit">Save</button>
        </form>
        <div className="error">{error.edit && <p>{error.edit}</p>}</div>
    </div>
    </>
  )
}

export default Edit