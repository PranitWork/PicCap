
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import ProcessPage from '../pages/ProcessPage'
import LoginPage from '../pages/Loginpage'
import RegisterPage from '../pages/RegisterPage'


const MainRoute = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/process' element={<ProcessPage/>}/>
        <Route path='*' element={<div>404 Not Found</div>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
    </Routes>
  )
}

export default MainRoute