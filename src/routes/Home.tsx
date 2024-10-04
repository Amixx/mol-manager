import { useContext, useState } from 'react'
import { SupplierContext } from '../state'
import Button from '../components/Button'
import { Link } from 'react-router-dom'
//@ts-ignore
import Modal from 'react-modal'
Modal.setAppElement('#root')

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '4px',
    padding: '16px'
  }
}

export default function Home() {
  const supplierContext = useContext(SupplierContext)
  const [showSupplierModal, setShowSupplierModal] = useState(false)
  const closeSupplierModal = () => {
    setShowSupplierModal(false)
    setNewSupplier({ name: '', country: '', websiteUrl: '' })
  }

  const [newSupplier, setNewSupplier] = useState({
    name: '',
    country: '',
    websiteUrl: ''
  })
  const addSupplier = () => {
    supplierContext.suppliers = [
      ...supplierContext.suppliers,
      { id: supplierContext.suppliers.length + 1, ...newSupplier }
    ]
    closeSupplierModal()
  }

  return (
    <>
      <section>
        <div className="flex items-center justify-between gap-2">
          <h1 className="text-h1">Suppliers</h1>
          <Button onClick={() => setShowSupplierModal(true)}>
            Add supplier
          </Button>
        </div>
      </section>
      <section className="mt-4">
        <table className="text-left">
          <thead>
            <tr>
              <th className="px-2">Name</th>
              <th className="px-2">Country</th>
              <th className="px-2">Website</th>
              <th className="px-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {supplierContext.suppliers.map((supplier, index) => (
              <tr key={index}>
                <td className="border px-2 py-1">{supplier.name}</td>
                <td className="border px-2 py-1">{supplier.country}</td>
                <td className="border px-2 py-1">
                  <a
                    href={supplier.websiteUrl}
                    target="_blank"
                    className="underline"
                    rel="noreferrer"
                  >
                    {supplier.websiteUrl}
                  </a>
                </td>
                <td className="border px-2 py-1 ">
                  <Link className="underline" to={`/supplier/${supplier.id}`}>
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <Modal
        isOpen={showSupplierModal}
        onRequestClose={() => setShowSupplierModal(false)}
        contentLabel="Add supplier"
        style={customStyles}
      >
        <h2 className="text-h2">Add supplier</h2>
        <form className="mt-8 flex flex-col gap-2">
          <div>
            <label className="flex items-center gap-4">
              Name
              <input
                className="flex-1 rounded border border-dark-light bg-light px-2 py-1"
                value={newSupplier.name}
                onChange={(e) =>
                  setNewSupplier({ ...newSupplier, name: e.target.value })
                }
                type="text"
              />
            </label>
          </div>
          <div>
            <label className="flex items-center gap-4">
              Country
              <input
                className="flex-1 rounded border border-dark-light bg-light px-2 py-1"
                value={newSupplier.country}
                onChange={(e) =>
                  setNewSupplier({ ...newSupplier, country: e.target.value })
                }
                type="text"
              />
            </label>
          </div>
          <div>
            <label className="flex items-center gap-4">
              Website URL
              <input
                className="flex-1 rounded border border-dark-light bg-light px-2 py-1"
                value={newSupplier.websiteUrl}
                onChange={(e) =>
                  setNewSupplier({ ...newSupplier, websiteUrl: e.target.value })
                }
                type="text"
              />
            </label>
          </div>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              className="mt-4 flex-1"
              onClick={closeSupplierModal}
            >
              Cancel
            </Button>
            <Button className="mt-4 flex-1" onClick={addSupplier}>
              Submit
            </Button>
          </div>
        </form>
      </Modal>
    </>
  )
}
