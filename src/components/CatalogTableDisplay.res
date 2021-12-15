open Mui

module CatalogTableHeader = {
  let columns = ["Strain Descriptor", "Strain Summary", "Strain ID"]
  let useStyles = Styles.makeStyles({
    "root": ReactDOM.Style.make(
      ~borderBottom="2px solid " ++ Colors.indigo["700"],
      ~fontSize="16px",
      ~fontWeight="bold",
      ~letterSpacing="0.15px",
      (),
    ),
  })
  @react.component
  let make = () => {
    let classes = useStyles(.)
    <TableRow>
      {Belt.Array.mapWithIndex(columns, (i, c) => {
        <TableCell key={Belt.Int.toString(i)} className={classes["root"]}>
          {React.string(c)}
        </TableCell>
      })->React.array}
    </TableRow>
  }
}

module CatalogTableItem = {
  type tableItem = {
    id: string,
    summary: string,
    label: string,
  }

  let useStyles = Styles.makeStyles({
    "root": ReactDOM.Style.make(~fontSize="16px", ~fontWeight="bold", ~letterSpacing="0.15px", ()),
  })

  @react.component
  let make = (~item: tableItem) => {
    let classes = useStyles(.)
    <>
      <TableCell className={classes["root"]}> {React.string(item.label)} </TableCell>
      <TableCell className={classes["root"]}> {React.string(item.summary)} </TableCell>
      <TableCell className={classes["root"]}> {React.string(item.id)} </TableCell>
    </>
  }
}
