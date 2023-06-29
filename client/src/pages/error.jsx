import { Button, Container } from "react-bootstrap"
import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <Container className="d-flex flex-column">
      <h2>This is not the route you are looking for!</h2>
      <Link to="/">
        <Button variant="primary">Go Home!</Button>
      </Link>
    </Container>
  )
}
