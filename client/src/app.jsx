import { Container } from "react-bootstrap"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./components/navbar/Navbar"
import Index from "./pages"
import AddArticle from "./pages/article/add/add"
import EditArticle from "./pages/article/edit/edit"
import Article from "./pages/article/show/article"
import NotFound from "./pages/error"
import "./styles/global.css"

function App() {
  return (
    <BrowserRouter>
      <Container fluid="xxxl" className="root-container">
        <Navbar />
        <Routes>
          <Route index element={<Index />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="/article/:id/edit" element={<EditArticle />} />
          <Route path="/article/add" element={<AddArticle />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App
