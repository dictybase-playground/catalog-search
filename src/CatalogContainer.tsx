// import SearchBox from "./SearchBox"
// import FilterDropdown from "./FilterDropdown"
import Box from "@material-ui/core/Box"
import LoadingDisplay from "./components/LoadingDisplay"
import ErrorDisplay from "./components/ErrorDisplay"
import { StrainListDocument } from "dicty-graphql-schema";
import useIntersectionObserver from "./hooks/intersectionobserver"
import CatalogListWrapper from "./components/CatalogListWrapper"
import CatalogList from "./CatalogList"
import { useRef } from "react";
import { useQuery } from "@apollo/client"

const CatalogContainer = () => {
  const rootRef = useRef<HTMLDivElement>(null)
  const targetRef = useRef<HTMLLIElement>(null)
  const { loading, error, data, fetchMore } = useQuery(
    StrainListDocument, {
    variables: { cursor: 0, limit: 10, filter: "" }
  })
  const onIntersection = ([entry]: IntersectionObserverEntry[]) => {
    const { nextCursor } = data.listStrains
    if (!entry.isIntersecting) return
    if (!nextCursor) return
    fetchMore({ variables: { cursor: nextCursor } })
  }
  useIntersectionObserver({
    target: targetRef,
    option: { root: rootRef.current, threshold: 0.25 },
    onIntersection: onIntersection
  })

  return (
    <>
      {/* <Box m={2} display="flex" flexDirection="row">
        <FilterDropdown />
        <SearchBox />
      </Box> */}
      <Box>
        <CatalogListWrapper root={rootRef}>
          {loading && <LoadingDisplay />}
          {error && <ErrorDisplay error={error} />}
          {data && <CatalogList data={data} target={targetRef} />}
        </CatalogListWrapper>
      </Box>
    </>
  )
}

export default CatalogContainer
