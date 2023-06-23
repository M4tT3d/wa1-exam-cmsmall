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
