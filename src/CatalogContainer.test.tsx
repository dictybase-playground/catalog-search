import { MockedProvider } from "@apollo/client/testing"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import CatalogContainer, {
  getQueryFilterString,
  normalizeDataObject,
} from "./CatalogContainer"
import { CatalogProvider } from "./CatalogContext"
import {
  GET_BACTERIAL_STRAIN_LIST,
  GET_REGULAR_STRAIN_LIST,
  GET_STRAIN_LIST,
} from "./graphql/query"
import { mockRegularStrains, mockBacterialStrains } from "./mocks/mockStrains"

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
})

describe("getQueryFilterString function", () => {
  it("should remove strain_type", () => {
    expect(getQueryFilterString(["strain_type: all"])).toEqual("")
  })
  it("should remove in_stock", () => {
    expect(getQueryFilterString(["in_stock: true"])).toEqual("")
  })
  it("should remove both strain_type and in_stock", () => {
    expect(
      getQueryFilterString(["in_stock: true", "strain_type: all"]),
    ).toEqual("")
  })
  it("should include AND operator", () => {
    expect(
      getQueryFilterString(["strain_type: all", "label: sad", "summary: test"]),
    ).toEqual("label~=sad;summary~=test")
  })
})

describe("normalizeDataObject function", () => {
  it("should return listStrains", () => {
    const strainObj = {
      listStrains: "abc",
    }
    expect(normalizeDataObject(strainObj)).toEqual("abc")
  })
  it("should return listRegularStrains", () => {
    const strainObj = {
      listRegularStrains: "reg",
    }
    expect(normalizeDataObject(strainObj)).toEqual("reg")
  })
  it("should return listGWDIStrains", () => {
    const strainObj = {
      listGWDIStrains: "gwdi",
    }
    expect(normalizeDataObject(strainObj)).toEqual("gwdi")
  })
  it("should return listStrainsInventory", () => {
    const strainObj = {
      listStrainsInventory: "inv",
    }
    expect(normalizeDataObject(strainObj)).toEqual("inv")
  })
  it("should return listBacterialStrains", () => {
    const strainObj = {
      listBacterialStrains: "bac",
    }
    expect(normalizeDataObject(strainObj)).toEqual("bac")
  })
  it("should return same data for unexpectd object", () => {
    const strainObj = {
      foo: "bar",
    }
    expect(normalizeDataObject(strainObj)).toStrictEqual(strainObj)
  })
})
