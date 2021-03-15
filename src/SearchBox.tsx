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

const handleChipDisplay = (
  value: string[],
  setActiveFilters: (arg0: string[]) => void,
) => {
  const lastIndex = value.length - 1
  const secondToLastIndex = value.length - 2
  const lastVal = value[lastIndex]
  const secondToLastVal = value[secondToLastIndex]

  // if the last value is from the list of options then that means the user
  // has not entered a search value yet; no further action is necessary
  if (options.includes(lastVal)) {
    setActiveFilters(value)
    return
  }

  // if there is a last value and it
  if (lastVal && lastVal.includes(":")) {
    setActiveFilters(value)
  } else {
    const newChip = `${secondToLastVal}:${lastVal}`
    const updatedTags = [...value.slice(0, secondToLastIndex), newChip]
    setActiveFilters(updatedTags)
  }
}

const SearchBox = () => {
  const classes = useStyles()
  const {
    state: { activeFilters },
    setPresetFilter,
    setActiveFilters,
  } = useCatalogStore()

  const handleChange = (event: React.ChangeEvent<{}>, value: string[]) => {
    handleChipDisplay(value, setActiveFilters)
    // go back to default filter if no tags listed
    if (value.length === 0) {
      setPresetFilter("Filters")
      setActiveFilters(value)
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
            const lastVal = value[value.length - 1]
            if (lastVal === option && options.includes(option)) {
              return <span key={index}>{option}:</span>
            }
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
