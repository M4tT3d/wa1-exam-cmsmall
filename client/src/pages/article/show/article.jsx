import { IconArrowLeft } from "@tabler/icons-react"
import { Fragment, useEffect, useState } from "react"
import { Container, Image } from "react-bootstrap"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getArticleById } from "../../../api/api"
import Loading from "../../../components/loading/Loading"
import { BlockTypes, images } from "../../../utils/constants"
import { getArticleStatus } from "../../../utils/utils"
import "./index.css"

export default function Article() {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const { id } = useParams()
  const navigation = useNavigate()

  useEffect(() => {
    getArticleById(id).then((data) => {
      if (data.error) {
        setData(null)
        setIsLoading(false)
        navigation("/error", { replace: true, state: { error: data.error } })
        return
      }
      setData(data)
      setIsLoading(false)
    })
  }, [id, navigation])

  const getElement = (item) => {
    switch (item.type) {
      case BlockTypes.PARAGRAPH:
        return <p>{item.data}</p>
      case BlockTypes.IMAGE:
        return (
          <Image
            src={images.filter((image) => image.name === item.data)[0].value}
            fluid
            className="rounded-3 img"
            loading="lazy"
          />
        )
      case BlockTypes.HEADER:
        return <h3>{item.data}</h3>
    }
  }

  if (isLoading) return <Loading />
  return (
    <Container className="px-3 my-2 mx-auto wrapper">
      <Link to={"/"} replace className="text-muted text-decoration-none d-flex align-items-center">
        <IconArrowLeft size={20} />
        Back to home
      </Link>
      <h1 className="fw-bold fs-1 text-capitalize">{data.title}</h1>
      <h2 className="fs-5 text-muted mb-3">{`${data.author} | ${getArticleStatus(
        data.publishedDate
      )}`}</h2>
      <div className="content">
        {data.contentBlocks.map((item, index) => (
          <Fragment key={`block-${index}`}>{getElement(item)}</Fragment>
        ))}
        <p className="text-muted">{`Created on ${new Date(data.createdAt).toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}`}</p>
      </div>
    </Container>
  )
}
