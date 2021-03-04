import React from "react"
import { ApolloProvider } from "@apollo/client"
import { BrowserRouter } from "react-router-dom"
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
        <BrowserRouter>
          <Container>
            <CatalogProvider>
              <CatalogContainer />
            </CatalogProvider>
          </Container>
        </BrowserRouter>
      </MuiThemeProvider>
    </ApolloProvider>
  )
}

export default App
