import {
  StrainListDocument,
  ListStrainsInventoryDocument,
  ListBacterialStrainsDocument
} from "dicty-graphql-schema"
import { AppStrainTypes } from "./types/strain"

export const graphqlQueryVars = { cursor: 0, limit: 12 }

export const strainConfig: Array<AppStrainTypes.SearchConfigMember> = [{
  label: "Regular Strains",
  filterParam: "regular",
  graphqlQuery: StrainListDocument,
  queryFilter: "name!~GWDI;label!=AX4",
  dataField: "listStrains",
  displayChip: { label: "Stock Type", value: "Regular" }
}, {
  label: "GWDI Strains",
  filterParam: "gwdi",
  graphqlQuery: StrainListDocument,
  queryFilter: "name=~GWDI",
  dataField: "listStrains",
  displayChip: { label: "Stock Type", value: "GWDI" }
}, {
  label: "All Available Strains",
  filterParam: "all",
  graphqlQuery: ListStrainsInventoryDocument,
  dataField: "listStrainsWithAnnotation",
  displayChip: { label: "Stock Type", value: "All Available" }
}, {
  label: "Bacterial Strains",
  filterParam: "bacterial",
  graphqlQuery: ListBacterialStrainsDocument,
  dataField: "bacterialFoodSource",
  displayChip: { label: "Stock Type", value: "Bacterial" }
}]
