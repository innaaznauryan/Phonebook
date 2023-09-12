import {useState, useEffect, cloneElement} from 'react'
import "./modal.scss"

const Modal = ({data, id, exit, func, error, children}) => {

    const [info, setInfo] = useState(() => {
        const {fname, lname, phone, bday} = data.find(elem => elem.id == id)
        return {fname, lname, phone, bday}
    })

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        setIsLoaded(true)
        return () => setIsLoaded(false)
    }, [])

  return (
    <>
        <div className="veil"></div>
        <div className="modal">
            {children && cloneElement(children, {id, exit, func, error, isLoaded, info, setInfo})}
        </div>
    </>
  )
}

export default Modal