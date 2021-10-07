import React from "react"
import { makeStyles, Theme } from "@material-ui/core/styles"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import Input from "@material-ui/core/Input"
import { useCatalogStore } from "./CatalogContext"
import { QueryVariables } from "./types/context"

type Filters = {
  [key: string]: {
    tags: string[]
    queryFilter: QueryVariables["filter"]
  }
}

/**
 * Returns the full option name, given a strain (Ex. `filterWithStrain("GWDI") -> "GWDI Strains"`)
 * @param strain Type of strain: Regular, GWDI, Bacterial
 * @returns [Strain] Strains
 */
export const getFilterChipLabel = (strain: string = "Regular") => `Stock Type: ${strain}`

export const getStrainType = (strain: string = "Regular") => strain.toUpperCase()

const presetFilters = {
  "Regular Strains": {
    tags: [getFilterChipLabel()],
    queryFilter: {
      strain_type: getStrainType(),
    },
  },
  "GWDI Strains": {
    tags: [getFilterChipLabel("GWDI")],
    queryFilter: {
      strain_type: getStrainType("GWDI"),
    },
  },
  "Bacterial Strains": {
    tags: [getFilterChipLabel("Bacterial")],
    queryFilter: {
      strain_type: getStrainType("Bacterial"),
    },
  },
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
    setActiveFilters(presetFilters[val].tags)
    setQueryVariables({
      cursor: 0,
      limit: 10,
      filter: presetFilters[val].queryFilter,
    })
  }

  return (
    <span className={classes.filter}>
      <FormControl fullWidth={true}>
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
