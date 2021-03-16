import React from "react"
import Chip from "@material-ui/core/Chip"
import { AutocompleteGetTagProps } from "@material-ui/lab/Autocomplete"

type Props = {
  /** List of currently active filters in searchbox */
  activeFilters: string[]
  /** List of options displayed in autocomplete dropdown */
  autocompleteOptions: string[]
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
  autocompleteOptions,
  getTagProps,
  currentOption,
  currentIndex,
}: Props) => {
  const lastFilter = activeFilters[activeFilters.length - 1]
  const lastFilterIsInOptionsList =
    lastFilter === currentOption && autocompleteOptions.includes(currentOption)

  if (lastFilter !== "Currently Available" && lastFilterIsInOptionsList) {
    return <span>{currentOption}:</span>
  }

  return (
    <Chip
      variant="outlined"
      color="default"
      label={currentOption}
      data-testid={`${currentOption}-tag`}
      {...getTagProps({ index: currentIndex })}
    />
  )
}

export default TagsDisplay
