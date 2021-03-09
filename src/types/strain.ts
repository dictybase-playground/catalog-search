type ListStrains = {
  nextCursor: number
  totalCount: number
  strains: Array<{
    id: string
    label: string
    summary: string
    in_stock: boolean
  }>
}

export type { ListStrains }
