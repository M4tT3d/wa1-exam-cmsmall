import { useEffect, useState } from "react"
import { Card } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { getAllUsers } from "../../../api/api"
import ArticleForm from "../../../components/articleForm/ArticleForm"
import { useAuth } from "../../../components/auth/auth"
import Loading from "../../../components/loading/Loading"
import { roles } from "../../../utils/constants"
import "./index.css"

export default function AddArticle() {
  const { user } = useAuth()
  const navigation = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [users, setUsers] = useState(null)
  const isAdmin = user && user.role === roles.ADMIN

  useEffect(() => {
    const fetchData = async () => {
      if (user.role === roles.ADMIN) {
        const users = await getAllUsers()
        setUsers(users)
      } else setUsers([{ userId: user.id, name: user.name, surname: user.surname }])
      setIsLoading(false)
    }
    if (!user) {
      navigation("/login", { replace: true })
      return
    }
    fetchData()
  }, [user, navigation])

  if (isLoading) return <Loading />
  return (
    <div className="wrapper-art-form">
      <Card className="edit-card">
        <ArticleForm users={users} isUser={!isAdmin} authorId={user.id} />
      </Card>
    </div>
  )
}
