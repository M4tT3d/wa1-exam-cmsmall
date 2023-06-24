import { useEffect, useState } from "react"
import { getAllPublishedArticles } from "../api/api"
import Card from "../components/card/Card"
import GridContainer from "../components/gridContainer/GridContainer"
import Loading from "../components/loading/Loading"
import { BlockTypes } from "../utils/constants"

export default function Index() {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const getCardContents = (item) => {
    const content = []
    if (!item.contentBlocks.some((block) => block.type === BlockTypes.IMAGE))
      content.push({ type: BlockTypes.IMAGE, data: "" })
    else content.push(item.contentBlocks.filter((block) => block.type === BlockTypes.IMAGE)[0])
    if (item.contentBlocks.filter((block) => block.type === BlockTypes.PARAGRAPH).length !== 0)
      content.push(item.contentBlocks.filter((block) => block.type === BlockTypes.PARAGRAPH)[0])
    else content.push(item.contentBlocks.filter((block) => block.type === BlockTypes.HEADER)[0])
    return content
  }

  useEffect(() => {
    getAllPublishedArticles().then((data) => {
      setData([...data])
      setIsLoading(false)
    })
  }, [])

  if (isLoading) return <Loading />
  return (
    <GridContainer cols={data.length} maxCols={3}>
      {data.map((item) => (
        <Card
          key={item.articleId}
          id={item.articleId}
          title={item.title}
          author={item.author}
          publishedDate={item.publishedDate}
          content={getCardContents(item)}
        />
      ))}
    </GridContainer>
  )
}
