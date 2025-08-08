
import { Route, Routes } from 'react-router-dom'
import AuthPage from '../pages/AuthPage'
import Home from '../pages/Home'
import ProcessPage from '../pages/ProcessPage'


const MainRoute = () => {
  return (
    <Routes>
        <Route path='/auth' element={<AuthPage/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/process' element={<ProcessPage/>}/>
    </Routes>
  )
}

export default MainRoute