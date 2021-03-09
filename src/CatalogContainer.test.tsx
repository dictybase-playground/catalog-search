import { MockedProvider } from "@apollo/client/testing"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import CatalogContainer, { convertFiltersToGraphQL } from "./CatalogContainer"
import { CatalogProvider } from "./CatalogContext"
import { GET_STRAIN_LIST } from "./graphql/query"
import { mockStrains, mockBacterialStrains } from "./mockStrains"

describe("CatalogContainer", () => {
  const MockComponent = ({ mocks = listMocks }: any) => {
    return (
      <MockedProvider mocks={mocks} addTypename={false}>
        <CatalogProvider>
          <CatalogContainer />
        </CatalogProvider>
      </MockedProvider>
    )
  }

  const listMocks = [
    {
      request: {
        query: GET_STRAIN_LIST,
        variables: {
          cursor: 0,
          limit: 10,
          filter: "",
        },
      },
      result: {
        data: {
          listStrains: mockStrains,
        },
      },
    },
    {
      request: {
        query: GET_STRAIN_LIST,
        variables: {
          cursor: 0,
          limit: 10,
          filter: "stock_type==bacterial",
        },
      },
      result: {
        data: {
          listStrains: mockBacterialStrains,
        },
      },
    },
    {
      request: {
        query: GET_STRAIN_LIST,
        variables: {
          cursor: 0,
          limit: 10,
          filter: "stock_type==regular",
        },
      },
      result: {
        data: {
          listStrains: mockStrains,
        },
      },
    },
  ]

  const mockItem = `${mockStrains.strains[0].id} - ${mockStrains.strains[0].label}`
  const mockBacterialItem = `${mockBacterialStrains.strains[0].id} - ${mockBacterialStrains.strains[0].label}`

  describe("using dropdown menu", () => {
    it("should add search tag on click", async () => {
      render(<MockComponent />)
      // wait for data to load...
      const firstRow = await screen.findByText(mockItem)
      expect(firstRow).toBeInTheDocument()
      // select dropdown item
      const dropdown = screen.getAllByRole("combobox")[0]
      userEvent.selectOptions(dropdown, "Bacterial Strains")
      // wait for chip to appear in searchbox
      const chip = await screen.findByRole("button", {
        name: "stock_type: bacterial",
      })
      expect(chip).toBeInTheDocument()
    })

    it("should remove search tag on click", async () => {
      render(<MockComponent />)
      // wait for data to load...
      const firstRow = await screen.findByText(mockItem)
      expect(firstRow).toBeInTheDocument()
      // select dropdown item
      const dropdown = screen.getAllByRole("combobox")[0]
      userEvent.selectOptions(dropdown, "Bacterial Strains")
      // wait for chip to appear in searchbox
      const chip = await screen.findByRole("button", {
        name: "stock_type: bacterial",
      })
      expect(chip).toBeInTheDocument()
      // find clear button
      const clear = screen.getByRole("button", {
        name: "Clear",
      })
      expect(clear).toBeInTheDocument()
      // click the X button to remove chip
      userEvent.click(clear)
      expect(chip).not.toBeInTheDocument()
    })

    it("should only display one list tag at a time", async () => {
      render(<MockComponent />)
      // wait for data to load...
      const firstRow = await screen.findByText(mockItem)
      expect(firstRow).toBeInTheDocument()
      // select dropdown item
      const dropdown = screen.getAllByRole("combobox")[0]
      userEvent.selectOptions(dropdown, "Bacterial Strains")
      // wait for chip to appear in searchbox
      const bacterialChip = await screen.findByRole("button", {
        name: "stock_type: bacterial",
      })
      expect(bacterialChip).toBeInTheDocument()
      // wait for data to appear
      const firstBacterialRow = await screen.findByText(mockBacterialItem)
      expect(firstBacterialRow).toBeInTheDocument()
      // select different item
      const updatedDropdown = screen.getAllByRole("combobox")[0]
      userEvent.selectOptions(updatedDropdown, "Regular Strains")
      // wait for new chip to appear
      const regChip = await screen.findByRole("button", {
        name: "stock_type: regular",
      })
      expect(regChip).toBeInTheDocument()
      // verify (old) bacterial chip has been removed
      const bacterial = screen.queryByRole("button", {
        name: "stock_type: bacterial",
      })
      expect(bacterial).not.toBeInTheDocument()
    })
  })
})

describe("convertFiltersToGraphQL function", () => {
  it("should add strict equals for stock_type", () => {
    expect(convertFiltersToGraphQL(["stock_type: all"])).toEqual(
      "stock_type==all",
    )
  })
  it("should add strict equals for in_stock", () => {
    expect(convertFiltersToGraphQL(["in_stock: true"])).toEqual(
      "in_stock==true",
    )
  })
  it("should add substrings and AND operator", () => {
    expect(convertFiltersToGraphQL(["stock_type: all", "label: sad"])).toEqual(
      "stock_type==all;label~=sad",
    )
  })
})
