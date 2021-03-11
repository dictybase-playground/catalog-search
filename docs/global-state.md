# Global State

Items in the global state (context):

1. `presetFilter` - a string that holds the value of the selected preset filter
   in the left dropdown menu.
2. `activeFilters` - an array of strings that represents the list of active
   filters (displayed as tags) in the search box. This value is synchronized with
   the `value` of the `Autocomplete` component (also a list of strings).
3. `queryVariables` - an object containing the variables used for the corresponding
   GraphQL query.

When a filter is selected from the dropdown, three things need to happen:

1. It needs to update the `presetFilter` state with the current selection.

2. It needs to set the `activeFilters` state to only the preset filter. This
   is because we do not want to add a preset filter to the end of an existing set
   of filters/tags. A preset filter should override any existing filters.
3. It needs to update the variables passed to the GraphQL query. This is because
   the `listStrainsInventory` query has an additional `strain_type` field that
   other queries do not have.

When the searchbox is updated either by adding a new tag or removing an existing
tag, the `activeFilters` state needs to be updated accordingly. This is done via a
`handleChange` method that sets the `activeFilters` state to the updated
Autocomplete `value`.
