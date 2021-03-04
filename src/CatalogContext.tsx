import React from "react"

type CatalogState = {
  filter: string
}

enum CatalogActionType {
  SET_FILTER = "SET_FILTER",
}

type Action = {
  type: CatalogActionType.SET_FILTER
  payload: string
}

const initialState = {
  filter: "",
}

type CatalogContextProps = {
  state: CatalogState
  dispatch: React.Dispatch<Action>
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
  const context = React.useContext(CatalogContext)
  if (!context) {
    throw new Error("useCatalogStore must be used within a CatalogProvider")
  }
  return context
}

export { CatalogContext, CatalogProvider, useCatalogStore }
