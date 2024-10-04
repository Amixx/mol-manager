import { createBrowserRouter } from 'react-router-dom'
import HomePage from './routes/Home'
import ErrorPage from './routes/ErrorPage'
import SupplierPage from './routes/Supplier'

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

export default router
