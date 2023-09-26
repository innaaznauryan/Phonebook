import MainLayout from './components/MainLayout'
import "./App.scss"


const App = () => {
  return (
    <>
      <header>
        <h1>Phonebook</h1>
      </header>

      <MainLayout />
      
      <footer>
        <p className='bold'>&copy; Inna Aznauryan 2023</p>
        <p className='small'>No rights reserved</p>
      </footer>
    </>
  )
}

export default App