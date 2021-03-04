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

type CatalogContextProps = {
  state: CatalogState
  dispatch: React.Dispatch<Action>
}

export type { CatalogState, Action, CatalogContextProps }
export { CatalogActionType }
