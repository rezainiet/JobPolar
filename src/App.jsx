
import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import FooterLinks from './components/FooterLinks/FooterLinks'

function App() {


  return (
    <div>
    <Navbar/>
    <Outlet/>
    {/* <FooterLinks/> */}
    </div>
  )
}

export default App
