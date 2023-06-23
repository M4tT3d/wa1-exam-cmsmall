import { IconFilePlus, IconHome2, IconList, IconLogin, IconLogout } from "@tabler/icons-react"
import { useState } from "react"
import { Navbar as BootstrapNavbar, Container, Nav } from "react-bootstrap"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../auth/auth"
import "./index.css"

export default function Navbar() {
  const { settings, user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [isExpanded, setIsExpanded] = useState(false)

  const links = [
    { title: "Login", icon: IconLogin, path: "/login" },
    { title: "Home", icon: IconHome2, path: "/" },
  ]
  const loggedInLinks = [
    { title: "Home", icon: IconHome2, path: "/" },
    { title: "My articles", icon: IconList, path: "/my-articles" },
    { title: "Add Article", icon: IconFilePlus, path: "/article/add" },
  ]
  const linksToUse = user ? loggedInLinks : links
  return (
    <BootstrapNavbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      sticky="top"
      expanded={isExpanded}
    >
      <Container>
        <BootstrapNavbar.Brand>{settings.title}</BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => setIsExpanded((prev) => !prev)}
        />
        <BootstrapNavbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            {linksToUse.map((link, index) => (
              <Nav.Link key={index} as="div">
                <Link
                  to={link.path}
                  className="link-content text-decoration-none"
                  onClick={() => setIsExpanded(false)}
                >
                  {<link.icon size={20} />}
                  <p>{link.title}</p>
                </Link>
              </Nav.Link>
            ))}
            {user && (
              <Nav.Link
                className="link-content text-decoration-none"
                as="button"
                onClick={() => {
                  setIsExpanded(false)
                  logout().then(() => {
                    if (location.pathname !== "/") navigate("/")
                  })
                }}
              >
                <IconLogout size={20} />
                <p>Logout</p>
              </Nav.Link>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  )
}
