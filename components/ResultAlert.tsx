"use client"

import React from "react"
import { TiTimes } from "react-icons/ti"
import { ResultAlertProps } from "@/types"
import { motion, AnimatePresence } from "framer-motion"

const ResultAlert = ({
    showAlert,
    isEmpty,
    message,
    hideAlert,
    alertDiv,
}: ResultAlertProps) => {
    return (
        <>
            {/*Animate Presence is at top to prevent unmounting the whole div*/}
            <AnimatePresence>
                {showAlert && (
                    <div ref={alertDiv}>
                        <motion.div
                            key={message}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className={
                                isEmpty
                                    ? `alert alert-error mt-5 h-40 flex-center relative`
                                    : `alert alert-success mt-5 text-white h-40 flex-center`
                            }
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
                                <span className="text-2xl whitespace-pre-line">
                                    {message}
                                </span>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    )
}

export default ResultAlert
