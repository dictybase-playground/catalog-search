import { gql } from "@apollo/client"

const GET_STRAIN_LIST = gql`
  query StrainList($cursor: Int!, $limit: Int!, $filter: String!) {
    listStrains(cursor: $cursor, limit: $limit, filter: $filter) {
      nextCursor
      totalCount
      strains {
        id
        label
        summary
        in_stock
      }
    }
  }
`

export { GET_STRAIN_LIST }
