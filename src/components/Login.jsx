import {auth, signInWithEmailAndPassword} from "../firebase"
import "./auth.scss"

const Login = ({setSignedin}) => {
    const handleSubmit = (e) => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        signInWithEmailAndPassword(auth, email, password)
        .then(cred => {
            setSignedin(true)
        })
        .catch(error => console.log(error))
        .finally(() => e.target.reset())
    }
  return (
    <>
    <h2>Have an account? Sign in!</h2>
    <form action="" className='login' onSubmit={handleSubmit}>
        <label htmlFor="email">email:</label>
        <input type="email" name='email' id="email"/>
        <label htmlFor="password">password:</label>
        <input type="password" name='password' id="password"/>
        <button type='submit' className="btn">Sign in</button>
    </form>
    </>
  )
}

export default Login