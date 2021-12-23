open Mui

@react.component
let make = (~root as rootRef: ReactDOM.domRef, ~children: array<React.element>) => {
  let {height} = CatalogSearchHook.useWindowSize()
  let cssHeight = Belt.Int.toString(height * 60 / 100) ++ "px"
  let useStyles = Styles.makeStyles({
    "root": ReactDOM.Style.make(~overflowY="scroll", ~height={cssHeight}, ()),
  })
  let classes = useStyles(.)
  <Paper ref={rootRef} className={classes["root"]}> {children->React.array} </Paper>
}
