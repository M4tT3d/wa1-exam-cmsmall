import { IconArrowNarrowUp } from "@tabler/icons-react"
import it from "date-fns/locale/it"
import { useState } from "react"
import { Button, Col, Form, Image, Row } from "react-bootstrap"
import DatePicker, { registerLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { BlockTypes, images } from "../../utils/constants"
import "./index.css"
registerLocale("it", it)

export default function ArticleForm({ article }) {
  //form management
  const [validated, setValidated] = useState(false)
  const [fields, setFields] = useState([{ type: BlockTypes.HEADER, value: "" }])
  //article management
  const [title, setTitle] = useState(article ? article.title : "")
  const [author, setAuthor] = useState(article ? article.author : "")
  const [publishedDate, setPublishedDate] = useState(
    article && article.publishedDate ? new Date(article.publishedDate) : null
  )
  const [creationDate, setCreationDate] = useState(
    article && article.creationDate ? article.creationDate : new Date()
  )
  const [selectedImage, setSelectedImage] = useState(images[0])

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
          <Form.Control
            as="textarea"
            rows={4}
            value={field.value}
            onChange={(event) => handleChangeValue(index, event)}
          />
        )
      case BlockTypes.HEADER:
        return (
          <Form.Control
            type="text"
            value={field.value}
            onChange={(event) => handleChangeValue(index, event)}
          />
        )
      case BlockTypes.IMAGE:
        return (
          <div className="image-option">
            {images.map((image, index) => (
              <Form.Check
                key={image.name}
                type="radio"
                id={`imageRadio-${index}`}
                label={
                  <Image src={image.value} thumbnail style={{ width: "200px", height: "110px" }} />
                }
                checked={selectedImage === image}
                onChange={() => {
                  setSelectedImage(image.name)
                }}
                className="image-preview"
              />
            ))}
          </div>
        )
      default:
        return null
    }
  }

  const handleAddField = () => {
    setFields([...fields, { type: "paragraph", value: "" }])
  }

  const handleRemoveField = (index) => {
    const newFields = [...fields]
    newFields.splice(index, 1)
    setFields(newFields)
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
    const a = event.currentTarget
    console.log(a)
    console.log(creationDate, publishedDate)

    // String.trim() method is used for removing leading and ending whitespaces from the title.
    // const film = { title: title.trim(), favorite: favorite, rating: rating, watchDate: watchDate }

    /* In this solution validations are executed through HTML.
       If you prefer JavaScript validations, this is the right place for coding them. */

    // if (props.film) {
    //   film.id = props.film.id
    //   props.editFilm(film)
    // } else props.addFilm(film)

    // navigate("/")
  }

  return (
    <Form noValidate validated={validated} className="mb-0" onSubmit={handleSubmit}>
      <div className="form-row">
        <Form.Group className="mb-3 form-group">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            required={true}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <Form.Control.Feedback type="invalid">Title is required</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3 form-group">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            required={true}
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </Form.Group>
      </div>
      <div className="form-row">
        <Form.Group className="mb-3 form-group">
          <Form.Label>Creation Date</Form.Label>
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
          <Form.Label>Publication Date</Form.Label>
          <DatePicker
            selected={publishedDate}
            onChange={(date) => setPublishedDate(date)}
            closeOnScroll
            dateFormat={"dd/MM/yyyy"}
            placeholderText="Click to select a publication date"
            isClearable
            wrapperClassName="w-100"
            className="form-control"
          />
        </Form.Group>
      </div>
      <div className="mt-3 blocks-wrapper">
        <Form.Group className="mb-3">
          <Form.Label>Content Blocks</Form.Label>
          {fields.map((field, index) => (
            <Row key={index}>
              <Col className="block">
                <Form.Group className="form-group">
                  <Form.Label>Type:</Form.Label>
                  <Form.Control
                    as="select"
                    value={field.type}
                    onChange={(event) => {
                      const newFields = [...fields]
                      newFields[index].type = event.target.value
                      newFields[index].value =
                        newFields[index].type === BlockTypes.IMAGE ? "" : newFields[index].value
                      setFields(newFields)
                    }}
                  >
                    <option value={BlockTypes.PARAGRAPH}>Paragraph</option>
                    <option value={BlockTypes.HEADER}>Header</option>
                    <option value={BlockTypes.IMAGE}>Image</option>
                  </Form.Control>
                  <Col xs="auto" className="blocks-btn-row">
                    {fields.length > 1 && (
                      <Button variant="danger" size="sm" onClick={() => handleRemoveField(index)}>
                        Remove
                      </Button>
                    )}
                    {index > 0 && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleMoveFieldUp(index)}
                      >
                        <IconArrowNarrowUp size={20} />
                      </Button>
                    )}
                    {index < fields.length - 1 && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleMoveFieldDown(index)}
                      >
                        <IconArrowNarrowUp size={20} className="arrow-down" />
                      </Button>
                    )}
                  </Col>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Value:</Form.Label>
                  {renderInputField(index)}
                </Form.Group>
              </Col>
            </Row>
          ))}
        </Form.Group>
      </div>
      <div className="form-buttons-group">
        <Button className="mb-3" onClick={() => handleAddField()}>
          Add new block
        </Button>
        <div className="form-actions">
          <Button className="" variant="primary" type="submit">
            Save
          </Button>
          <Link className="btn btn-danger" to={nextpage}>
            Cancel
          </Link>
        </div>
      </div>
    </Form>
  )
}
