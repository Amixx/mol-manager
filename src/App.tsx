import logo from './assets/logo.svg'
import { SupplierContext } from './state'
import { RouterProvider } from 'react-router-dom'
import { Supplier } from './types'
import { useEffect, useState } from 'react'
import router from './router'
import { createInitialSuppliers } from './data'

export default function App() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([])

  useEffect(() => {
    createInitialSuppliers().then(setSuppliers)
  }, [])

  return (
    <>
      <header>
        <div className="container flex justify-between gap-4 border-b border-b-purple bg-purple-pale py-4">
          <a href="/">
            <img src={logo} alt="Molport logo" height="57" width="192" />
          </a>
        </div>
      </header>
      <div className="container py-2">
        <SupplierContext.Provider value={{ suppliers }}>
          <RouterProvider router={router} />
        </SupplierContext.Provider>
      </div>
    </>
  )
}
