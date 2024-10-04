import readXlsxFile from 'read-excel-file'
import { Catalog } from '../types'

export const readCatalogFromFile = async (
  file: Parameters<typeof readXlsxFile>[0]
) => {
  try {
    const rows = await readXlsxFile(file)
    return rows.slice(1).map(
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
  } catch (e) {
    console.error(e)
  }
}
