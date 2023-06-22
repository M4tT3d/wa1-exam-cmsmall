import { useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import "./index.css"

export default function GridContainer({ cols, maxCols, children }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [maxTabCols, setMaxTabCols] = useState(maxCols / 2)
  const [maxRows, setMaxRows] = useState(cols)

  // Update the windowWidth state when the window is resized
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    if (windowWidth < 768) {
      setMaxTabCols(1)
      setMaxRows(Math.ceil(cols / maxTabCols))
    } else if (windowWidth >= 768 && windowWidth < 1200) {
      setMaxTabCols(2)
      setMaxRows(Math.ceil(cols / maxTabCols))
    } else if (windowWidth >= 1200) {
      setMaxTabCols(3)
      setMaxRows(Math.ceil(cols / maxTabCols))
    } else {
      setMaxTabCols(maxCols)
      setMaxRows(Math.ceil(cols / maxTabCols))
    }
    return () => window.removeEventListener("resize", handleResize)
  }, [windowWidth, maxCols, cols, maxTabCols])

  const generateRows = () => {
    const rows = []
    for (let i = 0; i < maxRows; i++) {
      rows.push(
        <Row key={`row-${i}`} className="justify-content-center grid-row" as="article">
          {children.slice(i * maxTabCols, (i + 1) * maxTabCols).map((item, i) => (
            <Col key={`row-${i}-col-${i}`} xs="auto" md={6} lg="auto" xl={3} as="section">
              {item}
            </Col>
          ))}
        </Row>
      )
    }
    return rows
  }

  return <Container className="grid-wrapper">{generateRows()}</Container>
}
