import {auth, createUserWithEmailAndPassword} from "../firebase"
import "./auth.scss"

const Signup = ({setSignedin}) => {
    const handleSubmit = (e) => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        createUserWithEmailAndPassword(auth, email, password)
        .then(cred => {
            setSignedin(true)
        })
        .catch(error => console.log(error))
        .finally(() => e.target.reset())
    }

  return (
    <>
        <h2>Sign up to use Phonebook!</h2>
        <form action="" className='signup' onSubmit={handleSubmit}>
            <label htmlFor="email">email:</label>
            <input type="email" name='email' id="email"/>
            <label htmlFor="password">password:</label>
            <input type="password" name='password' id="password"/>
            <button type='submit' className="btn">Sign up</button>
        </form>
    </>
  )
}

export default Signup