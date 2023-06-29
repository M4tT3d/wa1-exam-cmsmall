import { IconEdit, IconTrash } from "@tabler/icons-react"
import { Fragment, useEffect, useState } from "react"
import { Button, Container, Image, Modal } from "react-bootstrap"
import { Link, useNavigate, useParams } from "react-router-dom"
import { deleteArticle, getArticleById } from "../../../api/api"
import { useAuth } from "../../../components/auth/auth"
import Loading from "../../../components/loading/Loading"
import { BlockTypes, images, roles } from "../../../utils/constants"
import { getArticleStatus } from "../../../utils/utils"
import "./index.css"

export default function Article() {
  const { user } = useAuth()
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [show, setShow] = useState(false)
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
      {user && (user.id === data.userId || user.role === roles.ADMIN) && (
        <div className="edit-article-wrapper">
          <Link to={`/articles/${id}/edit`} className="text-decoration-none text-white">
            <Button size="sm" className="edit-article-button">
              <IconEdit size={20} />
              Edit article
            </Button>
          </Link>
          <Button
            size="sm"
            variant="danger"
            onClick={() => setShow(true)}
            className="edit-article-button"
          >
            <IconTrash size={20} />
            Delete Article
          </Button>
        </div>
      )}
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
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {"Do you really want to delete this article? This operation can't be cancelled!"}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() =>
              deleteArticle(id).then(() => {
                setShow(false)
                navigation("/all-articles", { replace: true })
              })
            }
          >
            {"I'm sure"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}
