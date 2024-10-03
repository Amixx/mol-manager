import { createContext } from 'react'
import { Supplier } from './types/Supplier'

export const SupplierContext = createContext({
  suppliers: [] as Supplier[]
})
