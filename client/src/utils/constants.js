import Img1 from "../assets/images/wallpaper_1.webp"
import Img2 from "../assets/images/wallpaper_2.webp"
import Img3 from "../assets/images/wallpaper_3.webp"
import Img4 from "../assets/images/wallpaper_4.webp"
import Img5 from "../assets/images/wallpaper_5.webp"
import Img6 from "../assets/images/wallpaper_6.webp"

export const BlockTypes = Object.freeze({
  PARAGRAPH: "paragraph",
  HEADER: "header",
  IMAGE: "image",
})

export const images = [
  { name: "wallpaper_1", value: Img1 },
  { name: "wallpaper_2", value: Img2 },
  { name: "wallpaper_3", value: Img3 },
  { name: "wallpaper_4", value: Img4 },
  { name: "wallpaper_5", value: Img5 },
  { name: "wallpaper_6", value: Img6 },
]

export const articleStatus = Object.freeze({
  PUBLISHED: "published",
  DRAFT: "draft",
  SCHEDULED: "scheduled",
})

export const roles = Object.freeze({
  ADMIN: "admin",
  USER: "user",
})
