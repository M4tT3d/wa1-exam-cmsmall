import { IconBook } from "@tabler/icons-react"
import { Card as BootstrapCard, Button, Image } from "react-bootstrap"
import { Link } from "react-router-dom"
import Img1 from "../../assets/images/wallpaper_1.webp"
import { BlockTypes } from "../../utils/constants"
import "./index.css"

export default function Card({ id, title, author, publishedDate, content }) {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/
  const date = dateRegex.test(publishedDate) ? new Date(publishedDate) : new Date()
  const cardDate = date.toLocaleString("en-US", { month: "short", day: "numeric" })
  const isImage = content.type === BlockTypes.IMAGE
  const isText = content.type === BlockTypes.PARAGRAPH || content.type === BlockTypes.HEADER

  const getElement = (item) => {
    switch (item.type) {
      case BlockTypes.PARAGRAPH:
        return <BootstrapCard.Text className="card-text">{item.data}</BootstrapCard.Text>
      case BlockTypes.IMAGE:
        return <Image src={item.data} fluid className="rounded-3 img" />
      case BlockTypes.HEADER:
        return <h3>{item.data}</h3>
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
        {isText && getElement(content)}
      </BootstrapCard.Body>
      {isImage && (
        <BootstrapCard.Img
          variant="bottom"
          className="rounded-4"
          src={Img1}
          width={318}
          height={191}
        />
      )}
    </BootstrapCard>
  )
}
