export declare namespace AppStrainTypes {
  export interface Strain {
    id: string
    label: string
    summary: string
    in_stock: boolean
  }

  export interface ListStrainsData {
    nextCursor: number
    totalCount: number
    strains: Strain[]
  }

  export interface StrainLists {
    listStrains: ListStrainsData
  }
}


