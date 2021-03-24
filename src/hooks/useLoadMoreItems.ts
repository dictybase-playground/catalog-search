import React from "react"
import { DocumentNode } from "@apollo/client"
import { useCatalogStore } from "../CatalogContext"

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
    data: any,
    fetchMore: any,
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
        cursor: newCursor,
        filter: queryVariables.filter,
        limit: queryVariables.limit,
      },
    })
  }

  return {
    loadMoreItems,
    hasMore,
  }
}

export default useLoadMoreItems
