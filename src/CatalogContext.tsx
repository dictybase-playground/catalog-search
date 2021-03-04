import React from "react"
import {
  CatalogState,
  CatalogActionType,
  Action,
  CatalogContextProps,
} from "./types/context"

const initialState = {
  filter: "Filters",
}

const catalogReducer = (state: CatalogState, action: Action) => {
  switch (action.type) {
    case CatalogActionType.SET_FILTER:
      return {
        ...state,
        filter: action.payload,
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

  const setFilter = (filter: string) =>
    dispatch({ type: CatalogActionType.SET_FILTER, payload: filter })

  return {
    state,
    setFilter,
  }
}

export { CatalogContext, CatalogProvider, useCatalogStore }
