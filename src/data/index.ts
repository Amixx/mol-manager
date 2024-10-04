import { Catalog, Supplier } from '../types'
import { readCatalogFromFile } from '../utils/xlsx'

export async function createInitialSuppliers() {
  const initialSuppliers: Supplier[] = [
    {
      id: 1,
      name: 'ChemDiv, Inc.',
      country: 'United States',
      websiteUrl: 'http://www.chemdiv.com/'
    },
    {
      id: 2,
      name: 'BIONET - Key Organics Ltd.',
      country: 'United Kingdom',
      websiteUrl: 'http://www.keyorganics.net/'
    },
    {
      id: 3,
      name: 'AnalytiCon Discovery - a Division of BRAIN Biotech AG',
      country: 'Germany',
      websiteUrl: 'http://www.ac-discovery.com/'
    }
  ]

  return await Promise.all(
    initialSuppliers.map(async (supplier) => {
      const supplierCatalogFilePath = `/src/data/catalogs/${supplier.name}.xlsx`

      let catalogItems: Catalog[] | undefined
      try {
        const catalogFile = await fetch(supplierCatalogFilePath)
        catalogItems = await readCatalogFromFile(
          await catalogFile.arrayBuffer()
        )
      } catch (e) {
        console.error(e)
      }

      return { ...supplier, catalog: catalogItems }
    })
  )
}
