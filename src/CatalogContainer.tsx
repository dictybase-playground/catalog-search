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
  const [filter, setFilter] = React.useState<string>("")
  const [tags, setTags] = React.useState<string[]>([])

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: any }>,
  ) => {
    const val = event.target.value
    setFilter(val)
    setTags([`List: ${val}`])
  }

  return (
    <Box m={2} display="flex" flexDirection="row" alignItems="center">
      <FilterDropdown
        filterOptions={filterOptions}
        handleChange={handleChange}
        filter={filter}
      />
      <SearchBox tags={tags} setTags={setTags} />
    </Box>
  )
}

export default CatalogContainer
