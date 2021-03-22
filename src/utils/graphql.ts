import { QueryVariables } from "../types/context"

// get the strain type from a list of filters
const getStrainType = (filters: string[]) => {
  return filters
    .find((item) => item.includes("Stock Type"))
    ?.replace("Stock Type: ", "")
}

// check if a given property is in the list of active filters
// and remove the "key:" from the string
const lookupFilter = (filters: string[], prop: string) => {
  let propVal = filters.find((item) => item.includes(prop))
  if (propVal !== undefined) {
    return propVal.replace(`${prop}: `, "")
  }
  return propVal
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

  const descriptor = lookupFilter(activeFilters, "Descriptor")
  if (descriptor !== undefined) {
    graphQLFilter.label = descriptor
  }

  const id = lookupFilter(activeFilters, "ID")
  if (id !== undefined) {
    graphQLFilter.id = id
  }

  const summary = lookupFilter(activeFilters, "Summary")
  if (summary !== undefined) {
    graphQLFilter.summary = summary
  }

  return {
    ...queryVariables,
    filter: graphQLFilter,
  }
}

export { getQueryVariables }
