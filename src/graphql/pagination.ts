import { ListStrainsData } from "../types/strain"

const listStrainsPagination = () => ({
  keyArgs: ["filter"],
  merge(existing: ListStrainsData, incoming: ListStrainsData) {
    let strains: ListStrainsData["strains"] = []
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
  read(existing: ListStrainsData) {
    return existing
  },
})

export { listStrainsPagination }
