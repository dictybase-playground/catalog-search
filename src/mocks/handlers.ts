import { graphql } from "msw"
import {
  firstTenStrainCatalogItems,
  mockBacterialStrains,
  mockRegularAvailableStrains,
  mockGWDIStrains,
  nextTenStrainCatalogItems,
  lastFiveStrainCatalogItems,
} from "./mockStrains"

export const handlers = [
  graphql.query("StrainList", (req, res, ctx) => {
    const { strain_type } = req.variables.filter
    switch (strain_type) {
      case "ALL":
        const { cursor } = req.variables

        if (cursor === firstTenStrainCatalogItems.listStrains.nextCursor) {
          return res(
            ctx.data({
              listStrains: nextTenStrainCatalogItems.listStrains,
            }),
          )
        }

        if (cursor === nextTenStrainCatalogItems.listStrains.nextCursor) {
          return res(
            ctx.data({
              listStrains: lastFiveStrainCatalogItems.listStrains,
            }),
          )
        }

        return res(
          ctx.data({
            listStrains: firstTenStrainCatalogItems.listStrains,
          }),
        )
      case "GWDI":
        const { label } = req.variables.filter

        if (label !== undefined) {
          return res(
            ctx.data({
              listStrains: {
                ...mockGWDIStrains.listStrains,
                strains: mockGWDIStrains.listStrains.strains.filter((item) =>
                  item.label.includes(label),
                ),
              },
            }),
          )
        }

        return res(ctx.data(mockGWDIStrains))
      case "REGULAR":
        return res(ctx.data(mockRegularAvailableStrains))
      case "BACTERIAL":
        return res(ctx.data(mockBacterialStrains))
    }
  }),
]
