import { useState } from "react"
import { makeStyles, Theme } from "@material-ui/core/styles"
import FormControl from "@material-ui/core/FormControl"
import NativeSelect from "@material-ui/core/NativeSelect"
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
}))

export default function FilterDropdown({ paramFn, items, defaultFilterParam }: AppProps.FilterDropdownProps) {
  const classes = useStyles()
  const [filterValue, setFilterValue] = useState<string>(defaultFilterParam)

  const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const filter = event.target.value as string
    setFilterValue(filter)
    paramFn({ group: filter })
  }

  return (
    <div>
      <FormControl variant="outlined" className={classes.filter}>
        <NativeSelect onChange={handleChange} value={filterValue}>
          {items.map((obj, i) => (
            <option value={obj.filterParam} key={i}>
              {obj.label}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </div>
  )
}
