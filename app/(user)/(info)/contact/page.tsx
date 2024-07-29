"use client"

import * as z from "zod"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Breadcrumbs } from "@/components"
import { ContactSchema } from "@/schemas"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { contact } from "@/server/contact"
import { toast } from "sonner"

const ContactPage = () => {
    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()
    const [isPending, startTransition] = useTransition()
    const pages = ["Home", "Contact Us"]

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof ContactSchema>>({
        resolver: zodResolver(ContactSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        },
    })

    const onSubmit = (values: z.infer<typeof ContactSchema>) => {
        startTransition(() => {
            contact(values)
                .then((data) => {
                    // if (data.error) {
                    //     setError(data.error)
                    // }
                    if (data.success) {
                        toast.message("Email sent successfully!")
                        setSuccess(data.success)
                    }
                })
                .catch(() => setError("Something went wrong!"))
        })
    }

    return (
        <>
            <Breadcrumbs pages={pages} />

            <section className="bg-camel-100 py-5 px-3 my-5 w-1/2 mx-auto">
                <h1 className="text-2xl">
                    Wanna tell us something? Send us an email about it.
                </h1>

                <form
                    className="my-4 space-y-4"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Your Name</span>
                        </div>
                        <input
                            type="text"
                            className={`input input-bordered w-full ${errors.name && "input-error"}`}
                            placeholder="Your Name"
                            {...register("name")}
                            disabled={isPending}
                        />
                        {errors?.name?.message && (
                            <p className="text-red-700 mt-2 text-sm">
                                {errors.name.message}
                            </p>
                        )}
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Your Email</span>
                        </div>
                        <input
                            type="email"
                            className={`input input-bordered w-full ${errors.email && "input-error"}`}
                            placeholder="Your Email"
                            {...register("email")}
                            disabled={isPending}
                        />
                        {errors?.email?.message && (
                            <p className="text-red-700 mt-2 text-sm">
                                {errors.email.message}
                            </p>
                        )}
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Subject</span>
                        </div>
                        <input
                            type="text"
                            className={`input input-bordered w-full ${errors.name && "input-error"}`}
                            placeholder="Message Subject"
                            {...register("subject")}
                            disabled={isPending}
                        />
                        {errors?.subject?.message && (
                            <p className="text-red-700 mt-2 text-sm">
                                {errors.subject.message}
                            </p>
                        )}
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Your Message</span>
                        </div>
                        <textarea
                            className={`textarea textarea-bordered w-full h-[200px] ${errors.message && "textarea-error"}`}
                            placeholder="Your Message..."
                            {...register("message")}
                            disabled={isPending}
                        />
                        {errors?.message?.message && (
                            <p className="text-red-700 mt-2 text-sm">
                                {errors.message.message}
                            </p>
                        )}
                    </label>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <button
                        type="submit"
                        className="btn btn-neutral"
                        disabled={isPending}
                    >
                        Send
                    </button>
                </form>
            </section>
        </>
    )
}

export default ContactPage
