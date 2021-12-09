import React from "react"
import { useQuery } from "@apollo/client"
import Box from "@material-ui/core/Box"
// import SearchBox from "./SearchBox"
// import FilterDropdown from "./FilterDropdown"
import CatalogList from "./CatalogList"
import useLoadMoreItems from "./hooks/useLoadMoreItems"
import { StrainListDocument } from "dicty-graphql-schema";

const CatalogContainer = () => {
  const { loading, error, data, fetchMore } = useQuery(
    StrainListDocument, {
    variables: { cursor: 0, limit: 10, filter: "" }
  })
  const { loadMoreItems, hasMore } = useLoadMoreItems()

  if (loading) return <div>loading...</div>

  if (error) return <div>got error :(</div>

  return (
    <React.Fragment>
      {/* <Box m={2} display="flex" flexDirection="row">
        <FilterDropdown />
        <SearchBox />
      </Box> */}
      <Box>
        <CatalogList
          data={data.listStrains.strains}
          loadMore={() =>
            loadMoreItems(data.listStrains, fetchMore, StrainListDocument)
          }
          hasMore={hasMore}
        />
      </Box>
    </React.Fragment>
  )
}

export default CatalogContainer
