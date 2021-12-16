import {
  useStrainListQuery,
  useListStrainsInventoryQuery,
  useListBacterialStrainsQuery
} from "dicty-graphql-schema"

export const StrainConfig = [{
  label: "Regular Strains",
  filterParam: "regular",
  queryFn: useStrainListQuery,
  queryFilter: "name!~GWDI;label!=AX4",
  displayChip: { label: "Stock Type", value: "Regular" }
}, {
  label: "GWDI Strains",
  filterParam: "gwdi",
  queryFn: useStrainListQuery,
  queryFilter: "name=~GWDI",
  displayChip: { label: "Stock Type", value: "GWDI" }
}, {
  label: "All Available Strains",
  filterParam: "all",
  queryFn: useListStrainsInventoryQuery,
  queryFilter: "",
  displayChip: { label: "Stock Type", value: "All Available" }
}, {
  label: "Bacterial Strains",
  filterParam: "bacterial",
  queryFn: useListBacterialStrainsQuery,
  queryFilter: "",
  displayChip: { label: "Stock Type", value: "Bacterial" }
}]
