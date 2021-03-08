import React from "react"
import Box from "@material-ui/core/Box"

type ListStrains = {
  listStrains: {
    nextCursor: number
    totalCount: number
    strains: Array<{
      id: string
      label: string
      summary: string
      in_stock: boolean
    }>
  }
}

type Props = {
  data: ListStrains
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
