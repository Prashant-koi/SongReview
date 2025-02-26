import {BrowserRouter,  Routes, Route } from 'react-router-dom'
import HeroSection from './pages/herosection'
import MainLayout from './components/MainLayout'
import AuthLayout from './components/AuthLayout';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element = {<MainLayout />} >
      <Route index element = {<HeroSection />} />
      </Route>

      <Route element={<AuthLayout />}>
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element= {<SignUp />} />
      </Route>
    </Routes>
    </BrowserRouter>
      </>

    
  )
}

export default App;

