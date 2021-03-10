import React from "react"
import Box from "@material-ui/core/Box"
import { ListStrainsData } from "./types/strain"

type Props = {
  data: ListStrainsData
}

const CatalogList = ({ data }: Props) => {
  return (
    <Box textAlign="center">
      {data.strains.map((item, index) => (
        <div key={index}>
          {item.id} - {item.label}
        </div>
      ))}
    </Box>
  )
}

export default CatalogList
