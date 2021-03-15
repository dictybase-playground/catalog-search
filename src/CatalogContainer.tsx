import React from "react"
import { useQuery } from "@apollo/client"
import Box from "@material-ui/core/Box"
import SearchBox from "./SearchBox"
import FilterDropdown from "./FilterDropdown"
import CatalogList from "./CatalogList"
import { useCatalogStore } from "./CatalogContext"
import {
  getQueryFilterString,
  normalizeDataObject,
  getGraphQLQuery,
} from "./utils/graphql"

// TODO: get query based on the active filters, not just dropdowns
// i.e. if filters include in_stock: true, then we need to change filter to
// listStrainsInventory

const CatalogContainer = () => {
  const {
    state: { presetFilter, activeFilters, queryVariables },
  } = useCatalogStore()
  const { loading, error, data } = useQuery(getGraphQLQuery(presetFilter), {
    variables: {
      ...queryVariables,
      filter: getQueryFilterString(activeFilters),
    },
  })

  if (loading) {
    return <div>loading...</div>
  }

  if (error) {
    return <div>got error</div>
  }

  return (
    <React.Fragment>
      <Box m={2} display="flex" flexDirection="row">
        <FilterDropdown />
        <SearchBox />
      </Box>
      <Box>
        <CatalogList data={normalizeDataObject(data)} />
      </Box>
    </React.Fragment>
  )
}

export { getQueryFilterString, normalizeDataObject }
export default CatalogContainer
