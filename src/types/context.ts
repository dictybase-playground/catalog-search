type CatalogState = {
  filter: string
  tags: string[]
}

enum CatalogActionType {
  SET_FILTER = "SET_FILTER",
  SET_TAGS = "SET_TAGS",
}

type Action =
  | {
      type: CatalogActionType.SET_FILTER
      payload: string
    }
  | {
      type: CatalogActionType.SET_TAGS
      payload: string[]
    }

type CatalogContextProps = {
  state: CatalogState
  dispatch: React.Dispatch<Action>
}

export type { CatalogState, Action, CatalogContextProps }
export { CatalogActionType }
