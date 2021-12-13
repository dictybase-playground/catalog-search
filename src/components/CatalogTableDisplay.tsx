import { AppProps } from "../types/props"
// import { makeStyles } from "@material-ui/core/styles"
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const truncate = (input: string, length: number): string => {
  if (input.length <= length) return input
  return input.slice(0, length)
}

const rowFn = ({ strains, nextCursor, targetRef, lastIndex }: AppProps.CatalogRowFnProps<HTMLTableRowElement>) => {
  const rows = strains.map((item: any, idx: number) => {
    let props: AppProps.CatalogTableRowProps<HTMLTableRowElement> = { key: item.id }
    if ((idx === lastIndex) && nextCursor !== 0) { // last item and expected to have more data
      props = { ref: targetRef, ...props }
    }
    return (
      <TableRow {...props}>
        <TableCell>{item.label}</TableCell>
        <TableCell>{truncate(item.summary, 84).concat("...")}</TableCell>
        <TableCell>{item.id}</TableCell>
      </TableRow>
    )
  })
  return rows
}

const tblHeaders = [
  "Strain Descriptor",
  "Strain Summary",
  "Strain ID"
]

const headerFn = ({ headers = tblHeaders }) => {
  return (
    <TableRow>{
      headers.map((h: string, i: number) => <TableCell key={i}>{h}</TableCell>)
    }
    </TableRow>
  )
}

export default function CatalogTableDisplay({ data, target: targetRef }: AppProps.CatalogListProps<HTMLTableRowElement>): JSX.Element {
  const { strains, nextCursor } = data.listStrains
  const lastIndex = strains.length - 1
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          {headerFn({})}
        </TableHead>
        <TableBody>
          {rowFn({ strains, nextCursor, targetRef, lastIndex })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
