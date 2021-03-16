import React from "react"
import Autocomplete from "@material-ui/lab/Autocomplete"
import { makeStyles, Theme } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import TagsDisplay from "./TagsDisplay"
import { useCatalogStore } from "./CatalogContext"
import useSearchBox from "./hooks/useSearchBox"

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
  } = useCatalogStore()
  const { handleChange, handleDisplayOptions } = useSearchBox()

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

export default SearchBox
