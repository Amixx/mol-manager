import { useContext, useState } from 'react'
import { SupplierContext } from '../state'
import { useNavigate, useRouteLoaderData } from 'react-router-dom'
import Button from '../components/Button'
import { modalStyles } from '../utils'
//@ts-ignore
import Modal from 'react-modal'
import readXlsxFile from 'read-excel-file'
import { Catalog } from '../types'

export default function Supplier() {
  const navigate = useNavigate()
  const supplierId = useRouteLoaderData('supplier')
  const supplierContext = useContext(SupplierContext)
  const supplier = supplierContext.suppliers.find(
    (supplier) => supplier.id === supplierId
  )

  const [showCatalogUploadModal, setShowCatalogUploadModal] = useState(false)
  const [catalogFile, setCatalogFile] = useState<File | null>(null)
  const closeCatalogUploadModal = () => {
    setShowCatalogUploadModal(false)
    setCatalogFile(null)
  }
  const addCatalog = async (e: MouseEvent) => {
    e.preventDefault()
    if (!catalogFile) return

    try {
      const rows = await readXlsxFile(catalogFile)
      const catalogItems = rows.slice(1).map(
        (row) =>
          ({
            molportId: row[0],
            supplier: row[1],
            smiles: row[2],
            sellUnit: row[3],
            measure: row[4],
            price: row[5],
            directShippingTime: row[6],
            directShippingPrice: row[7]
          }) as Catalog
      )
      supplierContext.suppliers = supplierContext.suppliers.map((s) =>
        s.id === supplierId ? { ...s, catalog: catalogItems } : s
      )
    } catch (e) {
      console.error(e)
    }

    closeCatalogUploadModal()
  }

  return (
    <>
      {supplier ? (
        <>
          <section>
            <div className="flex items-center justify-between gap-2">
              <h1 className="flex items-center gap-4 text-h1">
                <Button
                  className="text-xl"
                  variant="secondary"
                  title="Go back"
                  onClick={() => navigate(-1)}
                >
                  &lt;
                </Button>
                <span>{supplier.name}</span>
              </h1>
              <Button onClick={() => setShowCatalogUploadModal(true)}>
                Upload catalog
              </Button>
            </div>
          </section>
          <section className="mt-8 flex">
            <div className="mr-16 shrink-0 border-r border-r-purple pr-16">
              <p>
                Country: <span className="font-bold">{supplier.country}</span>
              </p>
              <p>
                Website:&nbsp;
                <a className="font-bold" href={supplier.websiteUrl}>
                  {supplier.websiteUrl}
                </a>
              </p>
            </div>
            {supplier.catalog ? (
              <table className="text-left">
                <thead>
                  <tr>
                    <th className="px-2">Molport ID</th>
                    <th className="px-2">Supplier</th>
                    <th className="px-2">SMILES</th>
                    <th className="px-2">Sell unit</th>
                    <th className="px-2">Measure</th>
                    <th className="px-2">Price</th>
                    <th className="px-2">Direct shipping time</th>
                    <th className="px-2">Direct shipping price</th>
                  </tr>
                </thead>
                <tbody>
                  {supplier.catalog.map((item, index) => (
                    <tr key={index}>
                      <td className="border px-2 py-1">{item.molportId}</td>
                      <td className="border px-2 py-1">{item.supplier}</td>
                      <td className="border px-2 py-1">{item.smiles}</td>
                      <td className="border px-2 py-1 text-right">
                        {item.sellUnit}
                      </td>
                      <td className="border px-2 py-1">{item.measure}</td>
                      <td className="border px-2 py-1 text-right">
                        {item.price}
                      </td>
                      <td className="border px-2 py-1 text-right">
                        {item.directShippingTime}
                      </td>
                      <td className="border px-2 py-1 text-right">
                        {item.directShippingPrice}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div>No catalog provided yet!</div>
            )}
          </section>
          <Modal
            isOpen={showCatalogUploadModal}
            onRequestClose={() => setShowCatalogUploadModal(false)}
            contentLabel="Upload catalog"
            style={modalStyles}
          >
            <h2 className="text-h2">Upload catalog</h2>
            <form className="mt-8 flex flex-col gap-2">
              <div>
                <label className="flex items-center gap-4">
                  Catalog file (XLSX)
                  <input
                    className="flex-1 rounded border border-dark-light bg-light px-2 py-1"
                    onChange={(e) =>
                      setCatalogFile(e.target.files?.[0] ?? null)
                    }
                    type="file"
                    accept=".xlsx"
                  />
                </label>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  className="mt-4 flex-1"
                  onClick={closeCatalogUploadModal}
                >
                  Cancel
                </Button>
                <Button className="mt-4 flex-1" onClick={(e) => addCatalog(e)}>
                  Submit
                </Button>
              </div>
            </form>
          </Modal>
        </>
      ) : (
        <div>Supplier not found</div>
      )}
    </>
  )
}
