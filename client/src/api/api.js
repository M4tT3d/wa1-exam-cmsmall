"use strict"

//import server url from .env file
const serverUrl = import.meta.env.VITE_SERVER_URL

async function handleRequest(url, options, expectedStatus = 200) {
  try {
    const data = await fetch(url, options)
    const dataJson = await data.json()
    if (data.status === expectedStatus) return dataJson
    else {
      if (typeof dataJson === "string") throw new Error(dataJson.error)
      if (dataJson.error?.message) throw new Error(dataJson.error.message)
      else throw new Error(dataJson.error[0].message)
    }
  } catch (error) {
    return { error: error.message }
  }
}

export async function getAllPublishedArticles() {
  const url = new URL("/api/articles", serverUrl)
  return await handleRequest(url, { method: "GET" })
}

export async function getArticleById(id) {
  const url = new URL(`/api/articles/${id}`, serverUrl)
  return await handleRequest(url, { method: "GET", credentials: "include" })
}

export async function getAllArticles() {
  const url = new URL(`/api/all-articles`, serverUrl)
  return await handleRequest(url, { method: "GET", credentials: "include" })
}

export async function createArticle(articleData) {
  const url = new URL("/api/articles", serverUrl)
  return await handleRequest(
    url,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(articleData),
    },
    201
  )
}

export async function updateArticle(id, articleData) {
  const url = new URL(`/api/articles/${id}`, serverUrl)
  return await handleRequest(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(articleData),
  })
}

export async function deleteArticle(id) {
  const url = new URL(`/api/articles/${id}`, serverUrl)
  return await handleRequest(url, { method: "DELETE", credentials: "include" })
}

export async function getGlobal(key) {
  const url = new URL(`/api/globals/${key}`, serverUrl)
  return await handleRequest(url, { method: "GET" })
}

export async function updateGlobal(key, value) {
  const url = new URL(`/api/globals/${key}`, serverUrl)
  return await handleRequest(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ value: value }),
  })
}

export async function getAllUsers() {
  const url = new URL(`/api/users`, serverUrl)
  return await handleRequest(url, { method: "GET", credentials: "include" })
}

export async function login(userData) {
  const url = new URL("/api/sessions", serverUrl)
  return await handleRequest(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
}

export async function getSession() {
  const url = new URL("/api/sessions/current", serverUrl)
  return await handleRequest(url, { method: "GET", credentials: "include" })
}

export async function logout() {
  const url = new URL("/api/sessions/current", serverUrl)
  return await handleRequest(url, { method: "DELETE", credentials: "include" })
}
