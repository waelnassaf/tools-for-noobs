import React, { MouseEventHandler } from "react"

export interface OptionProps {
    title: string
    value: string
    catID: number
}

export interface CustomFilterProps {
    title: string
    options: OptionProps[]
}

export interface ShowMoreProps {
    pageNumber: number
    isNext: boolean
}

export interface CustomButtonProps {
    isDisabled?: boolean
    btnType?: "button" | "submit"
    containerStyles?: string
    textStyles?: string
    title: string
    rightIcon?: string
    handleClick?: MouseEventHandler<HTMLButtonElement>
}

export interface SearchToolProps {
    selected: string
    setSelected: (tool: string) => void
}

export interface SearchBarProps {
    setTool: (tool: string) => void
}

export interface FilterProps {
    sq?: string
    cat?: string
    limit?: number
}

export interface SearchParamsProps {
    searchParams: FilterProps
}

export interface ToolProps {
    name: string
    slug: string
    desc: string
    categoryId: number
}

export interface ResultAlertProps {
    showAlert: boolean
    isEmpty?: boolean
    message: string
    hideAlert: () => void
    alertDiv: React.RefObject<HTMLDivElement>
}

export interface SubmitButtonProps {
    handleClick?: MouseEventHandler<HTMLButtonElement> //Correct type for handler.
    text: string
    type?: "button" | "submit" | "reset"
    className?: string
}

export interface User {
    id: string
    name: string
    email: string
    password: string
}
