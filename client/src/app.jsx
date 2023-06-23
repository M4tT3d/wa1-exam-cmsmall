import { Container } from "react-bootstrap"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AuthProvider } from "./components/auth/auth"
import Navbar from "./components/navbar/Navbar"
import Index from "./pages"
import AddArticle from "./pages/article/add/add"
import EditArticle from "./pages/article/edit/edit"
import Article from "./pages/article/show/article"
import NotFound from "./pages/error"
import LoginPage from "./pages/login/loginPage"
import "./styles/global.css"

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Container fluid="xxxl" className="root-container">
          <Navbar />
          <Routes>
            <Route index element={<Index />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/article/:id" element={<Article />} />
            <Route path="/article/:id/edit" element={<EditArticle />} />
            <Route path="/article/add" element={<AddArticle />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
