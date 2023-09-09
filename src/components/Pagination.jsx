import {BsFillArrowLeftSquareFill, BsFillArrowRightSquareFill} from "react-icons/bs"
import "./pagination.scss"

const Pagination = ({pageNumber, setPageNumber, arrows} ) => {

    const handleClick = (type) => {
        switch(type) {
            case "DECREMENT":
                setPageNumber(p => p - 1)
                break
            case "INCREMENT":
                setPageNumber(p => p + 1)
                break
            default:
                setPageNumber(p => p)
        }
    }

  return (
    <div className="pagination">
        <span className="arrows">
            {arrows.DECREMENT && <BsFillArrowLeftSquareFill className="left" onClick={()=> handleClick("DECREMENT")}/>}

            {(arrows.DECREMENT || arrows.INCREMENT) && <span>{pageNumber + 1}</span>}

            {arrows.INCREMENT && <BsFillArrowRightSquareFill className='right' onClick={()=> handleClick("INCREMENT")}/>}
        </span>
    </div>
  )
}

export default Pagination