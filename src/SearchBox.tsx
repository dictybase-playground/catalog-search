import React from "react"
import Chip from "@material-ui/core/Chip"
import Autocomplete from "@material-ui/lab/Autocomplete"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import { useCatalogStore } from "./CatalogContext"

const options = ["Descriptor", "Summary", "ID"]

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
  }),
)

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
