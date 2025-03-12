import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HeroSection from './pages/herosection';
import MainLayout from './components/MainLayout';
import AuthLayout from './components/AuthLayout';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            <Route index element={<HeroSection />} />
            {/* Add the dashboard route here as a nested route */}
            <Route path='dashboard' element={
              <ProtectedRoute>
                <div>Protected Dashboard Content</div>
              </ProtectedRoute>
            } />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

