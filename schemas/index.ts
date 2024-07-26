import { UserRole } from "@prisma/client"
import * as z from "zod"

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Invalid Email!",
    }),
    password: z.string().min(1, {
        message: "Password is required!",
    }),
    code: z.optional(
        z.string().min(6, {
            message: "Invalid Code!",
        })
    ),
})

export const RegisterSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required!",
    }),
    email: z.string().email({
        message: "Invalid Email!",
    }),
    password: z.string().min(6, {
        message: "Minimum password should be 6 characters!",
    }),
})

export const ResetSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
})

export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "Password is too short!",
    }),
})

export const SettingsSchema = z
    .object({
        name: z.optional(z.string().min(1)),
        isTwoFactorEnabled: z.optional(z.boolean()),
        role: z.enum([UserRole.ADMIN, UserRole.USER]),
        email: z.optional(z.string().email()),
        password: z.optional(z.string().min(6)),
        newPassword: z.optional(z.string().min(6)),
    })
    .refine(
        (data) => {
            return !(data.password && !data.newPassword)
        },
        {
            message: "New password is required!",
            path: ["newPassword"],
        }
    )
    .refine(
        (data) => {
            return !(data.newPassword && !data.password)
        },
        {
            message: "Password is required!",
            path: ["password"],
        }
    )

export const ToolSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required!",
    }),
    description: z.string().min(1, {
        message: "Description is required!",
    }),
    categoryId: z.coerce.number().int().positive({
        message: "Category ID must be a positive integer!",
    }),
})
