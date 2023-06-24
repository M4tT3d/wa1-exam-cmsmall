import { IconBook } from "@tabler/icons-react"
import { Card as BootstrapCard, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { BlockTypes, images } from "../../utils/constants"
import { getArticleStatus } from "../../utils/utils"
import "./index.css"

export default function Card({ id, title, author, publishedDate, content }) {
  const getElement = (item) => {
    const getImage = (name) => {
      const image = images.filter((image) => image.name === name)[0]
      return image ? image.value : "https://placehold.co/318x191.webp?text=Placeholder"
    }
    switch (item.type) {
      case BlockTypes.HEADER:
      case BlockTypes.PARAGRAPH:
        return <BootstrapCard.Text className="card-text">{item.data}</BootstrapCard.Text>
      case BlockTypes.IMAGE:
        return (
          <BootstrapCard.Img
            src={getImage(item.data)}
            variant="bottom"
            className="rounded-4"
            width={318}
            height={191}
          />
        )
    }
  }

  return (
    <BootstrapCard className="card-wrapper" border="dark">
      <BootstrapCard.Header className="d-flex justify-content-end">
        <Link to={`/articles/${id}`} className="text-reset">
          <Button variant="dark" size="sm" className="card-btn">
            <IconBook size={20} />
            <p>Read post</p>
          </Button>
        </Link>
      </BootstrapCard.Header>
      <BootstrapCard.Body>
        <BootstrapCard.Title className="card-title" as="h1">
          {title}
        </BootstrapCard.Title>
        <BootstrapCard.Subtitle className="card-subtitle">
          {`${author} - ${getArticleStatus(publishedDate)}`}
        </BootstrapCard.Subtitle>
        {getElement(content[1])}
      </BootstrapCard.Body>
      {getElement(content[0])}
    </BootstrapCard>
  )
}
