import { AppProps } from "../types/props"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import List from "@material-ui/core/List"


const useStyles = makeStyles(() => ({
  container: {
    height: "310px",
    overflow: "auto",
  },
  row: {
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
    "&:hover": {
      backgroundColor: "#eeeeee",
      boxShadow:
        "inset 1px 0 0 #dadce0,inset -1px 0 0 #dadce0,0 1px 2px 0 rgba(60,64,67,.3),0 1px 3px 1px rgba(60,64,67,.15)",
      zIndex: 1,
    },
  },
  loading: {
    color: "tomato",
  },
}))

export default function CatalogListWrapper({ root: rootRef, children }: AppProps.CatalogListWrapperProps): JSX.Element {
  const classes = useStyles()
  return (
    <Paper ref={rootRef} className={classes.container}>
      <List>
        {children}
      </List>
    </Paper>
  )
}
