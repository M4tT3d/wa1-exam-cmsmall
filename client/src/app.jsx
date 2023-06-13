import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/layout/Layout"
import Index from "./pages"
import Article from "./pages/article/show/article"
import NotFound from "./pages/error"

function App() {
  return (
    <BrowserRouter>
      <Layout />
      <Routes>
        <Route index element={<Index />} />
        <Route path="/article/:id" element={<Article />}>
          <Route path="edit" element={<h1>Edit</h1>} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
