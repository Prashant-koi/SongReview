import BrowserRouter, { Routes } from 'react-router-dom'
import Navbar from './components/navbar'
import HeroSection from './components/herosection'
import Layout from './components/Layout'

export default function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element = {<Layout />} />
      <Route index element = {<HeroSection />} />
    </Routes>
    </BrowserRouter>
      <Navbar/>
      
        <HeroSection />
      
      </>

    
  )
}

