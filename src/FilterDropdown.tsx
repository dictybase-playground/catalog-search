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

export default function FilterDropdown({ paramFn, items, defaultFilterParam }: AppProps.FilterDropdownProps) {
  const classes = useStyles()
  const defaultObj = items.find(it => it.filterParam === defaultFilterParam) as AppProps.ItemProps
  const [value, setValue] = useState<string>(defaultObj.label)

  const handleChange = (event: React.ChangeEvent<{ name?: string; value: any }>) => {
    const filter = event.target.value
    const obj = items.find(it => it.filterParam === filter) as AppProps.ItemProps
    setValue(obj.label)
    paramFn({ group: filter })
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
          <option value={defaultObj.filterParam} disabled>
            {defaultObj.label}
          </option>
          {
            items.filter(obj => obj.filterParam !== defaultObj.filterParam)
              .map((obj, i: number) => (
                (<option value={obj.filterParam} key={i}> {obj.label} </option>)
              ))
          }
        </Select>
      </FormControl>
    </span>
  )
}
