import { graphql } from "msw"
import {
  mockRegularStrains,
  mockBacterialStrains,
  mockRegularAvailableStrains,
  mockGWDIStrains,
} from "./mockStrains"

export const handlers = [
  graphql.query("StrainList", (req, res, ctx) => {
    const { strain_type } = req.variables.filter
    switch (strain_type) {
      case "ALL":
        return res(
          ctx.data({
            listStrains: mockRegularStrains.listStrains,
          }),
        )
      case "GWDI":
        const { label } = req.variables.filter

        if (label !== "") {
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
