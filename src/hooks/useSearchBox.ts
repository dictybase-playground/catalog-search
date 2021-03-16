import { useCatalogStore } from "../CatalogContext"
import { autocompleteOptions } from "../constants/autocompleteOptions"

const handleTagDisplay = (
  tags: string[],
  setActiveFilters: (arg0: string[]) => void,
) => {
  const lastIndex = tags.length - 1
  const secondToLastIndex = tags.length - 2
  const lastTag = tags[lastIndex]
  const secondToLastTag = tags[secondToLastIndex]

  const lastTagIsKeyVal = lastTag && lastTag.includes(":")
  const lastTagIsKey = autocompleteOptions.includes(lastTag)

  // If the last value is from the list of options then that means the user
  // has not entered a search value yet. No further action is necessary.
  //
  // If the last tag is from the list of options (i.e. Descriptor, ID, etc.) or
  // it is a combined key:val (i.e. in_stock:true) then the active filters state
  // is updated as normal.
  // Else, the last tag is just a value and needs to be appended to the previous
  // key (therefore creating one tag instead of two).
  if (lastTagIsKey || lastTagIsKeyVal) {
    setActiveFilters(tags)
  } else {
    const newTag = `${secondToLastTag}: ${lastTag}`
    const updatedTags = [...tags.slice(0, secondToLastIndex), newTag]
    setActiveFilters(updatedTags)
  }
}

/**
 * useSearchBox contains the logic used for handling any changes inside the
 * autocomplete searchbox. handleChange is used to update the global state with
 * necessary changes.
 */

const useSearchBox = () => {
  const { setPresetFilter, setActiveFilters } = useCatalogStore()

  const handleChange = (event: React.ChangeEvent<{}>, value: string[]) => {
    handleTagDisplay(value, setActiveFilters)
    // go back to default filter if no tags listed
    if (value.length === 0) {
      setPresetFilter("Filters")
      setActiveFilters(value)
    }
  }

  return {
    handleChange,
  }
}

export { handleTagDisplay }
export default useSearchBox
