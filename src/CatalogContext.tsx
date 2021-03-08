import React from "react"
import {
  CatalogState,
  CatalogActionType,
  Action,
  CatalogContextProps,
} from "./types/context"

const initialState = {
  /** Value of preset filter dropdown menu */
  presetFilter: "Filters",
  /** List of active filters shown in search box (as tags) */
  activeFilters: [],
  /** Corresponding filter to use for GraphQL query */
  graphQLFilter: "",
}

const catalogReducer = (state: CatalogState, action: Action) => {
  switch (action.type) {
    case CatalogActionType.SET_PRESET_FILTER:
      return {
        ...state,
        presetFilter: action.payload,
      }
    case CatalogActionType.SET_ACTIVE_FILTERS:
      return {
        ...state,
        activeFilters: action.payload,
      }
    case CatalogActionType.SET_GRAPHQL_FILTER:
      return {
        ...state,
        graphQLFilter: action.payload,
      }
    default:
      return state
  }
}

const CatalogContext = React.createContext({} as CatalogContextProps)

/**
 * CatalogProvider contains global state used for the stock catalog pages.
 */
const CatalogProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = React.useReducer(catalogReducer, initialState)

  return (
    <CatalogContext.Provider value={{ state, dispatch }}>
      {children}
    </CatalogContext.Provider>
  )
}

const useCatalogStore = () => {
  const { state, dispatch } = React.useContext(CatalogContext)

  const setPresetFilter = (presetFilter: string) =>
    dispatch({
      type: CatalogActionType.SET_PRESET_FILTER,
      payload: presetFilter,
    })

  const setActiveFilters = (activeFilters: string[]) =>
    dispatch({
      type: CatalogActionType.SET_ACTIVE_FILTERS,
      payload: activeFilters,
    })

  const setGraphQLFilter = (graphQLFilter: string) =>
    dispatch({
      type: CatalogActionType.SET_PRESET_FILTER,
      payload: graphQLFilter,
    })

  return {
    state,
    setPresetFilter,
    setActiveFilters,
    setGraphQLFilter,
  }
}

export { CatalogContext, CatalogProvider, useCatalogStore }
