import { Container, Spinner } from "react-bootstrap"
import "./index.css"

export default function Loading() {
  return (
    <Container className="loader-wrapper">
      <Spinner />
    </Container>
  )
}
