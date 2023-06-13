import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/layout/Layout"
import Index from "./pages"
import Article from "./pages/articles/articles"

function App() {
  return (
    <BrowserRouter>
      <Layout />
      <Routes>
        <Route index element={<Index />} />
        <Route path="/article/:id" element={<Article />}>
          <Route path="edit" element={<h1>Edit</h1>} />
        </Route>
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
