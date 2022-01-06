open Mui

let fontWeightBold = "700"
let fontWeightMedium = "500"
let fontWeightRegular = "400"
let fontWeightLight = "300"

module Subtitle1 = {
  let fontSize = "1rem"
  let fontWeight = fontWeightRegular
  let letterSpacing = "0.15px"
}

module Body1 = {
  let fontSize = "1rem"
  let fontWeight = fontWeightRegular
  let letterSpacing = "0.5px"
}

module Body2 = {
  let fontSize = "0.875rem"
  let fontWeight = fontWeightRegular
  let letterSpacing = "0.25px"
}

module TableDisplayProps = {
  type strain = {
    id: string,
    summary: string,
    label: string,
  }
  type tblRowRef = ReactDOM.domRef
  type graphqlRecord = {
    nextCursor: int,
    totalCount: int,
    strains: array<strain>,
  }
  type graphqlResp = Js.Dict.t<graphqlRecord>
}

module CatalogTableItem = {
  let useStyles = Styles.makeStyles({
    "root": ReactDOM.Style.make(
      ~fontSize={Body1.fontSize},
      ~fontWeight={Body1.fontWeight},
      ~letterSpacing={Body1.letterSpacing},
      (),
    ),
  })

  let truncateSummary = input => {
    Js.String2.concat(Js.String2.slice(input, ~from=0, ~to_=85), "...")
  }

  @react.component
  let make = (~item: TableDisplayProps.strain) => {
    let classes = useStyles(.)
    <>
      <TableCell className={classes["root"]}> {React.string(item.label)} </TableCell>
      <TableCell className={classes["root"]}>
        {React.string(truncateSummary(item.summary))}
      </TableCell>
      <TableCell className={classes["root"]}> {React.string(item.id)} </TableCell>
    </>
  }
}

module CatalogTableRow = {
  @react.component
  let make = (
    ~nextCursor: int,
    ~lastIndex: int,
    ~targetRef: TableDisplayProps.tblRowRef,
    ~strains: array<TableDisplayProps.strain>,
  ) => {
    {
      Belt.Array.mapWithIndex(strains, (idx, item) => {
        let k = Belt.Int.toString(idx) ++ item.id
        if idx === lastIndex && nextCursor !== 0 {
          <>
            <TableRow key={k}> <CatalogTableItem item={item} /> </TableRow>
            <TableRow key={Belt.Int.toString(idx)} ref={targetRef}>
              <TableCell colSpan={3}> <LinearProgress /> </TableCell>
            </TableRow>
          </>
        } else {
          <TableRow key={Belt.Int.toString(idx)}> <CatalogTableItem item={item} /> </TableRow>
        }
      })
    }->React.array
  }
}

module CatalogTableHeader = {
  let columns = ["Strain Descriptor", "Strain Summary", "Strain ID"]
  let useStyles = Styles.makeStyles({
    "root": ReactDOM.Style.make(
      ~borderBottom="2px solid " ++ Colors.indigo["700"],
      ~fontSize={Subtitle1.fontSize},
      ~fontWeight={fontWeightBold},
      ~letterSpacing={Subtitle1.letterSpacing},
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

let useStyles = Styles.makeStyles({
  "root": ReactDOM.Style.make(~overflowX="initial", ()),
})
@react.component
let make = (
  ~dataField: string,
  ~target: TableDisplayProps.tblRowRef,
  ~data: TableDisplayProps.graphqlResp,
) => {
  let classes = useStyles(.)
  <TableContainer className={classes["root"]}>
    {switch data->Js.Dict.get(dataField) {
    | None => React.string("no data")
    | Some({strains, nextCursor}) =>
      <Table stickyHeader={true}>
        <TableHead> <CatalogTableHeader /> </TableHead>
        <TableBody>
          <CatalogTableRow
            nextCursor={nextCursor}
            lastIndex={strains->Belt.Array.length - 1}
            targetRef={target}
            strains={strains}
          />
        </TableBody>
      </Table>
    }}
  </TableContainer>
}
