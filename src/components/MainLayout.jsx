import {useEffect, useState} from "react"
import {Routes, Route, Link, useLocation} from "react-router-dom"
import {auth, signOut, onAuthStateChanged} from "../firebase"
import Login from './Login'
import Signup from './Signup'
import List from "./List"
import "./mainLayout.scss"

const MainLayout = () => {

    const [signedin, setSignedin] = useState()
    const [documentPath, setDocumentPath] = useState("phonebook")
    const location = useLocation()

    const handleClick = () => {
      signOut(auth)
      .then(() => setSignedin(false))
      .catch((error) => console.log(error))
    }

    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if(user) setDocumentPath("users/" + user.uid + "/phonebook")
        else {
      setDocumentPath("phonebook")
        }
      })
    }, [])

  return (
    <div className="authLayout">
        <div className="navbtns">
            <h3>Save your phone contacts with us!</h3>
            <button className="btn auth"><Link to="/signup">Sign Up</Link></button>
            {!signedin && <button className="btn auth"><Link to="/login">Sign In</Link></button>}
            {signedin && <button className="btn auth exit" onClick={handleClick}>Sign out</button>}
            {location.pathname != "/" && <button className="btn auth"><Link to="/">Home</Link></button>}
        </div>

        <Routes>
            <Route index element={<List documentPath={documentPath} />}></Route>
            <Route path='/login' element={<Login setSignedin={setSignedin} />}></Route>
            <Route path='/signup' element={<Signup setSignedin={setSignedin} />}></Route>
        </Routes>
    </div>
  )
}

export default MainLayout