type ListStrainsData = {
  nextCursor: number
  totalCount: number
  strains: Array<{
    id: string
    label: string
    summary: string
    in_stock: boolean
  }>
}

type ListAllStrains = {
  listStrains: ListStrainsData
}

type ListRegularStrains = {
  listRegularStrains: ListStrainsData
}

type ListGWDIStrains = {
  listGWDIStrains: ListStrainsData
}

type ListStrainsInventory = {
  listStrainsInventory: ListStrainsData
}

type ListBacterialStrains = {
  listBacterialStrains: ListStrainsData
}

type StrainLists =
  | ListAllStrains
  | ListRegularStrains
  | ListGWDIStrains
  | ListStrainsInventory
  | ListBacterialStrains

export type { ListStrainsData, StrainLists }
