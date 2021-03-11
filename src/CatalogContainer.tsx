import React from "react"
import { useQuery } from "@apollo/client"
import Box from "@material-ui/core/Box"
import SearchBox from "./SearchBox"
import FilterDropdown from "./FilterDropdown"
import CatalogList from "./CatalogList"
import {
  GET_STRAIN_LIST,
  GET_REGULAR_STRAIN_LIST,
  GET_GWDI_STRAIN_LIST,
  GET_STRAIN_INVENTORY_LIST,
  GET_BACTERIAL_STRAIN_LIST,
} from "./graphql/query"
import { useCatalogStore } from "./CatalogContext"

// convert the active filters to a proper graphql filter string
// i.e. ["stock_type: all", "label: sad"]
// equals stock_type==all;label~=true
const convertFiltersToGraphQL = (filters: string[]) => {
  return filters
    .map((item) => {
      if (item.includes("stock_type") || item.includes("in_stock")) {
        return item.replace(": ", "==")
      }
      return item.replace(": ", "~=")
    })
    .join(";")
}

// convert the GraphQL data response into a normalized object
const normalizeDataObject = (data: any) => {
  let convertedData = data

  switch (true) {
    case data.hasOwnProperty("listStrains"): {
      convertedData = data.listStrains
      break
    }
    case data.hasOwnProperty("listRegularStrains"): {
      convertedData = data.listRegularStrains
      break
    }
    case data.hasOwnProperty("listGWDIStrains"): {
      convertedData = data.listGWDIStrains
      break
    }
    case data.hasOwnProperty("listStrainsInventory"): {
      convertedData = data.listStrainsInventory
      break
    }
    case data.hasOwnProperty("listBacterialStrains"): {
      convertedData = data.listBacterialStrains
      break
    }
    default:
      return convertedData
  }

  return convertedData
}

// get appropriate query based on dropdown selection
const getGraphQLQuery = (filter: string) => {
  switch (filter) {
    case "Regular Strains":
      return GET_REGULAR_STRAIN_LIST
    case "GWDI Strains":
      return GET_GWDI_STRAIN_LIST
    case "Available Regular Strains":
      return GET_STRAIN_INVENTORY_LIST
    case "Bacterial Strains":
      return GET_BACTERIAL_STRAIN_LIST
    default:
      return GET_STRAIN_LIST
  }
}

const CatalogContainer = () => {
  const {
    state: { presetFilter, queryVariables },
  } = useCatalogStore()
  const { loading, error, data } = useQuery(getGraphQLQuery(presetFilter), {
    variables: queryVariables,
  })

  if (loading) {
    return <div>loading...</div>
  }

  if (error) {
    console.log(error)
    return <div>got error</div>
  }

  return (
    <React.Fragment>
      <Box m={2} display="flex" flexDirection="row" alignItems="center">
        <FilterDropdown />
        <SearchBox />
      </Box>
      <Box>
        <CatalogList data={normalizeDataObject(data)} />
      </Box>
    </React.Fragment>
  )
}

export { convertFiltersToGraphQL }
export default CatalogContainer
