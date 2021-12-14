// import SearchBox from "./SearchBox"
// import FilterDropdown from "./FilterDropdown"
import Box from "@material-ui/core/Box"
import LoadingDisplay from "./components/LoadingDisplay"
import ErrorDisplay from "./components/ErrorDisplay"
import { StrainListDocument } from "dicty-graphql-schema";
import useIntersectionObserver from "./hooks/intersectionobserver"
import CatalogListWrapper from "./components/CatalogListWrapper"
import CatalogTableDisplay from "./components/CatalogTableDisplay"
import { useRef } from "react"
import { useQuery } from "@apollo/client"

const CatalogContainer = () => {
  const rootRef = useRef<HTMLDivElement>(null)
  const targetRef = useRef<HTMLTableRowElement>(null)
  const { loading, error, data, fetchMore } = useQuery(
    StrainListDocument, {
    variables: { cursor: 0, limit: 12, filter: "" }
  })
  const onIntersection = ([entry]: IntersectionObserverEntry[]) => {
    const { nextCursor } = data.listStrains
    if (!entry.isIntersecting) return
    if (!nextCursor) return
    fetchMore({ variables: { cursor: nextCursor } })
  }
  useIntersectionObserver({
    target: targetRef,
    option: { root: rootRef.current, threshold: 0.10 },
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
          {data && <CatalogTableDisplay data={data} target={targetRef} />}
        </CatalogListWrapper>
      </Box>
    </>
  )
}

export default CatalogContainer
