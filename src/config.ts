import {
  StrainListDocument,
  ListStrainsInventoryDocument,
  ListBacterialStrainsDocument
} from "dicty-graphql-schema"
import { AppStrainTypes } from "./types/strain";

export const StrainConfig: Array<AppStrainTypes.SearchConfigMember> = [{
  label: "Regular Strains",
  filterParam: "regular",
  graphqlQuery: StrainListDocument,
  queryFilter: "name!~GWDI;label!=AX4",
  displayChip: { label: "Stock Type", value: "Regular" }
}, {
  label: "GWDI Strains",
  filterParam: "gwdi",
  graphqlQuery: StrainListDocument,
  queryFilter: "name=~GWDI",
  displayChip: { label: "Stock Type", value: "GWDI" }
}, {
  label: "All Available Strains",
  filterParam: "all",
  graphqlQuery: ListStrainsInventoryDocument,
  displayChip: { label: "Stock Type", value: "All Available" }
}, {
  label: "Bacterial Strains",
  filterParam: "bacterial",
  graphqlQuery: ListBacterialStrainsDocument,
  displayChip: { label: "Stock Type", value: "Bacterial" }
}]
