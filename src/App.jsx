import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import  Home from './Pages/Home'
import  Addblogs from './Pages/Addblogs'
import  Feeds from './Pages/Feeds'
import Footer from './Pages/Footer'
import Profile from './Components/Profile'
import Authorization from './Components/Autherization'
import Editblog from './Pages/Editblog'
import { useState } from 'react'

export default function App() {

  let [SearchValue, setSearchValue] = useState('')
  return (
    <div>
      <BrowserRouter>

      <Navbar setSearchValue={setSearchValue}/>

      <Routes>

        <Route path='/' element={<Home SearchValue={SearchValue}/>} />
        <Route path='/addblog' element={<Addblogs/>} />
        <Route path='/feed' element={<Feeds/>} />
        <Route path='/authorization' element={<Authorization/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/editblog/:id' element={<Editblog/>} />

      </Routes>

      <Footer/>
      
      </BrowserRouter>
    </div>
  )
}
