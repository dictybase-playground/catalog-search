import React from "react"
import { makeStyles, Theme } from "@material-ui/core/styles"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import Input from "@material-ui/core/Input"

const options = [
  "Regular Strains",
  "GWDI Strains",
  "All Available Strains",
  "Bacterial Strains",
]

const useStyles = makeStyles((theme: Theme) => ({
  filter: {
    // border: "1px solid grey",
    minWidth: "200px",
  },
  select: {
    "&:focus": {
      backgroundColor: "#fafafa",
    },
  },
}))

const FilterDropdown = () => {
  const classes = useStyles()
  const [value, setValue] = React.useState("")

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: any }>,
  ) => {
    setValue(event.target.value)
  }

  return (
    <span className={classes.filter}>
      <FormControl>
        <Select
          native
          onChange={handleChange}
          value={value}
          input={
            <Input
              disableUnderline
              name="catalog-filter"
              data-testid="catalog-filter"
              classes={{
                input: classes.select,
              }}
            />
          }>
          <option aria-label="None" value="" />
          {options.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </Select>
      </FormControl>
    </span>
  )
}

export default FilterDropdown
