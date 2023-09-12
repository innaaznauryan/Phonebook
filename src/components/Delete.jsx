import React from 'react'

const Delete = ({id, exit, func, isLoaded, info}) => {

  return (
    <>
        <h3>Are you sure you want to delete this contact?</h3>
        <p className={isLoaded ? " animated" : ""}>{info.fname}</p>
        <p className={isLoaded ? " animated" : ""}>{info.lname}</p>
        <p className={isLoaded ? " animated" : ""}>{info.phone}</p>
        <p className={isLoaded ? " animated" : ""}>{info.bday}</p>
        <div>
            <button className='btnModal' onClick={()=> exit({mode: false, id: null})}>Cancel</button>
            <button className='btnModal' onClick={() => func(id)}>Delete</button>
        </div>
    </>
  )
}

export default Delete