import React from "react"
import Box from "@material-ui/core/Box"
import SearchBox from "./SearchBox"
import FilterDropdown from "./FilterDropdown"

const filterOptions = [
  "Regular Strains",
  "GWDI Strains",
  "All Available Strains",
  "Bacterial Strains",
]

const CatalogContainer = () => {
  const [filter, setFilter] = React.useState("")

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: any }>,
  ) => {
    setFilter(event.target.value)
  }

  return (
    <Box m={2} display="flex" flexDirection="row" alignItems="center">
      <FilterDropdown
        options={filterOptions}
        handleChange={handleChange}
        value={filter}
      />
      <SearchBox />
    </Box>
  )
}

export default CatalogContainer
