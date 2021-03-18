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
  const updatedVariables = {
    ...queryVariables,
    filter: {
      strain_type: strainType?.toUpperCase(),
    },
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

export { getQueryVariables }
