import { handleTagDisplay } from "./SearchBox"

describe("handleTagDisplay function", () => {
  it("should combine keys and values with colon", () => {
    const tags = ["Descriptor", "sad"]
    const mockFn = jest.fn()
    handleTagDisplay(tags, mockFn)
    expect(mockFn).toHaveBeenCalledWith(["Descriptor: sad"])
  })

  it("should not modify last value", () => {
    const tags = ["strain_type: GWDI", "Descriptor"]
    const mockFn = jest.fn()
    handleTagDisplay(tags, mockFn)
    expect(mockFn).toHaveBeenCalledWith(tags)
  })
})
