import React from "react"
import Chip from "@material-ui/core/Chip"
import Autocomplete from "@material-ui/lab/Autocomplete"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import { useCatalogStore } from "./CatalogContext"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
  }),
)

const options = ["Descriptor", "Summary", "ID"]

// const getDropdownValues = (tags: string[], options: string[]) => {
// if last element in tags array is a search property then we need to
// fetch data, otherwise it should display a list of the properties
//   return options.map((item) => item)
// }

// const getTagDisplays = () => {}

/**
 * Logic to implement:
 *
 * 1. Adding tag shows the property (i.e. Label:)
 * 2. When user starts typing, fetch data that matches property/value
 * 3. After user enters value, turn this into a Chip
 */

const SearchBox = () => {
  const classes = useStyles()
  const {
    state: { tags },
    setFilter,
    setTags,
  } = useCatalogStore()

  const handleChange = (event: React.ChangeEvent<{}>, value: string[]) => {
    setTags(value)
    // go back to default filter if no tags listed
    if (value.length === 0) {
      setFilter("Filters")
    }
  }

  return (
    <span className={classes.root}>
      <Autocomplete
        multiple
        id="strain-catalog"
        options={options.map((item) => item)}
        freeSolo
        filterSelectedOptions
        onChange={handleChange}
        value={tags}
        renderTags={(value: string[], getTagProps) => {
          return value.map((option: string, index: number) => {
            return (
              <Chip
                variant="outlined"
                color="default"
                label={option}
                {...getTagProps({ index })}
              />
            )
          })
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Search"
            placeholder="Search strain catalog..."
          />
        )}
      />
    </span>
  )
}

export default SearchBox
