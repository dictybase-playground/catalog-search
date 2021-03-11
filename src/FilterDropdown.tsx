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
  "Available Regular Strains": ["stock_type: regular", "in_stock: true"],
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

const getGraphQLQueryVariables = (presetFilter: string) => {
  const variables = {
    cursor: 0,
    limit: 10,
  }
  switch (presetFilter) {
    case "GWDI Strains":
    case "Bacterial Strains":
    case "Regular Strains":
      return variables
    case "Available Regular Strains":
      return {
        ...variables,
        stock_type: "REGULAR",
      }
    default:
      return {
        ...variables,
        filter: "",
      }
  }
}

const FilterDropdown = () => {
  const classes = useStyles()
  const {
    state: { presetFilter },
    setPresetFilter,
    setActiveFilters,
    setQueryVariables,
  } = useCatalogStore()

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: any }>,
  ) => {
    const val = event.target.value
    setPresetFilter(val)
    setActiveFilters(presetFilters[val])
    const queryVars = getGraphQLQueryVariables(val)
    setQueryVariables(queryVars)
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
