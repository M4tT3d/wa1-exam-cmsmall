"use strict"
import db from "../db/connection.js"

function reduceArticlesBlocks(rows) {
  const articles = []
  rows.forEach((row) => {
    const article = articles.find((article) => article.articleId === row.articleId)
    if (article) {
      article.contentBlocks.push({
        type: row.type,
        data: row.value,
        order: row.order,
      })
    } else {
      articles.push({
        articleId: row.articleId,
        title: row.title,
        contentBlocks: [{ type: row.type, data: row.value, order: row.order }],
        createdAt: row.createdAt,
        publishedDate: row.publishedDate,
        userId: row.userId,
        author: `${row.name} ${row.surname}`,
      })
    }
  })
  articles.forEach(
    (article) => (article.contentBlocks = article.contentBlocks.sort((a, b) => a.order - b.order))
  )
  return articles
}

export function listArticles(articleId) {
  return new Promise((resolve, reject) => {
    if (articleId === null) {
      db.all(
        `SELECT * FROM article JOIN user ON article.userId = user.userId JOIN block ON article.articleId = block.articleId WHERE publishedDate IS NOT NULL ORDER BY publishedDate ASC`,
        (error, rows) => {
          if (error) reject(error)
          resolve(
            reduceArticlesBlocks(
              rows.filter((article) => new Date() >= new Date(article.publishedDate))
            )
          )
        }
      )
    } else {
      db.all(
        `SELECT * FROM article JOIN user ON article.userId = user.userId JOIN block ON article.articleId = block.articleId AND article.articleId = ?`,
        [articleId],
        (error, rows) => {
          if (error) reject(error)
          if (!rows || rows.length === 0) reject("Article not found")
          else resolve(reduceArticlesBlocks(rows)[0])
        }
      )
    }
  })
}

export function listAllArticles() {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM article JOIN user ON article.userId = user.userId JOIN block ON article.articleId = block.articleId`,
      (error, rows) => {
        if (error) reject(error)
        resolve(reduceArticlesBlocks(rows))
      }
    )
  })
}

export function insertArticle(article) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO article (title, userId, createdAt, publishedDate) VALUES (?, ?, ?, ?)`,
      [article.title, article.userId, article.creationDate, article.publishedDate ?? null],
      function (error) {
        if (error) reject(error)
        const articleId = this.lastID
        article.contentBlocks.forEach((block) => {
          db.run(
            `INSERT INTO block (type, value, 'order', articleId) VALUES (?, ?, ?, ?)`,
            [block.type, block.data, block.order, articleId],
            (err) => {
              if (err) reject(err)
            }
          )
        })
        resolve(articleId)
      }
    )
  })
}

export function patchArticle(article, articleId) {
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE article SET title = ?, userId = ?, createdAt = ?, publishedDate = ? WHERE articleId = ?`,
      [article.title, article.userId, article.creationDate, article.publishedDate, articleId],
      (error) => {
        if (error) reject(error)
        db.run(`DELETE FROM block WHERE articleId = ?`, [articleId], (err) => {
          if (err) reject(err)
          article.contentBlocks.forEach((block) => {
            db.run(
              `INSERT INTO block (type, value, articleId, 'order') VALUES (?, ?, ?, ?)`,
              [block.type, block.data, articleId, block.order],
              (e) => {
                if (e) reject(e)
              }
            )
          })
          resolve(articleId)
        })
      }
    )
  })
}

export function removeArticle(articleId) {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM article WHERE articleId = ?`, [articleId], (error) => {
      if (error) reject(error)
      db.run(`DELETE FROM block WHERE articleId = ?`, [articleId], (err) => {
        if (err) reject(err)
      })
      resolve(articleId)
    })
  })
}
