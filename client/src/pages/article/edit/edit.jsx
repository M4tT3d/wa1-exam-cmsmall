import { useEffect, useState } from "react"
import { Card } from "react-bootstrap"
import { useParams } from "react-router-dom"
import ArticleForm from "../../../components/articleForm/ArticleForm"
import Loading from "../../../components/loading/Loading"
import { getPostById } from "../../../api/api"
import "./index.css"

export default function EditArticle() {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    getPostById(id).then((data) => {
      setData(data)
      setIsLoading(false)
    })
  }, [id])

  if (isLoading) return <Loading />
  return (
    <div className="wrapper-art-form">
      <Card className="edit-card">
        <ArticleForm article={data} />
      </Card>
    </div>
  )
}
