import { MouseEvent, useContext, useState } from 'react'
import { SupplierContext } from '../state'
import { useNavigate, useRouteLoaderData } from 'react-router-dom'
import Button from '../components/Button'
import { modalStyles } from '../utils/modal'
//@ts-expect-error The modal package does not have types
import Modal from 'react-modal'
import { readCatalogFromFile } from '../utils/xlsx'

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
  const addCatalog = async (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if (!catalogFile) return

    const catalogItems = await readCatalogFromFile(catalogFile)

    if (catalogItems) {
      supplierContext.suppliers = supplierContext.suppliers.map((s) =>
        s.id === supplierId ? { ...s, catalog: catalogItems } : s
      )
    }

    closeCatalogUploadModal()
  }

  return (
    <>
      {supplier ? (
        <>
          <section>
            <h1 className="flex items-center gap-2 text-h1">
              <Button
                className="mr-2 flex size-8 items-center text-xl"
                variant="secondary"
                title="Go back"
                onClick={() => navigate(-1)}
              >
                &lt;
              </Button>
              <span className="flex-1 truncate">{supplier.name}</span>
              <Button onClick={() => setShowCatalogUploadModal(true)}>
                Upload catalog
              </Button>
            </h1>
          </section>
          <section className="mt-8 flex flex-col gap-y-4 lg:flex-row">
            <div className="mr-16 shrink-0 border-r-purple pr-16 lg:border-r">
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
              <div className="overflow-x-auto">
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
              </div>
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
            <p className="mt-4 max-w-screen-sm">
              Provide the catalog file for this supplier. If a catalog is
              currently provided, the new catalog will overwrite it. Only the
              XLSX file format is supported!
            </p>
            <form className="mt-8 flex flex-col gap-2">
              <div>
                <label className="flex items-center gap-4">
                  Catalog file
                  <input
                    className="flex-1 rounded border border-dark-pale px-2 py-1"
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
