import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomeP/HomePage'
import RegisterPage from './pages/RegisterP/RegisterPage'  
import packageJson from '../package.json'; 
import NotFoundPage from './pages/WrongP/NotFoundPage'
import { AuthWrapper } from './pages/LoginP/AuthWrapper'

function App() {  
  return (
    <> 
    <BrowserRouter>
      <Routes>
        <Route index path='/' element={<HomePage />} key="home"  />
        <Route path='Home' element={<HomePage />} key="home"  />
        <Route path='Login' element={<AuthWrapper />} key="login" />
        <Route path='Register' element={<RegisterPage />} key="register"  />
        <Route path='User/*' element={<AuthWrapper />} key="user" /> 
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
    <footer >
        v.{packageJson.version}&nbsp;&nbsp;<i>&#169;</i>2024&nbsp;
    </footer> 
    </>
  )
}

export default App