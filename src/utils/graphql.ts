import { QueryVariables } from "../types/context"

// update query variables based on active filters
const getQueryVariables = (
  activeFilters: string[],
  queryVariables: QueryVariables,
) => {
  const graphQLFilter = queryVariables.filter as QueryVariables["filter"]

  activeFilters.forEach((val) => {
    const splitVal = val.split(": ")
    switch (splitVal[0]) {
      case "Strain Type":
        graphQLFilter.strain_type = splitVal[1].toUpperCase()
        break
      case "Currently Available":
        graphQLFilter.in_stock = true
        break
      case "Descriptor":
        graphQLFilter.label = splitVal[1]
        break
      case "ID":
        graphQLFilter.id = splitVal[1]
        break
      case "Summary":
        graphQLFilter.summary = splitVal[1]
        break
      default:
        return
    }
  })

  return {
    ...queryVariables,
    filter: graphQLFilter,
  }
}

export { getQueryVariables }
