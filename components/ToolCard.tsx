"use client"

import Link from "next/link"
import CustomButton from "./CustomButton"
import { AnimatePresence, motion } from "framer-motion"
import { categoriesOfTools } from "@/constants"
import { ToolProps } from "@/types"
import { AiOutlineFileImage, AiOutlineFileText } from "react-icons/ai"
import { BsGlobeAmericas } from "react-icons/bs"

interface ToolCardProps {
    tool: ToolProps
}

const ToolCard = ({ tool }: ToolCardProps) => {
    const { name, categoryId, desc, slug } = tool

    return (
        <AnimatePresence>
            !loading && (
            <motion.div
                key={slug}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <Link
                    href={`/tools/${categoriesOfTools[categoryId]["value"]}/${slug}`}
                    as={`/tools/${categoriesOfTools[categoryId]["value"]}/${slug}`}
                >
                    <div className="car-card group h-full">
                        <div className="car-card__content">
                            <h2 className="car-card__content-title">
                                {categoriesOfTools[categoryId]["title"]}
                            </h2>
                        </div>

                        <p className="flex mt-6 text-[32px] leading-[38px] font-extrabold">
                            {name}
                        </p>

                        <div className="relative w-full my-3">
                            {categoryId === 1 && (
                                <AiOutlineFileText
                                    className="text-8xl
                                                mx-auto"
                                />
                            )}
                            {categoryId === 2 && (
                                <AiOutlineFileImage
                                    className="text-8xl
                                                mx-auto"
                                />
                            )}
                            {categoryId === 3 && (
                                <BsGlobeAmericas
                                    className="text-8xl
                                                mx-auto"
                                />
                            )}
                        </div>

                        <div className="relative flex w-full mt-2">
                            <div className="group-hover:invisible w-full">
                                <p className="text-grey">{desc}</p>
                            </div>

                            <div className="car-card__btn-container">
                                <CustomButton
                                    title="Use Tool"
                                    containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
                                    textStyles="text-white text-[14px] leading-[17px] font-bold"
                                    rightIcon="/right-arrow.svg"
                                />
                            </div>
                        </div>
                    </div>
                </Link>
            </motion.div>
            )
        </AnimatePresence>
    )
}

export default ToolCard
