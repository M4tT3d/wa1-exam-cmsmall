"use strict"
import { articleStatus } from "./constants.js"

export function getArticleStatus(publishedDate) {
  if (publishedDate === null) return articleStatus.DRAFT
  else if (new Date(publishedDate) > new Date()) return articleStatus.SCHEDULED
  else
    return new Date(publishedDate).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
}
