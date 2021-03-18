import React from "react"
import { useQuery } from "@apollo/client"
import Box from "@material-ui/core/Box"
import SearchBox from "./SearchBox"
import FilterDropdown from "./FilterDropdown"
import CatalogList from "./CatalogList"
import { useCatalogStore } from "./CatalogContext"
import { GET_STRAIN_LIST } from "./graphql/query"
import { getQueryVariables } from "./utils/graphql"

const CatalogContainer = () => {
  const {
    state: { activeFilters, queryVariables },
  } = useCatalogStore()
  const { loading, error, data } = useQuery(GET_STRAIN_LIST, {
    variables: getQueryVariables(activeFilters, queryVariables),
  })

  if (loading) {
    return <div>loading...</div>
  }

  if (error) {
    console.error(error)
    return <div>got error</div>
  }

  return (
    <React.Fragment>
      <Box m={2} display="flex" flexDirection="row">
        <FilterDropdown />
        <SearchBox />
      </Box>
      <Box>
        <CatalogList data={data.listStrains} />
      </Box>
    </React.Fragment>
  )
}

export default CatalogContainer
