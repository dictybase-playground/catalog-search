import React from "react"
import { useQuery } from "@apollo/client"
import Box from "@material-ui/core/Box"
import SearchBox from "./SearchBox"
import FilterDropdown from "./FilterDropdown"
import CatalogList from "./CatalogList"
import { GET_STRAIN_LIST } from "./graphql/query"
import { useCatalogStore } from "./CatalogContext"

const convertFiltersToGraphQL = (filters: string[]) => {
  return filters.map((item) => item.replace(": ", "=~")).join(",")
}

const CatalogContainer = () => {
  const {
    state: { activeFilters },
  } = useCatalogStore()
  const { loading, error, data } = useQuery(GET_STRAIN_LIST, {
    variables: {
      cursor: 0,
      limit: 10,
      filter: convertFiltersToGraphQL(activeFilters),
    },
  })

  if (loading) {
    return <div>loading...</div>
  }

  if (error) {
    console.log(error)
    return <div>got error</div>
  }

  return (
    <React.Fragment>
      <Box m={2} display="flex" flexDirection="row" alignItems="center">
        <FilterDropdown />
        <SearchBox />
      </Box>
      <Box>
        <CatalogList data={data} />
      </Box>
    </React.Fragment>
  )
}

export default CatalogContainer
