import React from "react"
import Box from "@material-ui/core/Box"
import SearchBox from "./SearchBox"
import FilterDropdown from "./FilterDropdown"

const CatalogContainer = () => {
  return (
    <Box m={2} display="flex" flexDirection="row" alignItems="center">
      <FilterDropdown />
      <SearchBox />
    </Box>
  )
}

export default CatalogContainer
