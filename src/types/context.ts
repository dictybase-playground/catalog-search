type CatalogState = {
  presetFilter: string
  tags: string[]
}

enum CatalogActionType {
  SET_PRESET_FILTER = "SET_PRESET_FILTER",
  SET_TAGS = "SET_TAGS",
}

type Action =
  | {
      type: CatalogActionType.SET_PRESET_FILTER
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
