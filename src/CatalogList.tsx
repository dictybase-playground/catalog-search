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

export default function CatalogList({ data, target: targetRef }: AppProps.CatalogListProps<HTMLLIElement>): JSX.Element {
  const classes = useStyles()
  const { strains, nextCursor } = data.listStrains
  const lastIndex = strains.length - 1
  const component = strains.map((item: any, idx: number) => {
    let props: AppProps.CatalogListItemProps<HTMLLIElement> = { key: item.id, className: classes.row }
    if ((idx === lastIndex) && nextCursor !== 0) { // last item and expected to have more data
      props = { ref: targetRef, ...props }
    }
    return <ListItem {...props}> {item.id} - {item.label} </ListItem>
  })
  return component
}
