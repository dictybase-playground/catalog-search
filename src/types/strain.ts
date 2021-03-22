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

type StrainLists = {
  listStrains: ListStrainsData
}

export type { ListStrainsData, StrainLists }
