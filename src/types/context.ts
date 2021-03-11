type QueryVariables = {
  cursor: number
  limit: number
  filter?: string
  stock_type?: string
}

type CatalogState = {
  presetFilter: string
  activeFilters: string[]
  queryVariables: QueryVariables
}

enum CatalogActionType {
  SET_PRESET_FILTER = "SET_PRESET_FILTER",
  SET_ACTIVE_FILTERS = "SET_ACTIVE_FILTERS",
  SET_QUERY_VARIABLES = "SET_QUERY_VARIABLES",
}

type Action =
  | {
      type: CatalogActionType.SET_PRESET_FILTER
      payload: string
    }
  | {
      type: CatalogActionType.SET_ACTIVE_FILTERS
      payload: string[]
    }
  | {
      type: CatalogActionType.SET_QUERY_VARIABLES
      payload: QueryVariables
    }

type CatalogContextProps = {
  state: CatalogState
  dispatch: React.Dispatch<Action>
}

export type { CatalogState, Action, CatalogContextProps, QueryVariables }
export { CatalogActionType }
