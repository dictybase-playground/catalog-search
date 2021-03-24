import React from "react"
import { useQuery } from "@apollo/client"
import Box from "@material-ui/core/Box"
import SearchBox from "./SearchBox"
import FilterDropdown from "./FilterDropdown"
import CatalogList from "./CatalogList"
import { useCatalogStore } from "./CatalogContext"
import useLoadMoreItems from "./hooks/useLoadMoreItems"
import { GET_STRAIN_LIST } from "./graphql/query"
import { getQueryVariables } from "./utils/graphql"

const CatalogContainer = () => {
  const {
    state: { activeFilters, queryVariables },
  } = useCatalogStore()
  const { loading, error, data, fetchMore } = useQuery(GET_STRAIN_LIST, {
    variables: getQueryVariables(activeFilters, queryVariables),
  })
  const { loadMoreItems, hasMore } = useLoadMoreItems()

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
        <CatalogList
          data={data.listStrains.strains}
          loadMore={() => loadMoreItems(data, fetchMore, GET_STRAIN_LIST)}
          hasMore={hasMore}
          totalItems={data.listStrains.strains.length}
        />
      </Box>
    </React.Fragment>
  )
}

export default CatalogContainer
