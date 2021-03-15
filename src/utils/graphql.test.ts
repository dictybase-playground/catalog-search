import { getQueryFilterString, normalizeDataObject } from "./graphql"

describe("getQueryFilterString function", () => {
  it("should remove strain_type", () => {
    expect(getQueryFilterString(["strain_type: all"])).toEqual("")
  })
  it("should remove in_stock", () => {
    expect(getQueryFilterString(["in_stock: true"])).toEqual("")
  })
  it("should remove both strain_type and in_stock", () => {
    expect(
      getQueryFilterString(["in_stock: true", "strain_type: all"]),
    ).toEqual("")
  })
  it("should include AND operator", () => {
    expect(
      getQueryFilterString(["strain_type: all", "label: sad", "summary: test"]),
    ).toEqual("label~=sad;summary~=test")
  })
})

describe("normalizeDataObject function", () => {
  it("should return listStrains", () => {
    const strainObj = {
      listStrains: "abc",
    }
    expect(normalizeDataObject(strainObj)).toEqual("abc")
  })
  it("should return listRegularStrains", () => {
    const strainObj = {
      listRegularStrains: "reg",
    }
    expect(normalizeDataObject(strainObj)).toEqual("reg")
  })
  it("should return listGWDIStrains", () => {
    const strainObj = {
      listGWDIStrains: "gwdi",
    }
    expect(normalizeDataObject(strainObj)).toEqual("gwdi")
  })
  it("should return listStrainsInventory", () => {
    const strainObj = {
      listStrainsInventory: "inv",
    }
    expect(normalizeDataObject(strainObj)).toEqual("inv")
  })
  it("should return listBacterialStrains", () => {
    const strainObj = {
      listBacterialStrains: "bac",
    }
    expect(normalizeDataObject(strainObj)).toEqual("bac")
  })
  it("should return same data for unexpected object", () => {
    const strainObj = {
      foo: "bar",
    }
    expect(normalizeDataObject(strainObj)).toStrictEqual(strainObj)
  })
})
