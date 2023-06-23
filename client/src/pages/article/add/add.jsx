import { Card } from "react-bootstrap"
import ArticleForm from "../../../components/articleForm/ArticleForm"
import "./index.css"

export default function AddArticle() {
  return (
    <div className="wrapper-art-form">
      <Card className="edit-card">
        <ArticleForm />
      </Card>
    </div>
  )
}
