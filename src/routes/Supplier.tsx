import { useContext } from 'react'
import { SupplierContext } from '../state'
import { useRouteLoaderData } from 'react-router-dom'

export default function Supplier() {
  const supplierId = useRouteLoaderData('supplier')
  const supplier = useContext(SupplierContext).suppliers.find(
    (supplier) => supplier.id === supplierId
  )

  return (
    <>
      {supplier ? (
        <div>
          <h2>{supplier.name}</h2>
          <p>{supplier.country}</p>
          <a href={supplier.websiteUrl}>{supplier.websiteUrl}</a>
        </div>
      ) : (
        <div>Supplier not found</div>
      )}
    </>
  )
}
