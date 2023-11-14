import { SubmitButtonProps } from "@/types"

const SubmitButton = ({
    handleClick,
    text,
    type = "button",
}: SubmitButtonProps) => {
    return (
        <button
            className="btn btn-neutral mt-5"
            onClick={handleClick}
            type={type}
        >
            {text}
        </button>
    )
}

export default SubmitButton
