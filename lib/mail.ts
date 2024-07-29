import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)
const domain = process.env.NEXT_PUBLIC_APP_URL
const sender = process.env.SENDER_EMAIL

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resetLink = `${domain}/auth/new-password?token=${token}`

    await resend.emails.send({
        from: `Support <${process.env.SENDER_EMAIL}>`,
        to: email,
        subject: "Reset your password",
        html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
    })
}

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `${domain}/auth/new-verification?token=${token}`

    await resend.emails.send({
        from: `Support <${process.env.SENDER_EMAIL}>`,
        to: email,
        subject: "Confirm your email",
        html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
    })
}

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
    await resend.emails.send({
        from: `Support <${process.env.SENDER_EMAIL}>`,
        to: email,
        subject: "2FA Code",
        html: `<p>Use this 2FA code: ${token} to continue the login</p>`,
    })
}

export const sendUserContactEmail = async (
    name: string,
    email: string,
    subject: string,
    message: string
) => {
    await resend.emails.send({
        from: `Emails <${process.env.SENDER_EMAIL}>`,
        to: "waelassaf121@gmail.com",
        subject: subject,
        html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
    })
}
