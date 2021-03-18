import { QueryVariables } from "../types/context"

// get the strain type from a list of filters
const getStrainType = (filters: string[]) => {
  return filters
    .find((item) => item.includes("Stock Type"))
    ?.replace("Stock Type: ", "")
}

// update query variables based on active filters
const getQueryVariables = (
  activeFilters: string[],
  queryVariables: QueryVariables,
) => {
  let graphQLFilter = {
    ...queryVariables.filter,
    strain_type: getStrainType(activeFilters)?.toUpperCase() || "ALL",
  } as QueryVariables["filter"]

  if (activeFilters.includes("Currently Available")) {
    graphQLFilter.in_stock = true
  }

  return {
    ...queryVariables,
    filter: graphQLFilter,
  }
}

export { getQueryVariables }
