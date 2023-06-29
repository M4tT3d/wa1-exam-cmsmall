[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/8AapHqUJ)

# Exam #1: "CMSmall"

## Student: sxxxxxx TEDESCO MATTEO

## React Client Application Routes

- Route `/`: page content and purpose
- Route `/something/:param`: page content and purpose, param specification
- ...

## API Server

- **GET** `/api/articles` - Get all the published articles. All the block are ordered by order field

  - Request Body: **None**
  - Response Status: `200` OK, `500` if some errors occur
  - Response Body:
    ```
    [
      {
        articleId: number - Article ID
        title: string - Article title
        publishedDate: Date - The publication date
        createdAt: Date - The creation date
        userId: integer - The user that owns the article
        author: string - The author name
        contentBlocks: [
          {
            type: string - The type of the block
            data: string - The content of the block
          }
        ]
      }
    ]
    ```
<br />

- **POST** `/api/articles` - Create a new article

  - Prerequisite: User is logged in
  - Request Body:
    ```
    {
        articleId: number - Article ID
        title: string - Article title
        publishedDate: Date - The publication date
        createdAt: Date - The creation date
        userId: integer - The user that owns the article
        author: string - The author name
        contentBlocks: [
          {
            type: string - The type of the block
            data: string - The content of the block
            order: number - The position of the block in the array
          }
        ]
      }
    ```
  - Response Status: `201` Created, `500` if some errors occur
  - Response Body:
    ```
      {
        articleId: number - Article ID
      }
    ```
<br />

- **PATCH** `/api/articles/:id` - Edit the article with id equals to :id

  - Prerequisite: User is logged in and he must be the owner of the article or an admin
  - Request Body:
    ```
    {
        articleId: number - Article ID
        title: string - Article title
        publishedDate: Date - The publication date
        createdAt: Date - The creation date
        userId: integer - The user that owns the article
        author: string - The author name
        contentBlocks: [
          {
            type: string - The type of the block
            data: string - The content of the block
            order: number - The position of the block in the array
          }
        ]
      }
    ```
  - Response Status: `200` OK, `500` if some errors occur
  - Response Body:
    ```
    {
        articleId: number - Article ID
    }
    ```
<br />

- **GET** `/user/articles` - Get all articles of the logged user. All the block are ordered by order field

  - Prerequisite: User is logged in
  - Request Body: **None**
  - Response Status: `200` OK, `500` if some errors occur
  - Response Body:
    ```
    [
      {
        articleId: number - Article ID
        title: string - Article title
        publishedDate: Date - The publication date
        createdAt: Date - The creation date
        userId: integer - The user that owns the article
        author: string - The author name
        contentBlocks: [
          {
            type: string - The type of the block
            data: string - The content of the block
          }
        ]
      }
    ]
    ```
<br />

- **DELETE** `/api/articles/:id` - Edit the article with id equals to :id

  - Prerequisite: User is logged in and he must be the owner of the article or an admin
  - Request Body: **None**
  - Response Status: `200` OK, `500` if some errors occur
  - Response Body:
    ```
    {
        message: text
    }
    ```
<br />

- **POST** `/api/sessions` - Create a new session with the logged in user

  - Request Body:
    ```js
    {
      username: 'user1@email.com',
      password: 'password'
    }
    ```
  - Response Status: `201` OK, `401` Unauthorized
  - Response Body:
    ```
    {
      id: number - User ID
      username: string - User email
      name: string - User name
      surname: string - User surname
      role: string - The user role (admin or user)
    }
    ```

- **GET** `/api/sessions/current` - Get the info about the current user

  - Prerequisite: User is logged in
  - Request Body: **None**
  - Response Status: `200` OK, `401` Unauthorized
  - Response Body:
    ```
    {
      id: number - User ID
      username: string - User email
      name: string - User name
      surname: string - User surname
      role: string - The user role (admin or user)
    }
    ```

- **DELETE** `/api/session/current` - Delete the current session and logout the user
  - Prerequisite: User is logged in
  - Request Body: **None**
  - Response Status: `200` OK, `401` Unauthorized
  - Response Body: **None**

## Database Tables

- Table `article` - contains all the courses available.  
   _**Columns**:_

  - `articleId`: integer - Article ID (PK)
  - `title`: text - The article title
  - `publishedDate`: date - The publication date
  - `createdAt`: date - The creation date
  - `userId`: integer - User ID (FK). It is used to find the iser that own the article
    <br />
    <br />

- Table `block` - contains the the blocks that are contained in an article  
   _**Columns**:_

  - `blockId`: integer - Block ID (PK)
  - `type`: text - the type of the block. It can be only `paragraph`, `header` and `image`
  - `value`: text - the content of the block
  - `order`: integer - the visualization position of the block
  - `articleId`: integer - Article ID (FK). It is used to find the article that owns the block
    <br />
    <br />

- Table `user` - contains the users

  _**Columns**:_

  - `userId`: integer - User ID (PK)
  - `email`: text - User email
  - `name`: text - User name
  - `surname`: text - User surname
  - `hash`: text - User password hashed
  - `salt`: text - Salt used to hash the password
    <br />
    <br />

- Table `global` - contains global settings of the cms

  _**Columns**:_

  - `type`: text - type of the setting (PK)
  - `value`: text - value

## Main React Components

- `ListOfSomething` (in `List.js`): component purpose and main functionality
- `GreatButton` (in `GreatButton.js`): component purpose and main functionality
- ...

(only _main_ components, minor ones may be skipped)

## Screenshot

![Screenshot](./img/screenshot.jpg)

## Users Credentials

- admin@email.com, password (Is the admin)
- user1@email.com, password1 (Normal user. He has 1 article)
- user2@email.com, password2 (Normal user. He has 2 articles)
- user3@email.com, password3 (Normal user. He has 3 articles)
