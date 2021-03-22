import { catalogReducer } from "./CatalogContext"

describe("catalogReducer", () => {
  it("should return default state if action doesn't match", () => {
    const state = {
      presetFilter: "Filters",
      queryVariables: {
        cursor: 0,
        limit: 10,
        filter: {
          strain_type: "ALL",
        },
      },
      activeFilters: [],
    }
    // @ts-ignore
    expect(catalogReducer(state, "NOT_REAL_ACTION")).toStrictEqual(state)
  })
})
