[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/8AapHqUJ)
# Exam #N: "Exam Title"
## Student: s123456 LASTNAME FIRSTNAME 

## React Client Application Routes

- Route `/`: index. It show all the published articles
- Route `/login`: login page
- Route `/articles/:id`: page of an article. It shows all the info of the article with id equals to :id
- Route `/articles/:id/edit`: page to edit an article. It shows all the info of the article with id equals to :id in a form and you can edit them
- Route `/articles/add`: page to add an article. It shows the form that enable the user to create a new article
- Route `/globals/edit`: page to edit the title showed in th navbar
- Route `/all-articles`: page to show all the articles in the db

## API Server

- POST `/api/something`
  - request parameters and request body content
  - response body content
- GET `/api/something`
  - request parameters
  - response body content
- POST `/api/something`
  - request parameters and request body content
  - response body content
- ...

## Database Tables

- Table `users` - contains xx yy zz
- Table `something` - contains ww qq ss
- ...

## Main React Components

**All the components are responsive. All the validation of the data are made with zod that is a schema validator**

- `NavBar` (in `NavBar.jsx`): navigation bar of the application, shows the title and has different action if the user is logged in or not. 
  - **Not logged**: the login and the home button when the user
  - **Logged**: the user name, a link to the all articles page, a link to go to create new article page and logout button when.
- `LoginPage` (in `pages/login/loginPage.jsx`): login page with a form with a custom validation function to validate email and password fields.
- `EditArticle` (in `pages/article/edit/edit.jsx`): a page that fetch the article from the db and then pass it to the form that enable the user to edit the article. If the user is not logged in, the page redirect to the login page. 
- `AddArticle` (in `pages/article/add/add.jsx`): a page that load the form that enable the user to create a new article. If the user is not logged in, the page redirect to the login page.
- `ArticleForm` (in `ArticleForm.jsx`): this is the form component used to edit and create articles. It has a custom validation for each field. In the `Content Blocks` section you can add/remove blocks and you can also change the order in which they will be showed.
- `Index` (in `pages/index.jsx`): the index page. It shows all the published articles when it is called with the path `/`, while if it is called with the path `/all-articles` and the user is logged, it shows all the saved articles
- `GridContainer` (in `GridContainer.jsx`): a grid contaier that create rows and colums based on the width of the device

## Screenshot

![Screenshot](./img/screenshot1.jpg)
![Screenshot](./img/screenshot2.jpg)

## Users Credentials

- username, password (plus any other requested info)
- username, password (plus any other requested info)
