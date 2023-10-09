import {useNavigate} from "react-router-dom"
import {auth, createUserWithEmailAndPassword} from "../firebase"

const Signup = ({setSignedin}) => {
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        createUserWithEmailAndPassword(auth, email, password)
        .then(cred => {
            setSignedin(true)
            navigate("/")
        })
        .catch(error => console.log(error))
        .finally(() => e.target.reset())
    }

  return (
    <>
        <h4>Sign up to use Phonebook!</h4>
        <form action="" className='signup' onSubmit={handleSubmit}>
            <label htmlFor="email">email:</label>
            <input type="email" name='email' id="email" autoComplete="username"/>
            <label htmlFor="password">password:</label>
            <input type="password" name='password' id="password" autoComplete="current-password"/>
            <button type='submit' className="btn">Sign up</button>
        </form>
        <div className="error"></div>
    </>
  )
}

export default Signup