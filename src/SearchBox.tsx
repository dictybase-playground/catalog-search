import React from "react"
import Autocomplete from "@material-ui/lab/Autocomplete"
import { makeStyles, Theme } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import TagsDisplay from "./TagsDisplay"
import { useCatalogStore } from "./CatalogContext"

const options = ["Descriptor", "Summary", "ID", "Currently Available"]

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

const handleTagDisplay = (
  tags: string[],
  setActiveFilters: (arg0: string[]) => void,
) => {
  const lastIndex = tags.length - 1
  const secondToLastIndex = tags.length - 2
  const lastTag = tags[lastIndex]
  const secondToLastTag = tags[secondToLastIndex]

  const lastTagIsKeyVal = lastTag && lastTag.includes(":")
  const lastTagIsKey = options.includes(lastTag)

  // If the last value is from the list of options then that means the user
  // has not entered a search value yet. No further action is necessary.
  //
  // If the last tag is from the list of options (i.e. Descriptor, ID, etc.) or
  // it is a combined key:val (i.e. in_stock:true) then the active filters state
  // is updated as normal.
  // Else, the last tag is just a value and needs to be appended to the previous
  // key (therefore creating one tag instead of two).
  if (lastTagIsKey || lastTagIsKeyVal) {
    setActiveFilters(tags)
  } else {
    const newTag = `${secondToLastTag}: ${lastTag}`
    const updatedTags = [...tags.slice(0, secondToLastIndex), newTag]
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
    handleTagDisplay(value, setActiveFilters)
    // go back to default filter if no tags listed
    if (value.length === 0) {
      setPresetFilter("Filters")
      setActiveFilters(value)
    }
  }

  const handleDisplayOptions = () => {
    const lastVal = activeFilters[activeFilters.length - 1]
    // if the last filter is in the list of options then only return empty array
    // unless it is a Currently Available tag
    if (lastVal !== "Currently Available" && options.includes(lastVal)) {
      return []
    }
    // otherwise return the normal autocomplete options
    return options
  }

  return (
    <span className={classes.container}>
      <Autocomplete
        multiple
        id="strain-catalog"
        options={handleDisplayOptions()}
        freeSolo
        filterSelectedOptions
        onChange={handleChange}
        value={activeFilters}
        renderTags={(value: string[], getTagProps) => {
          return value.map((option: string, index: number) => {
            return (
              <TagsDisplay
                activeFilters={value}
                autocompleteOptions={options}
                getTagProps={getTagProps}
                currentOption={option}
                currentIndex={index}
                key={index}
              />
            )
          })
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            autoFocus
            variant="outlined"
            label="Search"
            placeholder={
              activeFilters.length < 1 ? "Search strain catalog..." : ""
            }
            classes={{
              root: classes.root,
            }}
          />
        )}
      />
    </span>
  )
}

export { handleTagDisplay }
export default SearchBox
