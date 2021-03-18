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
  "Regular Strains": ["Stock Type: Regular"],
  "GWDI Strains": ["Stock Type: GWDI"],
  "Available Regular Strains": ["Stock Type: Regular", "Currently Available"],
  "Bacterial Strains": ["Stock Type: Bacterial"],
} as Filters

const useStyles = makeStyles((theme: Theme) => ({
  filter: {
    minWidth: "220px",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    border: "1px #BDBDBD solid",
    borderRight: "0px",
    borderTopLeftRadius: "4px",
    borderBottomLeftRadius: "4px",
    fontSize: "0.9rem",
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
    filter: {
      strain_type: "ALL",
    },
  }
  // need to update this based on the strain_type filter
  return variables
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
