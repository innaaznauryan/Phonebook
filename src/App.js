import React from 'react'
import List from './components/List'
import "./App.scss"

const App = () => {
  return (
    <>
      <header>
        <h1>Phonebook</h1>
      </header>
      <List />
      <footer>
        <p className='bold'>&copy; Inna Aznauryan 2023</p>
        <p className='small'>No rights reserved</p>
      </footer>
    </>
  )
}

export default App