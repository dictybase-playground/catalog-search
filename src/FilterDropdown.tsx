import React from "react"
import { makeStyles, Theme } from "@material-ui/core/styles"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import Input from "@material-ui/core/Input"
import { useCatalogStore } from "./CatalogContext"

const filterOptions = [
  "Regular Strains",
  "GWDI Strains",
  "All Available Strains",
  "Bacterial Strains",
]

const useStyles = makeStyles((theme: Theme) => ({
  filter: {
    minWidth: "200px",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: theme.spacing(1),
  },
  select: {
    "&:focus": {
      backgroundColor: "#fafafa",
    },
  },
}))

const FilterDropdown = () => {
  const classes = useStyles()
  const {
    state: { filter },
    setFilter,
    setTags,
  } = useCatalogStore()

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: any }>,
  ) => {
    const val = event.target.value
    setFilter(val)
    setTags([`List: ${val}`])
  }

  return (
    <span className={classes.filter}>
      <FormControl>
        <Select
          native
          onChange={handleChange}
          value={filter}
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
          <option value="Filters" disabled>
            Filters
          </option>
          {filterOptions.map((item, index) => (
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
