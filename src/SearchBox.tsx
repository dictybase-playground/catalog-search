import React from "react"
import Chip from "@material-ui/core/Chip"
import Autocomplete from "@material-ui/lab/Autocomplete"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import mockStrains from "./mockStrains"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
  }),
)

const options = ["Label", "Summary", "ID"]

const getDropdownValues = () => {}

const getTagDisplays = () => {}

const SearchBox = () => {
  const classes = useStyles()
  const [tags, setTags] = React.useState<string[]>([])

  const handleChange = (event: React.ChangeEvent<{}>, value: string[]) => {
    event.preventDefault()
    setTags([...tags, value[0]])
  }

  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        id="strain-catalog"
        options={options.map((item) => item)}
        freeSolo
        filterSelectedOptions
        onChange={handleChange}
        renderTags={(value: string[], getTagProps) =>
          value.map((option: string, index: number) => {
            console.log(value)
            if (tags.includes(option)) {
              return <span key={index}>{option}:</span>
            } else {
              return (
                <Chip
                  variant="outlined"
                  color="default"
                  label={option}
                  {...getTagProps({ index })}
                />
              )
            }
          })
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Search"
            placeholder="Search strain catalog..."
          />
        )}
      />
    </div>
  )
}

export default SearchBox
