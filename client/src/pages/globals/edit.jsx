import { useEffect, useState } from "react"
import { Button, Card, Form } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { z } from "zod"
import { useAuth } from "../../components/auth/auth"
import { roles } from "../../utils/constants"
import "./index.css"

const schema = z.object({
  title: z.string().trim().min(1),
})

export default function EditCMSGlobals() {
  const { user, settings, setGlobals } = useAuth()
  const navigate = useNavigate()
  // form management
  const [validated, setValidated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({
    title: { message: "" },
  })
  // form data
  const [title, setTitle] = useState(settings.title ?? "")

  useEffect(() => {
    if (!user || user.role !== roles.ADMIN) navigate("/", { replace: true })
  }, [user, navigate, settings])

  const handleSubmit = async (event) => {
    setLoading(true)
    event.preventDefault()
    setErrors({
      title: { message: "" },
    })
    const formData = {
      title: title,
    }
    const validationResult = schema.safeParse(formData)
    if (!validationResult.success) {
      validationResult.error.issues.forEach((issue) => {
        switch (issue.path[0]) {
          case "title":
            setErrors((prev) => ({ ...prev, title: { message: issue.message } }))
            break
          default:
            break
        }
      })
      setLoading(false)
      return
    }
    const data = await setGlobals("title", validationResult.data.title)
    if (data?.error) {
      setErrors((prev) => ({ ...prev, other: { message: data.error } }))
    } else {
      setValidated(validationResult.success)
      navigate("/", { replace: true })
    }
    setLoading(false)
  }

  return (
    <div className="wrapper-globals-form">
      <Card className="globals-card">
        <Form noValidate validated={validated} className="mb-0" onSubmit={handleSubmit}>
          <div className="globals-form-row">
            <h1 className="mb-4">Globals Settings</h1>
            {errors?.other?.message && <p className="globals-form-error">{errors.other.message}</p>}
            <Form.Group className="mb-3 globals-form-group">
              <Form.Label className="fw-bold">Cms Title</Form.Label>
              <Form.Control
                type="text"
                required
                value={title}
                disabled={loading}
                onChange={(event) => setTitle(event.target.value)}
                isInvalid={errors.title.message !== ""}
              />
              <Form.Control.Feedback type="invalid">{errors.title.message}</Form.Control.Feedback>
            </Form.Group>
          </div>
          <div className="globals-form-actions">
            <Button variant="primary" type="submit" disabled={loading}>
              Save Changes
            </Button>
            <Button variant="danger" disabled={loading}>
              <Link to="/" className="text-decoration-none text-white">
                Back to Home
              </Link>
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  )
}
