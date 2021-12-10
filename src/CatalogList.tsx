import { makeStyles } from "@material-ui/core/styles"
import ListItem from "@material-ui/core/ListItem"
import { AppProps } from "./types/props"

const useStyles = makeStyles(() => ({
  row: {
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
    "&:hover": {
      backgroundColor: "#eeeeee",
      boxShadow:
        "inset 1px 0 0 #dadce0,inset -1px 0 0 #dadce0,0 1px 2px 0 rgba(60,64,67,.3),0 1px 3px 1px rgba(60,64,67,.15)",
      zIndex: 1,
    },
  }
}))

export default function CatalogList({ data, target: targetRef }: AppProps.CatalogListProps): JSX.Element {
  const classes = useStyles()
  let component = null
  if (data) {
    const { strains, nextCursor } = data.listStrains
    component = strains.map((item: any, idx: number) => {
      if ((idx === strains.length - 1) && nextCursor) { // last item and expected to have more data
        return (
          <ListItem
            ref={targetRef} key={item.id}
            className={classes.row}
          >
            {item.id} - {item.label}
          </ListItem>
        )
      }
      return <ListItem key={item.id} className={classes.row}>{item.id} - {item.label}</ListItem>
    })
  }
  return component
}
