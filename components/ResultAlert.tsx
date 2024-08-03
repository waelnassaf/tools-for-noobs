"use client"

import React from "react"
import { TiTimes } from "react-icons/ti"
import { ResultAlertProps } from "@/types"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "react-toastify"
import clsx from "clsx"

const ResultAlert = ({
    showAlert,
    isEmpty,
    message,
    hideAlert,
    alertDiv,
    additionalStyling,
}: ResultAlertProps) => {
    const handleCopy = () => {
        navigator.clipboard
            .writeText(message)
            .then(() => {
                toast.success("Result copied to clipboard successfully!")
            })
            .catch((err) => {
                console.error("Error copying text: ", err)
                toast.error("Failed to copy message.")
            })
    }

    return (
        <>
            <AnimatePresence>
                {showAlert && (
                    <div ref={alertDiv}>
                        <motion.div
                            key={message}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className={clsx(
                                "mt-5 flex justify-center items-center relative p-4 w-auto min-h-[150px] max-w-[90%] mx-auto",
                                {
                                    "alert alert-error": isEmpty,
                                    "alert alert-success text-white": !isEmpty,
                                },
                                additionalStyling
                            )}
                        >
                            {isEmpty ? (
                                <>
                                    <span className="text-2xl">
                                        Empty Input
                                    </span>
                                    <button
                                        className="btn btn-sm bg-black text-white border-none absolute right-2 top-2"
                                        onClick={hideAlert}
                                    >
                                        <TiTimes className="text-2xl" />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <span className="text-2xl whitespace-break-spaces">
                                        {message}
                                    </span>
                                    <button
                                        className="btn btn-sm bg-blue-500 text-white border-none absolute right-2 top-2"
                                        onClick={handleCopy}
                                    >
                                        Copy Result
                                    </button>
                                </>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    )
}

export default ResultAlert
