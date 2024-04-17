import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/login/LoginPage'
import HomePage from './pages/home/HomePage'
import RegisterPage from './pages/register/RegisterPage'

function App() { 
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route index path='/' element={<HomePage />} key="home" />
        <Route path='Home' element={<HomePage />} key="home" />
        <Route path='Login' element={<LoginPage />} key="login" />
        <Route path='Register' element={<RegisterPage />} key="register" />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App