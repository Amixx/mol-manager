import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './style.css'
import HomePage from './routes/Home'
import SupplierPage from './routes/Supplier'
import { SupplierContext } from './state'
import { Supplier } from './types/Supplier'
import ErrorPage from './routes/ErrorPage'
import logo from './assets/logo.svg'

const router = createBrowserRouter([
  {
    path: '/',
    Component: HomePage,
    errorElement: <ErrorPage />
  },
  {
    id: 'supplier',
    path: 'supplier/:id',
    Component: SupplierPage,
    errorElement: <ErrorPage />,
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
  <>
    <header>
      <div className="container flex justify-between gap-4 border-b border-b-purple bg-purple-pale py-4">
        <a href="/">
          <img src={logo} alt="Molport logo" height="57" width="192" />
        </a>
      </div>
    </header>
    <div className="container py-2">
      <SupplierContext.Provider value={{ suppliers: initialSuppliers }}>
        <RouterProvider router={router} />
      </SupplierContext.Provider>
    </div>
  </>
)
