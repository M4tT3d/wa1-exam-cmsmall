import { IconBook } from "@tabler/icons-react"
import { Card as BootstrapCard, Button } from "react-bootstrap"
import Img1 from "../../assets/images/wallpaper_1.webp"
import "./index.css"

export default function Card({ title, author, publishedDate, content }) {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/
  const date = dateRegex.test(publishedDate) ? new Date(publishedDate) : new Date()
  const cardDate = date.toLocaleString("en-US", { month: "short", day: "numeric" })

  return (
    <BootstrapCard className="card-wrapper" border="dark">
      <BootstrapCard.Header className="d-flex justify-content-end">
        <Button variant="dark" size="sm" className="card-btn">
          <IconBook size={20} />
          <p>Read post</p>
        </Button>
      </BootstrapCard.Header>
      <BootstrapCard.Body>
        <BootstrapCard.Title className="card-title" as="h1">
          {title}
        </BootstrapCard.Title>
        <BootstrapCard.Subtitle className="card-subtitle">
          {author} - {cardDate}
        </BootstrapCard.Subtitle>
        <BootstrapCard.Text className="card-text">{content}</BootstrapCard.Text>
      </BootstrapCard.Body>
      <BootstrapCard.Img
        variant="bottom"
        className="rounded-4"
        src={Img1}
        width={318}
        height={191}
      />
    </BootstrapCard>
  )
}
