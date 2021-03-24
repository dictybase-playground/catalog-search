import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { listStrainsPagination } from "../graphql/pagination"

const useApolloClient = () => {
  const authLink = setContext((request, { headers }) => {
    return {
      headers: {
        ...headers,
        "X-GraphQL-Method": "Query",
      },
    }
  })

  const link = authLink.concat(
    createHttpLink({
      uri: `${process.env.REACT_APP_GRAPHQL_SERVER}/graphql`,
      credentials: "include",
    }),
  )

  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          listStrains: listStrainsPagination(),
        },
      },
    },
  })

  return new ApolloClient({
    cache,
    link,
  })
}

export default useApolloClient
