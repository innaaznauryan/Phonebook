import "./search.scss"

const Search = ({searchQuery, setSearchQuery}) => {

  const searchPerson = (e) => {
    e.preventDefault()
    const {search} = Object.fromEntries([...new FormData(e.target)])
    setSearchQuery(search.trim())
  }

  const goBack = () => {
    setSearchQuery("")
  }

  return (
    <div className="searchDiv">
        {searchQuery && <button className="btn" onClick={() => goBack()}>Go back</button>}
        <form action="" onSubmit={searchPerson}>
            <input type="text" id='search' name='search' placeholder='Search for someone awesome!'/>
            <button type='submit' className='btn'>Search</button>
        </form>
    </div>
  )
}

export default Search