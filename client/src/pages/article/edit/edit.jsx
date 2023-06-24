import { useEffect, useState } from "react"
import { Card } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import { getAllUsers, getArticleById } from "../../../api/api"
import ArticleForm from "../../../components/articleForm/ArticleForm"
import { useAuth } from "../../../components/auth/auth"
import Loading from "../../../components/loading/Loading"
import { roles } from "../../../utils/constants"
import "./index.css"

export default function EditArticle() {
  const [data, setData] = useState(null)
  const [users, setUsers] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const { id } = useParams()
  const navigation = useNavigate()
  const { user } = useAuth()
  const isAdmin = user && user.role === roles.ADMIN

  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
      if (user.role === roles.ADMIN) {
        const users = await getAllUsers()
        setUsers(users)
      } else setUsers([{ userId: user.id, name: user.name, surname: user.surname }])
      const article = await getArticleById(id)
      setData(article)
      setIsLoading(false)
    }
    if (!user) {
      navigation("/login", { replace: true })
      return
    }
    fetchData()
  }, [id, navigation, user])

  if (isLoading) return <Loading />
  return (
    <div className="wrapper-art-form">
      <Card className="edit-card">
        <ArticleForm article={data} users={users} isUser={!isAdmin} />
      </Card>
    </div>
  )
}
