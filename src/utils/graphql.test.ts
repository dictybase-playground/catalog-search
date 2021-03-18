import { getQueryVariables } from "./graphql"

describe("getQueryVariables function", () => {
  it("should convert all filters to object", () => {
    const queryVars = {
      cursor: 0,
      limit: 10,
      filter: {
        strain_type: "REGULAR",
      },
    }
    const filters = [
      "Stock Type: Regular",
      "Currently Available",
      "Descriptor: abc",
      "ID: DBS123",
      "Summary: test",
    ]
    const newVars = {
      ...queryVars,
      filter: {
        strain_type: "REGULAR",
        in_stock: true,
        label: "abc",
        id: "DBS123",
        summary: "test",
      },
    }
    expect(getQueryVariables(filters, queryVars)).toStrictEqual(newVars)
  })
})
