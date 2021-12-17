import { AppProps } from "../types/props"
import { AppStrainTypes } from "../types/strain"

export default function useStrainCatalogSearch({
  searchParams, strainConfig,
  field = "group", value = "all"
}: AppProps.StrainCatalogSearchProps) {
  const param = searchParams.get(field) ?? value
  const config = strainConfig.find(c => c.filterParam === param) as AppStrainTypes.SearchConfigMember
  const filter = config?.queryFilter ?? ""
  return {
    filter,
    query: config.graphqlQuery,
    dataField: config.dataField
  }
}
