import React from "react"
import { makeStyles, Theme } from "@material-ui/core/styles"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import Input from "@material-ui/core/Input"
import { useCatalogStore } from "./CatalogContext"

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

type Props = {
  /** List of filters to display in dropdown */
  filterOptions: string[]
  /** Callback used on item select */
  handleChange: (
    event: React.ChangeEvent<{ name?: string; value: any }>,
  ) => void
}

const FilterDropdown = ({ filterOptions, handleChange }: Props) => {
  const classes = useStyles()
  const { state } = useCatalogStore()

  return (
    <span className={classes.filter}>
      <FormControl>
        <Select
          native
          onChange={handleChange}
          value={state.filter}
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
