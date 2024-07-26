import React from "react"

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div
            className="flex items-center justify-center
         h-full bg-gradient-to-r from-indigo-500 to-blue-500"
        >
            {children}
        </div>
    )
}

export default AuthLayout
