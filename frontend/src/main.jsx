
import { createRoot } from 'react-dom/client'
import './index.css'
import { Store } from './store/Store.jsx'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
    <Provider store={Store}>


    <BrowserRouter>
    
    <App /> 
    </BrowserRouter>
    </Provider>

)
