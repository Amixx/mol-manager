import { createRoot } from 'react-dom/client'
//@ts-expect-error The modal package does not have types
import Modal from 'react-modal'
Modal.setAppElement('#root')
import './style.css'
import App from './App'

createRoot(document.getElementById('root') as HTMLElement).render(<App />)
