import React from "react"
import Box from "@material-ui/core/Box"
import SearchBox from "./SearchBox"
import FilterDropdown from "./FilterDropdown"
import { useCatalogStore } from "./CatalogContext"

const filterOptions = [
  "Regular Strains",
  "GWDI Strains",
  "All Available Strains",
  "Bacterial Strains",
]

const CatalogContainer = () => {
  const {
    state: { filter },
    setFilter,
  } = useCatalogStore()
  const [tags, setTags] = React.useState<string[]>([])

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: any }>,
  ) => {
    const val = event.target.value
    setFilter(filter)
    setTags([`List: ${val}`])
  }

  return (
    <Box m={2} display="flex" flexDirection="row" alignItems="center">
      <FilterDropdown
        filterOptions={filterOptions}
        handleChange={handleChange}
      />
      <SearchBox tags={tags} setTags={setTags} />
    </Box>
  )
}

export default CatalogContainer
