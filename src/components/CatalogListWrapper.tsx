import { AppProps } from "../types/props"
import { makeStyles } from "@material-ui/core/styles"
import { DefaultTheme } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper"
import useWindowSize from "../hooks/useWindowSize"


const useStyles = makeStyles<DefaultTheme, AppProps.SizeProps>({
  root: {
    height: ({ height }) => height,
    overflowY: "scroll",
  }
})

export default function CatalogListWrapper({ root: rootRef, children }: AppProps.CatalogListWrapperProps): JSX.Element {
  const {height} = useWindowSize()
  // 50% of actual client window height
  const classes = useStyles({ height: height && 60*height/100 })
  return (
    <Paper ref={rootRef} className={classes.root}>
        {children}
    </Paper>
  )
}
