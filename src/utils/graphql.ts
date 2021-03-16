import {
  GET_STRAIN_LIST,
  GET_REGULAR_STRAIN_LIST,
  GET_GWDI_STRAIN_LIST,
  GET_STRAIN_INVENTORY_LIST,
  GET_BACTERIAL_STRAIN_LIST,
} from "../graphql/query"
import { QueryVariables } from "../types/context"

// remove all values that cannot be added to the GraphQL filter string
const isFilterable = (value: string) => {
  const notType = !value.includes("Type")
  const notInv = value !== "Currently Available"
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

const getQueryVariables = (
  activeFilters: string[],
  queryVariables: QueryVariables,
) => {
  const strainType = activeFilters
    .find((item) => item.includes("Type"))
    ?.replace("Type: ", "")

  const queryFilter = getQueryFilterString(activeFilters)
  const updatedVariables = {
    ...queryVariables,
    filter: queryFilter,
  }

  if (!activeFilters.includes("Currently Available")) {
    return updatedVariables
  }

  switch (strainType) {
    case "Regular":
      return {
        ...updatedVariables,
        strain_type: "REGULAR",
      }
    case "GWDI":
      return {
        ...updatedVariables,
        strain_type: "GWDI",
      }
    default:
      return {
        ...updatedVariables,
        strain_type: "ALL",
      }
  }
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
const getGraphQLQuery = (filters: string[]) => {
  if (filters.includes("Currently Available")) {
    return GET_STRAIN_INVENTORY_LIST
  }

  const strainType = filters
    .find((item) => item.includes("Type"))
    ?.replace("Type: ", "")

  switch (strainType) {
    case "Regular":
      return GET_REGULAR_STRAIN_LIST
    case "GWDI":
      return GET_GWDI_STRAIN_LIST
    case "Bacterial":
      return GET_BACTERIAL_STRAIN_LIST
    default:
      return GET_STRAIN_LIST
  }
}

export {
  getQueryFilterString,
  normalizeDataObject,
  getGraphQLQuery,
  getQueryVariables,
}
