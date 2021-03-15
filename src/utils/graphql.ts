import {
  GET_STRAIN_LIST,
  GET_REGULAR_STRAIN_LIST,
  GET_GWDI_STRAIN_LIST,
  GET_STRAIN_INVENTORY_LIST,
  GET_BACTERIAL_STRAIN_LIST,
} from "../graphql/query"

// remove all values that cannot be added to the GraphQL filter string
const isFilterable = (value: string) => {
  const notType = value.includes("strain_type")
  const notInv = value.includes("in_stock")
  const keyWithVal = value.includes(":")

  return keyWithVal && notType && notInv
}

// convert active filters to usable graphql filter string
// by stripping out the stock_type and in_stock properties
const getQueryFilterString = (filters: string[]) => {
  return filters
    .filter(isFilterable)
    .map((item) => item.replace(": ", "~="))
    .join(";")
}

// convert the GraphQL data response into a normalized object
const normalizeDataObject = (data: any) => {
  let convertedData = data

  switch (true) {
    case data.hasOwnProperty("listStrains"): {
      convertedData = data.listStrains
      break
    }
    case data.hasOwnProperty("listRegularStrains"): {
      convertedData = data.listRegularStrains
      break
    }
    case data.hasOwnProperty("listGWDIStrains"): {
      convertedData = data.listGWDIStrains
      break
    }
    case data.hasOwnProperty("listStrainsInventory"): {
      convertedData = data.listStrainsInventory
      break
    }
    case data.hasOwnProperty("listBacterialStrains"): {
      convertedData = data.listBacterialStrains
      break
    }
    default:
      return convertedData
  }

  return convertedData
}

// get appropriate query based on dropdown selection
const getGraphQLQuery = (filter: string) => {
  switch (filter) {
    case "Regular Strains":
      return GET_REGULAR_STRAIN_LIST
    case "GWDI Strains":
      return GET_GWDI_STRAIN_LIST
    case "Available Regular Strains":
      return GET_STRAIN_INVENTORY_LIST
    case "Bacterial Strains":
      return GET_BACTERIAL_STRAIN_LIST
    default:
      return GET_STRAIN_LIST
  }
}

export { getQueryFilterString, normalizeDataObject, getGraphQLQuery }
