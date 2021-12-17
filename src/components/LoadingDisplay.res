@react.component
let make = () => {
  open Mui
  open MuiLab
  <Box mx={Box.Value.int(8)} mt={Box.Value.int(4)}>
    {Belt.Array.makeBy(10, i => {
      <Skeleton key={Belt.Int.toString(i)} height={Skeleton.Height.int(35)} />
    })->React.array}
  </Box>
}
