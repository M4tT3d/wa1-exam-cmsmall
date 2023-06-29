"use strict"
import { articleStatus } from "./constants.js"

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function getArticleStatus(publishedDate) {
  if (publishedDate === null) return capitalizeFirstLetter(articleStatus.DRAFT)
  else if (new Date(publishedDate) > new Date())
    return capitalizeFirstLetter(articleStatus.SCHEDULED)
  else
    return new Date(publishedDate).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
}
