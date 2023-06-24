import { useEffect } from "react"
import { Card } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import ArticleForm from "../../../components/articleForm/ArticleForm"
import { useAuth } from "../../../components/auth/auth"
import "./index.css"

export default function AddArticle() {
  const { user } = useAuth()
  const navigation = useNavigate()

  useEffect(() => {
    if (!user) {
      navigation("/login", { replace: true })
      return
    }
  }, [user, navigation])

  return (
    <div className="wrapper-art-form">
      <Card className="edit-card">
        <ArticleForm />
      </Card>
    </div>
  )
}
