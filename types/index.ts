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

export interface HomeProps {
    searchParams: FilterProps
}

export interface ToolProps {
    name: string
    categoryId: number
    desc: string
    slug: string
}

export interface ResultAlertProps {
    showAlert: boolean
    isEmpty: boolean
    message: string
    hideAlert: () => void
    alertDiv: React.RefObject<HTMLDivElement>
}

export interface SubmitButtonProps {
    handleClick: MouseEventHandler<HTMLButtonElement> //Correct type for handler.
    text: string
    type?: "button" | "submit" | "reset"
}
