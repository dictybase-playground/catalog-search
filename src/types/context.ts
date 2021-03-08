type CatalogState = {
  presetFilter: string
  activeFilters: string[]
  graphQLFilter: string
}

enum CatalogActionType {
  SET_PRESET_FILTER = "SET_PRESET_FILTER",
  SET_ACTIVE_FILTERS = "SET_ACTIVE_FILTERS",
  SET_GRAPHQL_FILTER = "SET_GRAPHQL_FILTER",
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
      type: CatalogActionType.SET_GRAPHQL_FILTER
      payload: string
    }

type CatalogContextProps = {
  state: CatalogState
  dispatch: React.Dispatch<Action>
}

export type { CatalogState, Action, CatalogContextProps }
export { CatalogActionType }
