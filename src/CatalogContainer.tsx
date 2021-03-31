import React from "react"
import { useQuery } from "@apollo/client"
import Box from "@material-ui/core/Box"
import SearchBox from "./SearchBox"
import FilterDropdown from "./FilterDropdown"
// import CatalogList from "./CatalogList"
import CatalogListHooks from "./CatalogListHooks"
import { useCatalogStore } from "./CatalogContext"
import useLoadMoreItems from "./hooks/useLoadMoreItems"
import { GET_STRAIN_LIST } from "./graphql/query"

const CatalogContainer = () => {
  const {
    state: { queryVariables },
  } = useCatalogStore()
  const { loading, error, data, fetchMore } = useQuery(GET_STRAIN_LIST, {
    variables: queryVariables,
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
        <CatalogListHooks
          data={data.listStrains.strains}
          loadMore={() =>
            loadMoreItems(data.listStrains, fetchMore, GET_STRAIN_LIST)
          }
          hasMore={hasMore}
        />
      </Box>
    </React.Fragment>
  )
}

export default CatalogContainer
