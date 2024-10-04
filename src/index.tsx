import { createRoot } from 'react-dom/client'
//@ts-ignore
import Modal from 'react-modal'
Modal.setAppElement('#root')
import './style.css'
import App from './App'

createRoot(document.getElementById('root') as HTMLElement).render(<App />)
