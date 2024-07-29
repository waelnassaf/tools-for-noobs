"use server"

import { sendUserContactEmail, sendVerificationEmail } from "@/lib/mail"
import * as z from "zod"
import { ContactSchema } from "@/schemas"

export const contact = async (values: z.infer<typeof ContactSchema>) => {
    await sendUserContactEmail(
        values.name,
        values.email,
        values.subject,
        values.message
    )

    return { success: "Message sent successfully! We will get to you soon" }
}
