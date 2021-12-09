import { AppStrainTypes } from "../types/strain"

const listStrainsPagination = () => ({
  keyArgs: ["filter"],
  merge(existing:AppStrainTypes.ListStrainsData, incoming: AppStrainTypes.ListStrainsData) {
    let strains: AppStrainTypes.ListStrainsData["strains"] = []
    if (existing) {
      strains = strains.concat(existing.strains)
    }
    if (incoming) {
      strains = strains.concat(incoming.strains)
    }
    return {
      ...incoming,
      strains,
    }
  },
  read(existing: AppStrainTypes.ListStrainsData) {
    return existing
  },
})

export { listStrainsPagination }
