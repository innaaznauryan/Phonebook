import React from 'react'

const Edit = ({id, exit, func, error, isLoaded, info, setInfo}) => {

    const handleEditChange = (e) => {
        setInfo({...info, [e.target.name]: e.target.value})
    }
    
  return (
    <>
        <h2>Edit</h2>
        <form action="" onSubmit={(e) => func(e, id)}>
            <input className={isLoaded ? "animated" : ""} onChange={handleEditChange} name="fname" type="text" value={info.fname}/>
            <input className={isLoaded ? "animated" : ""} onChange={handleEditChange} name="lname" type="text" value={info.lname}/>
            <input className={isLoaded ? "animated" : ""} onChange={handleEditChange} name="phone" type="text" value={info.phone}/>
            <input className={isLoaded ? "animated" : ""} onChange={handleEditChange} name="bday" type="text" value={info.bday}/>
            <button className='btnModal' type="button" onClick={()=> exit({mode: false, id: null})}>Cancel</button>
            <button className='btnModal' type="submit">Save</button>
        </form>
        <div className="error">{error.edit && <p>{error.edit}</p>}</div>
    </>
  )
}

export default Edit