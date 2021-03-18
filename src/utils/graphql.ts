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
  const strainType = getStrainType(activeFilters)

  return {
    ...queryVariables,
    filter: {
      strain_type: strainType?.toUpperCase() || "ALL",
    },
  }
}

export { getQueryVariables }
