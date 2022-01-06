open Mui

let px_of_int = x => x->string_of_int ++ "px"

let useStyles = Styles.makeStylesWithTheme(theme =>
  {
    "filter": ReactDOM.Style.make(
      ~minWidth="220px",
      ~display="flex",
      ~justifyContent="flex-end",
      ~alignItems="center",
      ~paddingLeft=theme.spacing(1)->px_of_int,
      ~paddingRight=theme.spacing(1)->px_of_int,
      ~border="1px #BDBDBD solid",
      ~borderRight="0px",
      ~borderTopLeftRadius="4px",
      ~borderBottomLeftRadius="0.9rem",
      (),
    ),
  }
)

type params = {group: string}
type paramSetFn = params => unit

@react.component
let make = (~paramFn: paramSetFn, ~items: array<string>) => {
  let classes = useStyles(.)
  let (value, setValue) = React.useState(_ => "Filters")
  let handleChange = (event: ReactEvent.Form.t, _) => {
    let val = ReactEvent.Form.target(event)["value"]
    setValue(_ => val)
    paramFn({group: val})
  }
  <span className={classes["filter"]}>
    <FormControl>
      <Select
        onChange=handleChange
        native={true}
        value={Select.Value.string(value)}
        input={<Input disableUnderline={true} name="catalog-filter" id="catalog-filter" />}>
        <option value="Filters" disabled={true}> {React.string(value)} </option>
        {Belt.Array.mapWithIndex(items, (idx, x) => {
          <option value={x} key={Belt.Int.toString(idx)}> {React.string(x)} </option>
        })->React.array}
      </Select>
    </FormControl>
  </span>
}
