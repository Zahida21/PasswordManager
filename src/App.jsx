import { useState } from 'react'
import Navbar from './components/Navbar'
import './App.css'
import Manager from './components/Manager'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    <div className='bg-[radial-gradient(circle_800px_at_100%_200px,#e0f7fa,transparent)]'>

  <Manager/>
    </div>
  <Footer/>   
 </>
  )
}

export default App
