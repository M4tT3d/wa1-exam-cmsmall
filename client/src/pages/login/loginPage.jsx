import { useEffect, useState } from "react"
import { Button, Card, Form } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { z } from "zod"
import { useAuth } from "../../components/auth/auth"
import "./index.css"

const schema = z.object({
  username: z.string().email(),
  password: z.string().min(1),
})

export default function LoginPage() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  // form management
  const [validated, setValidated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({
    email: { message: "" },
    password: { message: "" },
  })
  // form data
  const [email, setEmail] = useState("")
  const [password, setPassowrd] = useState("")

  useEffect(() => {
    if (user) navigate("/", { replace: true })
  }, [user, navigate])

  const handleSubmit = async (event) => {
    setLoading(true)
    event.preventDefault()
    setErrors({
      email: { message: "" },
      password: { message: "" },
    })
    const formData = {
      username: email,
      password: password,
    }
    const validationResult = schema.safeParse(formData)
    if (!validationResult.success) {
      validationResult.error.issues.forEach((issue) => {
        switch (issue.path[0]) {
          case "username":
            setErrors((prev) => ({ ...prev, email: { message: issue.message } }))
            break
          case "password":
            setErrors((prev) => ({ ...prev, password: { message: issue.message } }))
            break
          default:
            break
        }
      })
      setLoading(false)
      return
    }
    const data = await login(validationResult.data)
    if (data?.error) {
      setErrors((prev) => ({ ...prev, other: { message: data.error } }))
    } else {
      setValidated(validationResult.success)
      navigate("/", { replace: true })
    }
    setLoading(false)
  }

  return (
    <div className="wrapper-login-form">
      <Card className="login-card">
        <Form noValidate validated={validated} className="mb-0" onSubmit={handleSubmit}>
          <div className="login-form-row">
            <h1 className="mb-4">Welcome back!</h1>
            {errors?.other?.message && <p className="login-form-error">{errors.other.message}</p>}
            <Form.Group className="mb-3 login-form-group">
              <Form.Label className="fw-bold">Email</Form.Label>
              <Form.Control
                type="email"
                required
                value={email}
                disabled={loading}
                onChange={(event) => setEmail(event.target.value)}
                isInvalid={errors.email.message !== ""}
              />
              <Form.Control.Feedback type="invalid">{errors.email.message}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3 login-form-group">
              <Form.Label className="fw-bold">Password</Form.Label>
              <Form.Control
                type="password"
                required
                value={password}
                minLength={1}
                disabled={loading}
                onChange={(event) => setPassowrd(event.target.value)}
                isInvalid={errors.password.message !== ""}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password.message}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <div className="login-form-actions">
            <Button variant="primary" type="submit" disabled={loading}>
              Sign In
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
