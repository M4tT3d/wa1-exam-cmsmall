"use strict"
import { z } from "zod"
import { BlockTypes } from "./constants.js"

const customErrorMessage = [
  "At least two blocks are required",
  "At least one header is required and at least one paragraph or image is required",
]

export const articleSchema = z
  .object({
    title: z.string().trim().min(1, { message: "Title is required" }),
    userId: z.number().int({ message: "User id is required" }),
    creationDate: z
      .string()
      .trim()
      .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date must be in YYYY-MM-DD format" })
      .refine((value) => {
        const fields = value.split("-").map((item) => parseInt(item, 10))
        const isValidMonth = fields[1] >= 1 && fields[1] <= 12
        const isValidDay = fields[2] >= 1 && fields[2] <= 31
        return isValidMonth && isValidDay
      }),
    publishedDate: z
      .string()
      .trim()
      .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date must be in YYYY-MM-DD format" })
      .optional()
      .nullable(),
    contentBlocks: z
      .array(
        z.object({
          type: z.nativeEnum(BlockTypes),
          data: z.string().trim().min(1, { message: "Value is required" }),
          order: z.number().int().min(0, { message: "Order must be a positive integer" }),
        })
      )
      .min(2, { message: customErrorMessage[0] })
      .refine(
        (value) => {
          const hasHeader = value.some((item) => item.type === BlockTypes.HEADER)
          const hasOthers = value.some(
            (item) => item.type === BlockTypes.PARAGRAPH || item.type === BlockTypes.IMAGE
          )
          return hasHeader && hasOthers
        },
        { message: customErrorMessage[1] }
      ),
  })
  .superRefine((obj, ctx) => {
    const { creationDate, publishedDate } = obj
    if (publishedDate) {
      if (new Date(publishedDate) < new Date(creationDate)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Published date must be after creation date",
          path: ["publishedDate"],
        })
      }
    }
  })

export const titleSchema = z.object({
  value: z.string().trim().min(1),
})