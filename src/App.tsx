import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/login/LoginPage'
import HomePage from './pages/home/HomePage'
import RegisterPage from './pages/register/RegisterPage' 
import LoggedContentPage from './pages/User/LoggedContentPage'

function App() { 
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route index path='/' element={<HomePage />} key="home" />
        <Route path='Home' element={<HomePage />} key="home" />
        <Route path='Login' element={<LoginPage />} key="login" />
        <Route path='Register' element={<RegisterPage />} key="register" />
        <Route path='User' element={<LoggedContentPage />} key="user" />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App