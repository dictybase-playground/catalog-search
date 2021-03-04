import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import CatalogContainer from "./CatalogContainer"
import { CatalogProvider } from "./CatalogContext"

describe("CatalogContainer", () => {
  describe("using dropdown menu", () => {
    it("should add search tag on click", () => {
      render(
        <CatalogProvider>
          <CatalogContainer />
        </CatalogProvider>,
      )
      const dropdown = screen.getAllByRole("combobox")[0]
      userEvent.selectOptions(dropdown, "GWDI Strains")
      const chip = screen.getByRole("button", {
        name: "List: GWDI Strains",
      })
      expect(chip).toBeInTheDocument()
    })

    it("should remove search tag on click", () => {
      render(
        <CatalogProvider>
          <CatalogContainer />
        </CatalogProvider>,
      )
      const dropdown = screen.getAllByRole("combobox")[0]
      userEvent.selectOptions(dropdown, "GWDI Strains")
      const chip = screen.getByRole("button", {
        name: "Type: GWDI",
      })
      expect(chip).toBeInTheDocument()
      const clear = screen.getByRole("button", {
        name: "Clear",
      })
      expect(clear).toBeInTheDocument()
      // click the X button to remove chip
      userEvent.click(clear)
      expect(chip).not.toBeInTheDocument()
    })

    it("should only display one list tag at a time", async () => {
      render(
        <CatalogProvider>
          <CatalogContainer />
        </CatalogProvider>,
      )
      const dropdown = screen.getAllByRole("combobox")[0]
      userEvent.selectOptions(dropdown, "GWDI Strains")
      const gwdiChip = screen.getByRole("button", {
        name: "Type: GWDI",
      })
      expect(gwdiChip).toBeInTheDocument()
      // select different item
      userEvent.selectOptions(dropdown, "Bacterial Strains")
      const bacterialChip = screen.getByRole("button", {
        name: "Type: Bacterial",
      })
      expect(bacterialChip).toBeInTheDocument()
      // verify gwdi chip has been removed
      const gwdi = screen.queryByRole("button", {
        name: "Type: GWDI",
      })
      expect(gwdi).not.toBeInTheDocument()
    })
  })
})
