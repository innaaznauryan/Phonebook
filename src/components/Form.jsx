import React from 'react'

const Form = ({addPerson}) => {
  return (
    <form onSubmit={(e) => addPerson(e)}>
        <fieldset className='person'>
            <input type='text' name='fname' id='fname' placeholder='First Name' required/>
            <input type='text' name='lname' id='lname' placeholder='Last Name' required/>
            <input type='text' name='phone' id='phone' placeholder='Phone Number' required/>
            <input type='text' name='bday' id='bday' placeholder='Date of Birth' required/>
            <div><button type='submit' className='btn'>Add Number</button></div>
        </fieldset>
    </form>
  )
}

export default Form