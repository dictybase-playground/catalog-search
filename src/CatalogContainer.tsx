// import SearchBox from "./SearchBox"
import { Box } from "@material-ui/core"
import { useRef } from "react"
import { useSearchParams } from "react-router-dom"
import { useQuery } from "@apollo/client"

import { make as LoadingDisplay } from "./components/LoadingDisplay.bs"
import { make as CatalogTableDisplay } from "./components/CatalogTableDisplay.bs"
import { make as ErrorDisplay } from "./components/ErrorDisplay.bs"
import { make as CatalogListWrapper } from "./components/CatalogListWrapper.bs"
// import CatalogTableDisplay from "./components/CatalogTableDisplay"
// import ErrorDisplay from "./components/ErrorDisplay"
// import CatalogListWrapper from "./components/CatalogListWrapper"
import FilterDropdown from "./FilterDropdown"
import useIntersectionObserver from "./hooks/intersectionobserver"
import useStrainCatalogSearch from "./hooks/useStrainCatalogSearch"
import { graphqlQueryVars, strainConfig } from "./config"



export default function CatalogContainer() {
    const [searchParams, setSearchParams] = useSearchParams()
    const { query, dataField, filter } = useStrainCatalogSearch({
        searchParams,
        strainConfig,
        value: "regular"
    })

    const queryVars = { variables: { filter: filter, ...graphqlQueryVars } }
    const { loading, error, data, fetchMore } = useQuery(query, queryVars)

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
            <Box m={2} display="flex" flexDirection="row">
                <FilterDropdown paramFn={setSearchParams} items={strainConfig.map(c => c.filterParam)} />
                {/* <SearchBox /> */}
            </Box>
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
