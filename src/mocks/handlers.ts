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
    return res(ctx.data(mockRegularAvailableStrains))
  }),
  graphql.query("GWDIStrainList", (req, res, ctx) => {
    return res(ctx.data(mockGWDIStrains))
  }),
]
