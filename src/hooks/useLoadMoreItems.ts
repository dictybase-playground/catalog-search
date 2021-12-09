import React from "react"
import { DocumentNode, ApolloQueryResult } from "@apollo/client"
import { useCatalogStore } from "../CatalogContext"
import { AppStrainTypes } from "../types/strain"
import { AppContextTypes } from "../types/context"

type FetchMoreQuery = {
  /** GraphQL query to use */
  query: DocumentNode
  /** Variables to use for the above query */
  variables: AppContextTypes.QueryVariables
}

/**
 * useLoadMoreItems provides a callback for fetching more data (generally used
 * for infinite scrolling).
 */
const useLoadMoreItems = () => {
  const [hasMore, setHasMore] = React.useState(true)
  const {
    state: { queryVariables },
  } = useCatalogStore()

  const loadMoreItems = async (
    data: AppStrainTypes.ListStrainsData,
    fetchMore: (
      arg0: FetchMoreQuery,
    ) => Promise<ApolloQueryResult<AppStrainTypes.ListStrainsData>>,
    query: DocumentNode,
  ) => {
    const newCursor = data.nextCursor

    if (newCursor === 0) {
      setHasMore(false)
      return
    }
    await fetchMore({
      query,
      variables: {
        ...queryVariables,
        cursor: newCursor,
      },
    })
  }

  return {
    loadMoreItems,
    hasMore,
  }
}

export default useLoadMoreItems
