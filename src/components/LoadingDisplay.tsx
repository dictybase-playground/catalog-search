import { Skeleton } from "@material-ui/lab";
import { Box } from "@material-ui/core";

export default function LoadingDisplay(): JSX.Element {
  return (
    <Box mx={8} mt={4}>
      {[...Array(10)].map((_, i: number) => {
        return <Skeleton key={i} height={35} />
      })}
    </Box>
  )
}
