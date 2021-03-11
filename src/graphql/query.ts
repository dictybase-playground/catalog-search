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

const GET_REGULAR_STRAIN_LIST = gql`
  query RegularStrainList($cursor: Int!, $limit: Int!, $filter: String!) {
    listRegularStrains(cursor: $cursor, limit: $limit, filter: $filter) {
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

const GET_GWDI_STRAIN_LIST = gql`
  query GWDIStrainList($cursor: Int!, $limit: Int!, $filter: String!) {
    listGWDIStrains(cursor: $cursor, limit: $limit, filter: $filter) {
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

const GET_STRAIN_INVENTORY_LIST = gql`
  query StrainInventoryList(
    $cursor: Int!
    $limit: Int!
    $filter: String!
    $strain_type: String!
  ) {
    listStrainsInventory(
      cursor: $cursor
      limit: $limit
      filter: $filter
      strain_type: $strain_type
    ) {
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

const GET_BACTERIAL_STRAIN_LIST = gql`
  query BacterialStrainList($cursor: Int!, $limit: Int!) {
    listBacterialStrains(cursor: $cursor, limit: $limit) {
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

export {
  GET_STRAIN_LIST,
  GET_REGULAR_STRAIN_LIST,
  GET_GWDI_STRAIN_LIST,
  GET_STRAIN_INVENTORY_LIST,
  GET_BACTERIAL_STRAIN_LIST,
}
