import {useState} from "react"
import {useNavigate} from "react-router-dom"
import {auth, signInWithEmailAndPassword} from "../firebase"

const Login = ({setSignedin}) => {

    const [wrongcred, setWrongcred] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        signInWithEmailAndPassword(auth, email, password)
        .then(cred => {
            setSignedin(true)
            navigate("/")
        })
        .catch(error => {
          console.log(error)
          setWrongcred(true)
        })
        .finally(() => e.target.reset())
    }

  return (
    <>
    <h4>Have an account? Sign in!</h4>
    <form action="" className='login' onSubmit={handleSubmit}>
        <label htmlFor="email">email:</label>
        <input type="email" name='email' id="email" autoComplete="username"/>
        <label htmlFor="password">password:</label>
        <input type="password" name='password' id="password" autoComplete="current-password"/>
        <button type='submit' className="btn">Sign in</button>
    </form>
    <div className="error">{wrongcred ? "Wrong Login or Password!" : ""}</div>
    </>
  )
}

export default Login