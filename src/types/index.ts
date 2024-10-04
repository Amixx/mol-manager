export type Supplier = {
  id: number
  name: string
  country: string
  websiteUrl: string
  catalog?: Catalog[]
}

export type Catalog = {
  molportId: string
  supplier: string
  smiles: string
  sellUnit: number
  measure: string
  price: number
  directShippingTime: number
  directShippingPrice: number
}
