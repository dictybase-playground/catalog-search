import React from "react"
import Chip from "@material-ui/core/Chip"
import Autocomplete from "@material-ui/lab/Autocomplete"
import { makeStyles, Theme } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import { useCatalogStore } from "./CatalogContext"

const options = ["Descriptor", "Summary", "ID"]

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    width: "100%",
  },
  root: {
    "& .MuiOutlinedInput-root": {
      borderTopLeftRadius: "0px",
      borderBottomLeftRadius: "0px",
    },
  },
}))

const SearchBox = () => {
  const classes = useStyles()
  const {
    state: { activeFilters },
    setPresetFilter,
    setActiveFilters,
  } = useCatalogStore()

  const handleChange = (event: React.ChangeEvent<{}>, value: string[]) => {
    setActiveFilters(value)
    // go back to default filter if no tags listed
    if (value.length === 0) {
      setPresetFilter("Filters")
    }
  }

  return (
    <span className={classes.container}>
      <Autocomplete
        multiple
        id="strain-catalog"
        options={options}
        freeSolo
        filterSelectedOptions
        onChange={handleChange}
        value={activeFilters}
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
            classes={{
              root: classes.root,
            }}
          />
        )}
      />
    </span>
  )
}

export default SearchBox
