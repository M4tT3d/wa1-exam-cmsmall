import { IconArrowNarrowUp } from "@tabler/icons-react"
import it from "date-fns/locale/it"
import { useState } from "react"
import { Button, Col, Form, Image, Row } from "react-bootstrap"
import DatePicker, { registerLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { z } from "zod"
import { BlockTypes, images } from "../../utils/constants"
import "./index.css"
registerLocale("it", it)

const customErrorMessage = ["At least two blocks are required", "At least one header is required"]

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  author: z.string().min(1, { message: "Author is required" }),
  creationDate: z.date(),
  publishedDate: z.date().optional().nullable(),
  contentBlocks: z
    .array(
      z.object({
        type: z.nativeEnum(BlockTypes),
        value: z.string().min(1, { message: "Value is required" }),
      })
    )
    .min(2, { message: customErrorMessage[0] })
    .refine(
      (value) => {
        const hasHeader = value.some((item) => item.type === BlockTypes.HEADER)
        return hasHeader
      },
      { message: customErrorMessage[1], custom: true }
    ),
})

export default function ArticleForm({ article }) {
  //form management
  const [validated, setValidated] = useState(false)
  const [errors, setErrors] = useState({
    title: { message: "" },
    author: { message: "" },
    publishedDate: { message: "" },
    blocks: [{ message: "" }],
  })
  const showCustomFeedback = errors.blocks.some(
    (item) => item.message === customErrorMessage[0] || item.message === customErrorMessage[1]
  )
  const [loading, setLoading] = useState(false)

  //article management
  const [title, setTitle] = useState(article ? article.title : "")
  const [author, setAuthor] = useState(article ? article.author : "")
  const [publishedDate, setPublishedDate] = useState(
    article && article.publishedDate ? new Date(article.publishedDate) : null
  )
  const [creationDate, setCreationDate] = useState(
    article && article.creationDate ? article.creationDate : new Date()
  )
  const [fields, setFields] = useState([{ type: BlockTypes.HEADER, value: "" }])

  // useNavigate hook is necessary to change page
  const navigate = useNavigate()
  const location = useLocation()

  // if the film is saved (eventually modified) we return to the list of all films,
  // otherwise, if cancel is pressed, we go back to the previous location (given by the location state)
  const nextpage = location.state?.nextpage || "/"

  const handleChangeValue = (index, event) => {
    const newFields = [...fields]
    newFields[index].value = event.target.value
    setFields(newFields)
  }

  const swapFields = (index1, index2) => {
    const newFields = [...fields]
    const temp = newFields[index1]
    newFields[index1] = newFields[index2]
    newFields[index2] = temp
    setFields(newFields)
  }

  const renderInputField = (index) => {
    const field = fields[index]
    switch (field.type) {
      case BlockTypes.PARAGRAPH:
        return (
          <>
            <Form.Control
              as="textarea"
              rows={4}
              value={field.value}
              onChange={(event) => handleChangeValue(index, event)}
              isInvalid={errors.blocks[index].message !== ""}
              disabled={loading}
            />
            {!showCustomFeedback && (
              <Form.Control.Feedback type="invalid">
                {errors.blocks[index].message}
              </Form.Control.Feedback>
            )}
          </>
        )
      case BlockTypes.HEADER:
        return (
          <>
            <Form.Control
              type="text"
              value={field.value}
              onChange={(event) => handleChangeValue(index, event)}
              isInvalid={errors.blocks[index].message !== ""}
              disabled={loading}
            />
            {!showCustomFeedback && (
              <Form.Control.Feedback type="invalid">
                {errors.blocks[index].message}
              </Form.Control.Feedback>
            )}
          </>
        )
      case BlockTypes.IMAGE:
        return (
          <div className="image-option">
            {images.map((image, i) => (
              <Form.Check
                key={image.name}
                type="radio"
                id={`imageRadio-${i}`}
                label={
                  <Image src={image.value} thumbnail style={{ width: "200px", height: "110px" }} />
                }
                checked={field.value === image.name}
                onChange={() =>
                  setFields((prev) => {
                    const newFields = [...prev]
                    newFields[index].value = image.name
                    return newFields
                  })
                }
                disabled={loading}
                className="image-preview"
                isInvalid={errors.blocks[index].message !== ""}
              />
            ))}
            {!showCustomFeedback && (
              <Form.Control.Feedback type="invalid">
                {errors.blocks[index].message}
              </Form.Control.Feedback>
            )}
          </div>
        )
      default:
        return null
    }
  }

  const handleAddField = () => {
    setFields((prev) => [...prev, { type: BlockTypes.PARAGRAPH, value: "" }])
    setErrors((prev) => ({ ...prev, blocks: [...prev.blocks, { message: "" }] }))
  }

  const handleRemoveField = (index) => {
    const newFields = [...fields]
    newFields.splice(index, 1)
    setFields(newFields)
    setErrors((prev) => {
      const newErrors = [...prev.blocks]
      newErrors.splice(index, 1)
      return { ...prev, blocks: [...newErrors] }
    })
  }

  const handleMoveFieldUp = (index) => {
    if (index > 0) {
      swapFields(index, index - 1)
    }
  }

  const handleMoveFieldDown = (index) => {
    if (index < fields.length - 1) {
      swapFields(index, index + 1)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setErrors({
      title: { message: "" },
      author: { message: "" },
      publishedDate: { message: "" },
      blocks: errors.blocks.map(() => ({ message: "" })),
    })
    const article = {
      title,
      author,
      creationDate,
      publishedDate,
      contentBlocks: fields,
    }
    const validationResults = schema.safeParse(article)
    if (!validationResults.success) {
      validationResults.error.issues.forEach((val) => {
        switch (val.path[0]) {
          case "title":
            setErrors((prev) => ({ ...prev, title: { message: val.message } }))
            break
          case "author":
            setErrors((prev) => ({ ...prev, author: { message: val.message } }))
            break
          case "publishedDate":
            setErrors((prev) => ({ ...prev, publishedDate: { message: val.message } }))
            break
          case "contentBlocks": {
            if (val?.custom) {
              setErrors((prev) => ({
                ...prev,
                blocks: errors.blocks.map((item, index) => {
                  if (index === 0) {
                    return { message: val.message }
                  }
                  return { message: "" }
                }),
              }))
            } else if (val.path.length > 1) {
              setErrors((prev) => ({
                ...prev,
                blocks: errors.blocks.map((item, index) => {
                  if (index === val.path[1]) {
                    return { message: val.message }
                  }
                  return { message: "" }
                }),
              }))
            } else
              setErrors((prev) => ({
                ...prev,
                blocks: errors.blocks.map(() => ({ message: val.message })),
              }))
            break
          }
          default:
            break
        }
      })
      setValidated(false)
      return
    }
    setValidated(true)
    setLoading(true)
    new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
      setLoading(false)
    })
    console.log(article)

    // String.trim() method is used for removing leading and ending whitespaces from the title.
    // const film = { title: title.trim(), favorite: favorite, rating: rating, watchDate: watchDate }

    /* In this solution validations are executed through HTML.
       If you prefer JavaScript validations, this is the right place for coding them. */

    // if (props.film) {
    //   film.id = props.film.id
    //   props.editFilm(film)
    // } else props.addFilm(film)

    // navigate("/article/id")
  }

  return (
    <Form noValidate validated={validated} className="mb-0" onSubmit={handleSubmit}>
      <div className="form-row">
        <Form.Group className="mb-3 form-group">
          <Form.Label className="fw-bold">Title</Form.Label>
          <Form.Control
            type="text"
            required
            value={title}
            minLength={1}
            disabled={loading}
            onChange={(event) => setTitle(event.target.value)}
            isInvalid={errors.title.message !== ""}
          />
          <Form.Control.Feedback type="invalid">{errors.title.message}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3 form-group">
          <Form.Label className="fw-bold">Author</Form.Label>
          <Form.Control
            type="text"
            required
            value={author}
            minLength={1}
            disabled={loading}
            onChange={(event) => setAuthor(event.target.value)}
            isInvalid={errors.author.message !== ""}
          />
          <Form.Control.Feedback type="invalid">{errors.author.message}</Form.Control.Feedback>
        </Form.Group>
      </div>
      <div className="form-row">
        <Form.Group className="mb-3 form-group">
          <Form.Label className="fw-bold">Creation Date</Form.Label>
          <DatePicker
            selected={creationDate}
            closeOnScroll
            disabled
            dateFormat={"dd/MM/yyyy"}
            className="form-control"
            wrapperClassName="w-100"
          />
        </Form.Group>
        <Form.Group className="mb-3 form-group">
          <Form.Label className="fw-bold">Publication Date</Form.Label>
          <DatePicker
            selected={publishedDate}
            onChange={(date) => setPublishedDate(date)}
            closeOnScroll
            dateFormat={"dd/MM/yyyy"}
            placeholderText="Click to select a publication date"
            isClearable
            disabled={loading}
            wrapperClassName="w-100"
            className="form-control"
            isInvalid={errors.publishedDate.message !== ""}
          />
          <Form.Control.Feedback type="invalid">
            {errors.publishedDate.message}
          </Form.Control.Feedback>
        </Form.Group>
      </div>
      <div className="mt-3 blocks-wrapper">
        <Form.Group className="mb-3">
          <Form.Label className="fw-bold">Content Blocks</Form.Label>
          <p className="text-muted label-description">
            The blocks will be displayed in the order displayed
          </p>
          {showCustomFeedback && (
            <Form.Control.Feedback
              style={{
                display: "block",
              }}
              type="invalid"
            >
              {errors.blocks[0].message}
            </Form.Control.Feedback>
          )}
          {fields.map((field, index) => (
            <Row key={index}>
              <Col className="block">
                <Form.Group className="form-group">
                  <Form.Label className="fw-bold">Type:</Form.Label>
                  <Form.Control
                    as="select"
                    value={field.type}
                    disabled={loading}
                    onChange={(event) => {
                      const newFields = [...fields]
                      newFields[index].type = event.target.value
                      newFields[index].value =
                        newFields[index].type === BlockTypes.IMAGE ? "" : newFields[index].value
                      setFields(newFields)
                    }}
                    isInvalid={errors.blocks[index].message !== ""}
                  >
                    <option value={BlockTypes.PARAGRAPH}>Paragraph</option>
                    <option value={BlockTypes.HEADER}>Header</option>
                    <option value={BlockTypes.IMAGE}>Image</option>
                  </Form.Control>
                  <Col xs="auto" className="blocks-btn-row">
                    {fields.length > 1 && (
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleRemoveField(index)}
                        disabled={loading}
                      >
                        Remove
                      </Button>
                    )}
                    {index > 0 && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleMoveFieldUp(index)}
                        disabled={loading}
                      >
                        <IconArrowNarrowUp size={20} />
                      </Button>
                    )}
                    {index < fields.length - 1 && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleMoveFieldDown(index)}
                        disabled={loading}
                      >
                        <IconArrowNarrowUp size={20} className="arrow-down" />
                      </Button>
                    )}
                  </Col>
                </Form.Group>
                <Form.Group>
                  <Form.Label className="fw-bold">Value:</Form.Label>
                  {renderInputField(index)}
                </Form.Group>
              </Col>
            </Row>
          ))}
        </Form.Group>
      </div>
      <div className="form-buttons-group">
        <Button className="mb-3" onClick={() => handleAddField()} disabled={loading}>
          Add new block
        </Button>
        <div className="form-actions">
          <Button variant="primary" type="submit" disabled={loading}>
            Save
          </Button>
          <Button variant="danger" disabled={loading}>
            <Link to={nextpage} className="text-decoration-none text-white">
              Go Back
            </Link>
          </Button>
        </div>
      </div>
    </Form>
  )
}
