import React from "react"
import Chip from "@material-ui/core/Chip"
import { AutocompleteGetTagProps } from "@material-ui/lab/Autocomplete"
import { autocompleteOptions } from "./constants/autocompleteOptions"

type Props = {
  /** List of currently active filters in searchbox */
  activeFilters: string[]
  /** MUI Getter for tag props */
  getTagProps: AutocompleteGetTagProps
  /** Current tag to display */
  currentOption: string
  /** Current index of tag to display */
  currentIndex: number
}

/**
 * TagsDisplay handles how an individual filter will appear as a tag inside the
 * searchbox.
 */

const TagsDisplay = ({
  activeFilters,
  getTagProps,
  currentOption,
  currentIndex,
}: Props) => {
  const lastFilter = activeFilters[activeFilters.length - 1]
  const lastFilterIsInOptionsList =
    lastFilter === currentOption && autocompleteOptions.includes(currentOption)

  // we only want to display plain text if the last filter is not "Currently Available"
  // and is also inside the list of autocomplete options (i.e. Descriptor)
  if (lastFilter !== "Currently Available" && lastFilterIsInOptionsList) {
    return <span>{currentOption}:</span>
  }

  return (
    <Chip
      variant="outlined"
      color="default"
      label={currentOption}
      data-testid={currentOption}
      {...getTagProps({ index: currentIndex })}
    />
  )
}

export default TagsDisplay
