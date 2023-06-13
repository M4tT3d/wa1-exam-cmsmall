import { IconHome2, IconLogin } from "@tabler/icons-react"
import { Navbar as BootstrapNavbar, Container, Nav } from "react-bootstrap"
import "./index.css"

export default function Layout() {
  return <Navbar />
}

function Navbar() {
  const links = [
    { title: "Home", icon: IconHome2 },
    { title: "Login", icon: IconLogin },
  ]
  return (
    <BootstrapNavbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
      <Container>
        <BootstrapNavbar.Brand>CMSmall</BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="responsive-navbar-nav" />
        <BootstrapNavbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            {links.map((link, index) => (
              <Nav.Link key={index} href={`/${link.title.toLowerCase()}`} className="link">
                {<link.icon size={20} />}
                <p>{link.title}</p>
              </Nav.Link>
            ))}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  )
}
