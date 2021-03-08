import { MockedProvider } from "@apollo/client/testing"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import CatalogContainer from "./CatalogContainer"
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
          filter: "",
          limit: 10,
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
          filter: "stock_type=GWDI",
          limit: 10,
        },
      },
      result: {
        data: {
          listStrains: mockBacterialStrains,
        },
      },
    },
  ]

  const mockItem = `${mockStrains.strains[0].id} - ${mockStrains.strains[0].label}`

  describe("using dropdown menu", () => {
    it("should add search tag on click", async () => {
      render(<MockComponent />)
      // wait for data to load...
      const firstRow = await screen.findByText(mockItem)
      expect(firstRow).toBeInTheDocument()
      const dropdown = screen.getAllByRole("combobox")[0]
      userEvent.selectOptions(dropdown, "GWDI Strains")
      const chip = screen.getByRole("button", {
        name: "stock_type: GWDI",
      })
      expect(chip).toBeInTheDocument()
    })

    it("should remove search tag on click", async () => {
      render(<MockComponent />)
      // wait for data to load...
      const firstRow = await screen.findByText(mockItem)
      expect(firstRow).toBeInTheDocument()
      const dropdown = screen.getAllByRole("combobox")[0]
      userEvent.selectOptions(dropdown, "GWDI Strains")
      const chip = screen.getByRole("button", {
        name: "stock_type: GWDI",
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
      render(<MockComponent />)
      // wait for data to load...
      const firstRow = await screen.findByText(mockItem)
      expect(firstRow).toBeInTheDocument()
      const dropdown = screen.getAllByRole("combobox")[0]
      userEvent.selectOptions(dropdown, "GWDI Strains")
      const gwdiChip = screen.getByRole("button", {
        name: "stock_type: GWDI",
      })
      expect(gwdiChip).toBeInTheDocument()
      // select different item
      userEvent.selectOptions(dropdown, "Bacterial Strains")
      const bacterialChip = await screen.findByRole("button", {
        name: "stock_type: bacterial",
      })
      expect(bacterialChip).toBeInTheDocument()
      // verify gwdi chip has been removed
      const gwdi = screen.queryByRole("button", {
        name: "stock_type: GWDI",
      })
      expect(gwdi).not.toBeInTheDocument()
    })
  })
})
