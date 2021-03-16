import { graphql } from "msw"
import {
  mockRegularStrains,
  mockBacterialStrains,
  mockRegularAvailableStrains,
  mockGWDIStrains,
} from "./mockStrains"

export const handlers = [
  graphql.query("StrainList", (req, res, ctx) => {
    return res(
      ctx.data({
        listStrains: mockRegularStrains.listRegularStrains,
      }),
    )
  }),
  graphql.query("RegularStrainList", (req, res, ctx) => {
    return res(ctx.data(mockRegularStrains))
  }),
  graphql.query("BacterialStrainList", (req, res, ctx) => {
    return res(ctx.data(mockBacterialStrains))
  }),
  graphql.query("StrainInventoryList", (req, res, ctx) => {
    const { strain_type } = req.variables

    switch (strain_type) {
      case "REGULAR":
        return res(ctx.data(mockRegularAvailableStrains))
      case "GWDI":
        return res(
          ctx.data({
            listStrainsInventory: mockGWDIStrains.listGWDIStrains,
          }),
        )
      default:
        return res(
          ctx.data({
            listStrainsInventory: mockRegularStrains.listRegularStrains,
          }),
        )
    }
  }),
  graphql.query("GWDIStrainList", (req, res, ctx) => {
    const { filter } = req.variables
    const splitFilter = filter.split(";")

    if (splitFilter.length === 1 && filter.includes("label")) {
      return res(
        ctx.data({
          listGWDIStrains: {
            ...mockGWDIStrains.listGWDIStrains,
            strains: mockGWDIStrains.listGWDIStrains.strains.filter((item) =>
              item.label.includes(filter.split("=")[1]),
            ),
          },
        }),
      )
    }

    return res(ctx.data(mockGWDIStrains))
  }),
]
