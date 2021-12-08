export declare namespace AppContextTypes {
  export interface QueryVariables {
    cursor: number
    limit: number
    filter: {
      label?: string
      summary?: string
      id?: string
      in_stock?: boolean
      strain_type: string
    }
  }

  export interface CatalogState {
    presetFilter: string
    activeFilters: string[]
    queryVariables: QueryVariables
  }

  export enum CatalogActionType {
    SET_PRESET_FILTER = "SET_PRESET_FILTER",
    SET_ACTIVE_FILTERS = "SET_ACTIVE_FILTERS",
    SET_QUERY_VARIABLES = "SET_QUERY_VARIABLES",
  }

  export interface Action {
    type: CatalogActionType.SET_PRESET_FILTER | CatalogActionType.SET_ACTIVE_FILTERS | CatalogActionType.SET_QUERY_VARIABLES
    payload: string | string[] | QueryVariables
  }

  export interface CatalogContextProps {
    state: CatalogState
    dispatch: React.Dispatch<Action>
  }
}
