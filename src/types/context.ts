export declare namespace AppContextTypes {
  export interface QueryVariables {
    cursor: number
    limit: number
  }

  export interface QueryVariablesWithFilter extends QueryVariables {
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
    queryVariables: QueryVariablesWithFilter
  }

  export enum CatalogActionType {
    SET_PRESET_FILTER = "SET_PRESET_FILTER",
    SET_ACTIVE_FILTERS = "SET_ACTIVE_FILTERS",
    SET_QUERY_VARIABLES = "SET_QUERY_VARIABLES",
  }

  /* export interface Action {
    type: CatalogActionType
    payload: string | string[] | QueryVariables
  } */

  export type Action =
    | { type: CatalogActionType.SET_PRESET_FILTER, payload: string }
    | { type: CatalogActionType.SET_ACTIVE_FILTERS, payload: string[] }
    | { type: CatalogActionType.SET_QUERY_VARIABLES, payload: QueryVariablesWithFilter }

  export interface CatalogContextProps {
    state: CatalogState
    dispatch: React.Dispatch<Action>
  }
}
