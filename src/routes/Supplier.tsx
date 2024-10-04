import { useContext, useState } from 'react'
import { SupplierContext } from '../state'
import { useNavigate, useRouteLoaderData } from 'react-router-dom'
import Button from '../components/Button'

export default function Supplier() {
  const navigate = useNavigate()

  const supplierId = useRouteLoaderData('supplier')
  const supplier = useContext(SupplierContext).suppliers.find(
    (supplier) => supplier.id === supplierId
  )

  const [showCatalogUploadModal, setShowCatalogUploadModal] = useState(false)

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
          <section className="mt-4 flex">
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
            <div>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Consequatur deleniti eligendi facere fugit ipsum, perferendis sed
              similique. Nisi, quidem sed.
            </div>
          </section>
        </>
      ) : (
        <div>Supplier not found</div>
      )}
    </>
  )
}
