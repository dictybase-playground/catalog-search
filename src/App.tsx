import { ApolloProvider } from "@apollo/client"
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import CatalogContainer from "./CatalogContainer"
import { CatalogProvider } from "./CatalogContext"
import useApolloClient from "./hooks/useApolloClient"

const theme = createMuiTheme({})

const App = () => {
  const apolloClient = useApolloClient()

  return (
    <ApolloProvider client={apolloClient}>
      <MuiThemeProvider theme={theme}>
        <Container>
          <CatalogProvider>
            <CatalogContainer />
          </CatalogProvider>
        </Container>
      </MuiThemeProvider>
    </ApolloProvider>
  )
}

export default App
