import { createContext } from 'react'
import { Supplier } from '../types'

export const SupplierContext = createContext({
  suppliers: [] as Supplier[]
})
