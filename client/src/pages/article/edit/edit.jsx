import { useEffect, useState } from "react"
import { Card } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import { getArticleById } from "../../../api/api"
import ArticleForm from "../../../components/articleForm/ArticleForm"
import Loading from "../../../components/loading/Loading"
import "./index.css"

export default function EditArticle() {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const { id } = useParams()
  const navigation = useNavigate()

  useEffect(() => {
    getArticleById(id).then((data) => {
      if (data.error) {
        setData(null)
        setIsLoading(false)
        navigation("/error", { replace: true, state: { error: data.error } })
        return
      }
      setData(data)
      setIsLoading(false)
    })
  }, [id, navigation])

  if (isLoading) return <Loading />
  return (
    <div className="wrapper-art-form">
      <Card className="edit-card">
        <ArticleForm article={data} />
      </Card>
    </div>
  )
}
