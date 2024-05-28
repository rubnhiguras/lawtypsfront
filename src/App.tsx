import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/login/LoginPage'
import HomePage from './pages/home/HomePage'
import RegisterPage from './pages/register/RegisterPage' 
import LoggedContentPage from './pages/User/LoggedContentPage'
import packageJson from '../package.json'; 
import NotFoundPage from './pages/notFound/NotFoundPage'

function App() { 

  //const copyright = <i>&#169;&nbsp;2024&nbsp;</i>;

  let version = packageJson.version; 

  return (
    <> 
    <BrowserRouter>
      <Routes>
        <Route index path='/' element={<HomePage />} key="home"  />
        <Route path='Home' element={<HomePage />} key="home"  />
        <Route path='Login' element={<LoginPage />} key="login"  />
        <Route path='Register' element={<RegisterPage />} key="register"  />
        <Route path='User' element={<LoggedContentPage />} key="user" />
        <Route path='User/*' element={<LoggedContentPage />} key="user" />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
    <footer >
        v.{version} 
    </footer>
    </>
  )
}

export default App