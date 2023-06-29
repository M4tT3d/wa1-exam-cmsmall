"use strict"
import {
  insertArticle,
  listArticleByUserId,
  listArticles,
  patchArticle,
  removeArticle,
} from "../models/articles.dao.js"

export function getArticles(req, res) {
  listArticles()
    .then((articles) => {
      res.status(200).json(articles)
    })
    .catch((error) => {
      res.status(500).json({ error: error })
    })
}

export function createArticle(req, res) {
  insertArticle(req.body)
    .then((articleId) => {
      res.status(201).json({ articleId: articleId })
    })
    .catch((error) => {
      res.status(500).json({ error: error })
    })
}

export function getArticleByUserId(req, res) {
  listArticleByUserId(req.user.id)
    .then((article) => {
      res.status(200).json(article)
    })
    .catch((error) => {
      res.status(500).json({ error: error })
    })
}

export function updateArticle(req, res) {
  patchArticle(req.body, parseInt(req.params.id, 10))
    .then((data) => {
      res.status(200).json({ articleId: data })
    })
    .catch((error) => {
      res.status(500).json({ error: error })
    })
}

export function deleteArticle(req, res) {
  removeArticle(parseInt(req.params.id, 10))
    .then((data) => {
      res.status(200).json({ message: `Article ${data} deleted` })
    })
    .catch((error) => {
      res.status(500).json({ error: error })
    })
}