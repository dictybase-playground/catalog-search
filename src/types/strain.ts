type Strain = {
  id: string
  label: string
  summary: string
  in_stock: boolean
}

type ListStrainsData = {
  nextCursor: number
  totalCount: number
  strains: Array<Strain>
}

type StrainLists = {
  listStrains: ListStrainsData
}

export type { Strain, ListStrainsData, StrainLists }
