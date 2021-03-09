import React from "react"
import Box from "@material-ui/core/Box"
import { ListStrains } from "./types/strain"

type Props = {
  data: {
    listStrains: ListStrains
  }
}

const CatalogList = ({ data }: Props) => {
  return (
    <Box textAlign="center">
      {data.listStrains.strains.map((item, index) => (
        <div key={index}>
          {item.id} - {item.label}
        </div>
      ))}
    </Box>
  )
}

export default CatalogList
