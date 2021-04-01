import { MockedProvider } from "@apollo/client/testing"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import CatalogContainer from "./CatalogContainer"
import { CatalogProvider } from "./CatalogContext"
import { GET_STRAIN_LIST } from "./graphql/query"
import {
  firstTenStrainCatalogItems,
  mockBacterialStrains,
  mockGWDIStrains,
  mockRegularAvailableStrains,
} from "./mocks/mockStrains"

describe("CatalogContainer", () => {
  beforeAll(() => {
    let window = global as any
    window.IntersectionObserver = jest.fn((callback, options) => ({
      observe: jest.fn(),
      disconnect: jest.fn(),
    }))
  })
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
          filter: {
            strain_type: "ALL",
          },
        },
      },
      result: {
        data: firstTenStrainCatalogItems,
      },
    },
    {
      request: {
        query: GET_STRAIN_LIST,
        variables: {
          cursor: 0,
          limit: 10,
          filter: {
            strain_type: "BACTERIAL",
          },
        },
      },
      result: {
        data: mockBacterialStrains,
      },
    },
    {
      request: {
        query: GET_STRAIN_LIST,
        variables: {
          cursor: 0,
          limit: 10,
          filter: {
            strain_type: "REGULAR",
          },
        },
      },
      result: {
        data: firstTenStrainCatalogItems,
      },
    },
  ]

  const mockItem = `${firstTenStrainCatalogItems.listStrains.strains[0].id} - ${firstTenStrainCatalogItems.listStrains.strains[0].label}`
  const mockBacterialItem = `${mockBacterialStrains.listStrains.strains[0].id} - ${mockBacterialStrains.listStrains.strains[0].label}`
  const mockGWDIItem = `${mockGWDIStrains.listStrains.strains[0].id} - ${mockGWDIStrains.listStrains.strains[0].label}`
  const mockAvailableItem = `${mockRegularAvailableStrains.listStrains.strains[0].id} - ${mockRegularAvailableStrains.listStrains.strains[0].label}`

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
        name: "Stock Type: Bacterial",
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
        name: "Stock Type: Bacterial",
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
      // should set filter to default Filters
      expect(screen.getAllByRole("combobox")[0]).toHaveValue("Filters")
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
        name: "Stock Type: Bacterial",
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
        name: "Stock Type: Regular",
      })
      expect(regChip).toBeInTheDocument()
      // verify (old) bacterial chip has been removed
      const bacterial = screen.queryByRole("button", {
        name: "Stock Type: Bacterial",
      })
      expect(bacterial).not.toBeInTheDocument()
    })
  })

  describe("selecting different dropdown values", () => {
    it("should display expected data based on dropdown value", async () => {
      const listMocks = [
        {
          request: {
            query: GET_STRAIN_LIST,
            variables: {
              cursor: 0,
              limit: 10,
              filter: {
                strain_type: "ALL",
              },
            },
          },
          result: {
            data: firstTenStrainCatalogItems,
          },
        },
        {
          request: {
            query: GET_STRAIN_LIST,
            variables: {
              cursor: 0,
              limit: 10,
              filter: {
                strain_type: "GWDI",
              },
            },
          },
          result: {
            data: mockGWDIStrains,
          },
        },
        {
          request: {
            query: GET_STRAIN_LIST,
            variables: {
              cursor: 0,
              limit: 10,
              filter: {
                strain_type: "REGULAR",
                in_stock: true,
              },
            },
          },
          result: {
            data: mockRegularAvailableStrains,
          },
        },
      ]
      render(<MockComponent mocks={listMocks} />)
      // wait for data to load...
      const firstRow = await screen.findByText(mockItem)
      expect(firstRow).toBeInTheDocument()
      // select dropdown item
      const dropdown = screen.getAllByRole("combobox")[0]
      userEvent.selectOptions(dropdown, "GWDI Strains")
      // wait for chip to appear in searchbox
      const gwdiChip = await screen.findByRole("button", {
        name: "Stock Type: GWDI",
      })
      expect(gwdiChip).toBeInTheDocument()
      // wait for data to appear
      const firstGWDIRow = await screen.findByText(mockGWDIItem)
      expect(firstGWDIRow).toBeInTheDocument()
      // select different item
      const updatedDropdown = screen.getAllByRole("combobox")[0]
      userEvent.selectOptions(updatedDropdown, "Available Regular Strains")
      // wait for new chip to appear
      const regChip = await screen.findByRole("button", {
        name: "Stock Type: Regular",
      })
      expect(regChip).toBeInTheDocument()
      // wait for data to appear
      const firstAvailRow = await screen.findByText(mockAvailableItem)
      expect(firstAvailRow).toBeInTheDocument()
    })
  })

  describe("error handling", () => {
    it("should display error notice", async () => {
      const mocks = [
        {
          request: {
            query: GET_STRAIN_LIST,
            variables: {
              cursor: 0,
              limit: 10,
              filter: {
                strain_type: "ALL",
              },
            },
          },
          result: {
            errors: [
              {
                message: "No strains found",
                path: [],
                extensions: { code: "NotFound" },
                locations: undefined,
                nodes: undefined,
                source: undefined,
                positions: undefined,
                originalError: undefined,
                name: "",
              },
            ],
          },
        },
      ]

      render(<MockComponent mocks={mocks} filter="all" />)
      // wait for error message to load...
      const errorMsg = await screen.findByText(/got error/)
      expect(errorMsg).toBeInTheDocument()
    })
  })
})
