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
  /** List of tags shown in search box */
  tags: [],
}

const catalogReducer = (state: CatalogState, action: Action) => {
  switch (action.type) {
    case CatalogActionType.SET_PRESET_FILTER:
      return {
        ...state,
        presetFilter: action.payload,
      }
    case CatalogActionType.SET_TAGS:
      return {
        ...state,
        tags: action.payload,
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

  const setTags = (tags: string[]) =>
    dispatch({ type: CatalogActionType.SET_TAGS, payload: tags })

  return {
    state,
    setPresetFilter,
    setTags,
  }
}

export { CatalogContext, CatalogProvider, useCatalogStore }
