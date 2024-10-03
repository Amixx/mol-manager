import logo from '../assets/logo.svg'
import { useContext } from 'react'
import { SupplierContext } from '../state'

export default function Home() {
  const supplierContext = useContext(SupplierContext)

  return (
    <>
      <header>
        <div className="container flex justify-between gap-4 bg-purple-pale px-8 py-4">
          <div>
            <img src={logo} alt="Molport logo" height="57" width="192" />
          </div>
        </div>
      </header>
      <section>
        <div className="container">
          <h1 className="text-h1">This is a h1</h1>
          <h2 className="text-h2">This is a h2</h2>
          <h3 className="text-h3">This is a h3</h3>
          <h4 className="text-h4 font-medium">This is a h4</h4>
          <h5 className="text-h5">This is a h5</h5>
          <h6 className="text-h6">This is a h6</h6>
        </div>
      </section>
      <section>
        {supplierContext.suppliers.map((supplier, index) => (
          <div key={index}>
            <h2>{supplier.name}</h2>
            <p>{supplier.country}</p>
            <a href={supplier.websiteUrl}>{supplier.websiteUrl}</a>
          </div>
        ))}
      </section>
    </>
  )
}
