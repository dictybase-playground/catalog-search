import { useState } from "react"
import { makeStyles, Theme } from "@material-ui/core/styles"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import Input from "@material-ui/core/Input"
import { AppProps } from "./types/props";

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

export default function FilterDropdown({ paramFn, items }: AppProps.FilterDropdownProps) {
  const classes = useStyles()
  const [value, setValue] = useState<string>("Filters")

  const handleChange = (event: React.ChangeEvent<{ name?: string; value: any }>) => {
    const val = event.target.value
    setValue(val)
    paramFn({ group: val })
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
          <option value="Filters" disabled>
            Filters
          </option>
          {items.map((k, i) => (<option value={k} key={i}> {k} </option>))}
        </Select>
      </FormControl>
    </span>
  )
}
