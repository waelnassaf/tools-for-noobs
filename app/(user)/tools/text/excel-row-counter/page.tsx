"use client"

import FileInput from "@/app/(user)/tools/text/_components/FileInput"
import { useState, useRef } from "react"
import { read, utils } from "xlsx"
import { Breadcrumbs, ResultAlert, SubmitButton } from "@/components"

const Page = () => {
    const [rowCount, setRowCount] = useState<number | null>(null)
    const [showAlert, setShowAlert] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)
    const [file, setFile] = useState<File | null>(null)
    const alertDiv = useRef<HTMLDivElement>(null)

    const pages = ["Home", "File Tools", "Excel Row Counter"]

    const handleDrop = (files: FileList) => {
        if (files.length > 0) {
            const selectedFile = files[0]
            if (
                selectedFile.type ===
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
                selectedFile.type === "application/vnd.ms-excel"
            ) {
                setFile(selectedFile)
            } else {
                // Provide user feedback for unsupported file types
                alert("Unsupported file type. Please choose an Excel file.")
                console.error(
                    "Unsupported file type. Please choose an Excel file."
                )
            }
        }
    }

    const handleClick = () => {
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                const data = new Uint8Array(e?.target?.result as ArrayBuffer)
                const workbook = read(data, { type: "array" })
                const firstSheetName = workbook.SheetNames[0]
                const worksheet = workbook.Sheets[firstSheetName]
                const jsonSheet = utils.sheet_to_json(worksheet)
                setRowCount(jsonSheet.length)
                setIsEmpty(jsonSheet.length === 0)
                setShowAlert(true)

                // Scroll to the alert div
                setTimeout(() => {
                    alertDiv.current?.scrollIntoView({ behavior: "smooth" })
                }, 0)
            }
            reader.readAsArrayBuffer(file)
        } else {
            alert("No file selected. Please choose an Excel file first.")
            console.error(
                "No file selected. Please choose an Excel file first."
            )
        }
    }

    return (
        <>
            <Breadcrumbs pages={pages} />
            <div className="mt-12 padding-x padding-y max-width prose">
                <h1>Excel Row Counter</h1>
                <p>Choose or Drop an Excel file to count its rows:</p>

                <div className="max-w-xl mx-auto">
                    <FileInput onDrop={handleDrop} accept=".xlsx,.xls" />
                    <p className="prose">{file?.name}</p>
                    <SubmitButton text="Count Rows" handleClick={handleClick} />

                    <ResultAlert
                        showAlert={showAlert}
                        isEmpty={isEmpty}
                        message={`Number of Rows: ${rowCount}`}
                        hideAlert={() => setShowAlert(false)}
                        alertDiv={alertDiv}
                    />
                </div>

                <div className="flex flex-col w-3/4 mx-auto my-4">
                    <div className="divider"></div>
                </div>

                <div className="tool-content">
                    <h2>
                        About <b>Excel Row Counter</b>
                    </h2>
                    <p>
                        This tool <b>Excel Row Counter</b> is used by people who
                        want a quick way to determine the number of rows in an
                        Excel file.
                    </p>
                    <h2>
                        Who would use <b>Excel Row Counter</b>?
                    </h2>
                    <ul>
                        <li>
                            <b>Data Analysts:</b> Analysts who need to quickly
                            check the number of records in a dataset.
                        </li>
                        <li>
                            <b>Students:</b> Students who are working with data
                            and need to know the size of their datasets.
                        </li>
                        <li>
                            <b>Researchers:</b> Researchers who handle data
                            files and need a quick row count for their data
                            processing tasks.
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Page
