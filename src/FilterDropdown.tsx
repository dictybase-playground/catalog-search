import React from "react"
import { makeStyles, Theme } from "@material-ui/core/styles"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import Input from "@material-ui/core/Input"
import { useCatalogStore } from "./CatalogContext"

type Filters = {
  [key: string]: string[]
}

const presetFilters = {
  "Regular Strains": ["stock_type: regular"],
  "GWDI Strains": ["stock_type: GWDI"],
  "All Available Strains": ["stock_type: all", "in_stock: true"],
  "Bacterial Strains": ["stock_type: bacterial"],
} as Filters

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
    state: { presetFilter },
    setPresetFilter,
    setActiveFilters,
  } = useCatalogStore()

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: any }>,
  ) => {
    const val = event.target.value
    setPresetFilter(val)
    setActiveFilters(presetFilters[val])
  }

  return (
    <span className={classes.filter}>
      <FormControl>
        <Select
          native
          onChange={handleChange}
          value={presetFilter}
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
          {Object.keys(presetFilters).map((item, index) => (
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
