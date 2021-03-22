import React from "react"
import { screen, render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import SearchBox from "./SearchBox"
import { CatalogContext, catalogReducer } from "./CatalogContext"

describe("SearchBox", () => {
  const MockComponent = ({ activeFilters }: { activeFilters: string[] }) => {
    const [state, dispatch] = React.useReducer(catalogReducer, {
      presetFilter: "Filters",
      queryVariables: {
        cursor: 0,
        limit: 10,
        filter: {
          strain_type: "ALL",
        },
      },
      activeFilters,
    })

    return (
      <CatalogContext.Provider value={{ state, dispatch }}>
        <SearchBox />
      </CatalogContext.Provider>
    )
  }

  it("should show empty searchbox after removing tags", () => {
    const activeFilters = ["Stock Type: Regular", "Currently Available"]
    render(<MockComponent activeFilters={activeFilters} />)
    // should have two tags + the clear button
    expect(screen.getAllByRole("button")).toHaveLength(3)
    // // find clear button
    const clear = screen.getByRole("button", {
      name: "Clear",
    })
    expect(clear).toBeInTheDocument()
    // click the X button to remove chip
    userEvent.click(clear)
    // should only show the clear button
    expect(screen.getAllByRole("button")).toHaveLength(1)
  })
})
