import { useEffect, useState } from "react"
import Card from "../components/card/Card"
import GridContainer from "../components/gridContainer/GridContainer"
import Loading from "../components/loading/Loading"
import { getAllPost } from "../utils/api"

export default function Index() {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getAllPost().then((data) => {
      setData([...data])
      setIsLoading(false)
    })
  }, [])

  if (isLoading) return <Loading />
  return (
    <GridContainer cols={data.length} maxCols={3}>
      {data.map((item) => (
        <Card
          key={item.id}
          title={item.title}
          author={item.author}
          publishedDate={item.publishedDate}
          content={item.contentBlocks[0]}
        />
      ))}
    </GridContainer>
  )
}
