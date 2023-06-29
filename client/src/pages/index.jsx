import { useEffect, useState } from "react"
import { Button, Container } from "react-bootstrap"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { getAllArticles, getAllPublishedArticles } from "../api/api"
import { useAuth } from "../components/auth/auth"
import Card from "../components/card/Card"
import GridContainer from "../components/gridContainer/GridContainer"
import Loading from "../components/loading/Loading"
import { BlockTypes } from "../utils/constants"

export default function Index() {
  const { user } = useAuth()
  const [data, setData] = useState(null)
  const [title, setTitle] = useState("All Published Articles")
  const [isLoading, setIsLoading] = useState(true)
  const navigation = useNavigate()
  const location = useLocation()
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
    setIsLoading(true)
    if (location.pathname === "/all-articles") {
      if (!user) {
        navigation("/login", { replace: true })
        return
      } else {
        setTitle("All Articles")
        getAllArticles().then((data) => {
          setData([...data])
          setIsLoading(false)
        })
      }
    } else
      getAllPublishedArticles().then((data) => {
        setData([...data])
        setIsLoading(false)
      })
  }, [location.pathname, navigation, user])

  if (isLoading) return <Loading />
  if (user && data.length === 0)
    return (
      <Container>
        <h1>No articles found</h1>
        <Link to="/articles/add">
          <Button>Add new article</Button>
        </Link>
      </Container>
    )
  else if (!user && data.length === 0)
    return (
      <Container>
        <h1>No articles found</h1>
      </Container>
    )
  return (
    <Container>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          margin: "1rem 0",
        }}
      >
        <h1>{title}</h1>
      </div>
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
    </Container>
  )
}
