import { Fragment, useEffect, useState } from "react"
import { Container, Image } from "react-bootstrap"
import { useParams } from "react-router-dom"
import Loading from "../../../components/loading/Loading"
import { getPostById } from "../../../utils/api"
import { BlockTypes } from "../../../utils/constants"
import "./index.css"

export default function Article() {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    getPostById(id).then((data) => {
      setData(data)
      setIsLoading(false)
    })
  }, [id])

  const getElement = (item) => {
    switch (item.type) {
      case BlockTypes.PARAGRAPH:
        return <p>{item.data}</p>
      case BlockTypes.IMAGE:
        return <Image src={item.data} fluid className="rounded-3 img" />
      case BlockTypes.HEADER:
        return <h3>{item.data}</h3>
    }
  }

  if (isLoading) return <Loading />
  return (
    <Container className="px-3 my-2 mx-auto wrapper">
      <h1 className="fw-bold fs-1 text-capitalize">{data.title}</h1>
      <h2 className="fs-5 text-muted mb-3">{`${data.author} | ${data.publishedDate}`}</h2>
      <div className="content">
        {data.contentBlocks.map((item, index) => (
          <Fragment key={`block-${index}`}>{getElement(item)}</Fragment>
        ))}
      </div>
    </Container>
  )
}
