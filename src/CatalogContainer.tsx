// import SearchBox from "./SearchBox"
// import FilterDropdown from "./FilterDropdown"
import { Box } from "@material-ui/core"
import { useRef } from "react"
import { useSearchParams } from "react-router-dom"
import { useQuery } from "@apollo/client"

import LoadingDisplay from "./components/LoadingDisplay.bs"
import ErrorDisplay from "./components/ErrorDisplay"
import CatalogListWrapper from "./components/CatalogListWrapper"
import CatalogTableDisplay from "./components/CatalogTableDisplay"
import useIntersectionObserver from "./hooks/intersectionobserver"
import useStrainCatalogSearch from "./hooks/useStrainCatalogSearch"
import { graphqlQueryVars, strainConfig } from "./config"



export default function CatalogContainer() {
    const [searchParams] = useSearchParams()
    const { query, dataField, filter } = useStrainCatalogSearch({
        searchParams,
        strainConfig,
        value: "regular"
    })

    const gqvars = { variables: { filter: filter, ...graphqlQueryVars } }
    const { loading, error, data, fetchMore } = useQuery(query, gqvars)

    const rootRef = useRef<HTMLDivElement>(null)
    const targetRef = useRef<HTMLTableRowElement>(null)
    const onIntersection = ([entry]: IntersectionObserverEntry[]) => {
        if (!entry.isIntersecting) return
        const { nextCursor } = data?.[dataField]
        if (!nextCursor) return
        fetchMore({ variables: { cursor: nextCursor } })
    }
    useIntersectionObserver({
        target: targetRef,
        onIntersection: onIntersection,
        option: { root: rootRef.current, threshold: 0.10 }
    })

    return (
        <>
            {/* <Box m={2} display="flex" flexDirection="row"> */}
            {/* <FilterDropdown /> */}
            {/* <SearchBox /> */}
            {/*  </Box>*/}
            <Box>
                <CatalogListWrapper root={rootRef}>
                    {loading ? <LoadingDisplay /> : <></>}
                    {error ? <ErrorDisplay error={error} /> : <></>}
                    {data?.[dataField]
                        ? <CatalogTableDisplay
                            data={data}
                            dataField={dataField}
                            target={targetRef}
                        />
                        : <></>
                    }
                </CatalogListWrapper>
            </Box>
        </>
    )
}
