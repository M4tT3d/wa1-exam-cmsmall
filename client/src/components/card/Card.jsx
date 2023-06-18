import { IconBook } from "@tabler/icons-react"
import { Card as BootstrapCard, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { BlockTypes, images } from "../../utils/constants"
import "./index.css"

export default function Card({ id, title, author, publishedDate, content }) {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/
  const date = dateRegex.test(publishedDate) ? new Date(publishedDate) : new Date()
  const cardDate = date.toLocaleString("en-US", { month: "short", day: "numeric" })

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
            fluid
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
        <Link to={`/article/${id}`} className="text-reset">
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
          {author} - {cardDate}
        </BootstrapCard.Subtitle>
        {getElement(content[1])}
      </BootstrapCard.Body>
      {getElement(content[0])}
    </BootstrapCard>
  )
}
