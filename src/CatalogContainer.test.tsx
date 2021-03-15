import { MockedProvider } from "@apollo/client/testing"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import CatalogContainer from "./CatalogContainer"
import { CatalogProvider } from "./CatalogContext"
import {
  GET_BACTERIAL_STRAIN_LIST,
  GET_GWDI_STRAIN_LIST,
  GET_REGULAR_STRAIN_LIST,
  GET_STRAIN_INVENTORY_LIST,
  GET_STRAIN_LIST,
} from "./graphql/query"
import {
  mockRegularStrains,
  mockBacterialStrains,
  mockGWDIStrains,
  mockRegularAvailableStrains,
} from "./mocks/mockStrains"

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
          listStrains: mockRegularStrains.listRegularStrains,
        },
      },
    },
    {
      request: {
        query: GET_BACTERIAL_STRAIN_LIST,
        variables: {
          cursor: 0,
          limit: 10,
          filter: "",
        },
      },
      result: {
        data: mockBacterialStrains,
      },
    },
    {
      request: {
        query: GET_REGULAR_STRAIN_LIST,
        variables: {
          cursor: 0,
          limit: 10,
          filter: "",
        },
      },
      result: {
        data: mockRegularStrains,
      },
    },
  ]

  const mockItem = `${mockRegularStrains.listRegularStrains.strains[0].id} - ${mockRegularStrains.listRegularStrains.strains[0].label}`
  const mockBacterialItem = `${mockBacterialStrains.listBacterialStrains.strains[0].id} - ${mockBacterialStrains.listBacterialStrains.strains[0].label}`
  const mockGWDIItem = `${mockGWDIStrains.listGWDIStrains.strains[0].id} - ${mockGWDIStrains.listGWDIStrains.strains[0].label}`
  const mockAvailableItem = `${mockRegularAvailableStrains.listStrainsInventory.strains[0].id} - ${mockRegularAvailableStrains.listStrainsInventory.strains[0].label}`

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
        name: "strain_type: bacterial",
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
        name: "strain_type: bacterial",
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
        name: "strain_type: bacterial",
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
        name: "strain_type: regular",
      })
      expect(regChip).toBeInTheDocument()
      // verify (old) bacterial chip has been removed
      const bacterial = screen.queryByRole("button", {
        name: "strain_type: bacterial",
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
              filter: "",
            },
          },
          result: {
            data: {
              listStrains: mockRegularStrains.listRegularStrains,
            },
          },
        },
        {
          request: {
            query: GET_GWDI_STRAIN_LIST,
            variables: {
              cursor: 0,
              limit: 10,
              filter: "",
            },
          },
          result: {
            data: mockGWDIStrains,
          },
        },
        {
          request: {
            query: GET_STRAIN_INVENTORY_LIST,
            variables: {
              cursor: 0,
              limit: 10,
              filter: "",
              strain_type: "REGULAR",
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
        name: "strain_type: GWDI",
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
        name: "strain_type: regular",
      })
      expect(regChip).toBeInTheDocument()
      // wait for data to appear
      const firstAvailRow = await screen.findByText(mockAvailableItem)
      expect(firstAvailRow).toBeInTheDocument()
    })
  })
})
