"use strict"

//import server url from .env file
const serverUrl = import.meta.env.VITE_SERVER_URL

export async function getAllPost() {
  const url = new URL("/api/articles", serverUrl)
  try {
    const data = await (
      await fetch(url, {
        method: "GET",
      })
    ).json()
    return data
  } catch (error) {
    return { errror: error }
  }
}

export async function getPostById(id) {
  const url = new URL(`/api/articles/${id}`, serverUrl)
  try {
    const data = await (
      await fetch(url, {
        method: "GET",
      })
    ).json()
    return data
  } catch (error) {
    return { error: error }
  }
}

export async function getGlobal(key) {
  const url = new URL(`/api/globals/${key}`, serverUrl)
  try {
    const data = await (
      await fetch(url, {
        method: "GET",
      })
    ).json()
    return data
  } catch (error) {
    return { error: error }
  }
}

export async function login(userData) {
  const url = new URL("/api/sessions", serverUrl)
  try {
    const data = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
    const dataJson = await data.json()
    if (data.status === 200) return dataJson
    else throw new Error(dataJson.error?.message || dataJson.error)
  } catch (error) {
    return { error: error.message }
  }
}

export async function getSession() {
  const url = new URL("/api/sessions/current", serverUrl)
  try {
    const data = await fetch(url, {
      method: "GET",
      credentials: "include",
    })
    const dataJson = await data.json()
    if (data.status === 200) return dataJson
    else throw new Error(dataJson.error?.message || dataJson.error)
  } catch (error) {
    return { error: error.message }
  }
}

export async function logout() {
  const url = new URL("/api/sessions/current", serverUrl)
  try {
    const data = await fetch(url, { method: "DELETE", credentials: "include" })
    const dataJson = await data.json()
    if (data.status === 200) return dataJson
    else throw new Error(dataJson.error?.message || dataJson.error)
  } catch (error) {
    return { error: error }
  }
}
