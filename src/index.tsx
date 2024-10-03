import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './style.css'
import HomePage from './routes/Home'
import SupplierPage from './routes/Supplier'
import { SupplierContext } from './state'
import { Supplier } from './types/Supplier'

const router = createBrowserRouter([
  {
    path: '/',
    Component: HomePage
  },
  {
    id: 'supplier',
    path: 'supplier/:id',
    Component: SupplierPage,
    loader: (args) => {
      const idAsInt = parseInt(args.params.id ?? '')
      return isNaN(idAsInt) ? null : idAsInt
    }
  }
])

const initialSuppliers: Supplier[] = [
  {
    id: 1,
    name: 'ChemDiv, Inc.',
    country: 'United States',
    websiteUrl: 'http://www.chemdiv.com/'
  },
  {
    id: 2,
    name: 'BIONET - Key Organics Ltd.',
    country: 'United Kingdom',
    websiteUrl: 'http://www.keyorganics.net/'
  },
  {
    id: 3,
    name: 'AnalytiCon Discovery - a Division of BRAIN Biotech AG',
    country: 'Germany',
    websiteUrl: 'http://www.ac-discovery.com/'
  }
]

createRoot(document.getElementById('root') as HTMLElement).render(
  <SupplierContext.Provider value={{ suppliers: initialSuppliers }}>
    <RouterProvider router={router} />
  </SupplierContext.Provider>
)
