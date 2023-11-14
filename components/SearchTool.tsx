"use client"

import { Fragment, useState } from "react"
import Link from "next/link"
import { Combobox, Transition } from "@headlessui/react"
import { FaHammer } from "react-icons/fa"
import { SearchToolProps } from "@/types"
import { tools } from "@/constants"
import { getSearchParam } from "@/utils"

const SearchTool = ({ selected, setSelected }: SearchToolProps) => {
    const [query, setQuery] = useState("")

    const filteredTools =
        query === ""
            ? tools
            : tools.filter((item) =>
                  item
                      .toLowerCase()
                      .replace(/\s+/g, "")
                      .includes(query.toLowerCase().replace(/\s+/g, ""))
              )

    // @ts-ignore
    // @ts-ignore
    return (
        <div className="search-manufacturer">
            <Combobox value={selected} onChange={setSelected}>
                <div className="relative w-full">
                    {/* Button for the combobox. Click on the icon to see the complete dropdown */}
                    <Combobox.Button className="absolute top-[14px]">
                        <FaHammer
                            width={25}
                            height={25}
                            className="absolute w-[20px] h-[20px] ml-4 opacity-50"
                        />
                    </Combobox.Button>

                    {/* Input field for searching */}
                    {/* (!) Non-null assertion operator*/}
                    <Combobox.Input
                        className="search-text__input"
                        placeholder="Line Counter..."
                        displayValue={(sQuery: string) =>
                            sQuery || getSearchParam("sq")!
                        }
                        autoComplete={"off"}
                        onChange={(e) => setQuery(e.target.value)}
                    />

                    {/* Transition for displaying the options */}
                    <Transition
                        as={Fragment} // group multiple elements without introducing an additional DOM node i.e., <></>
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery("")} // Reset the search query after the transition completes
                    >
                        <Combobox.Options
                            className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                            static
                        >
                            <Combobox.Option
                                value={query}
                                className="search-manufacturer__option text-black"
                            >
                                <span>
                                    Search for{" "}
                                    <b className="font-bold">{query}</b>
                                </span>
                            </Combobox.Option>

                            {filteredTools.length !== 0 ? (
                                filteredTools.map((item) => (
                                    <Combobox.Option
                                        key={item}
                                        className={({ active }) =>
                                            `relative search-manufacturer__option ${
                                                active
                                                    ? "bg-primary-blue text-white"
                                                    : "text-gray-900"
                                            }`
                                        }
                                        value={item}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${
                                                        selected
                                                            ? "font-medium"
                                                            : "font-normal"
                                                    }`}
                                                >
                                                    {item}
                                                </span>

                                                {/* Show an active blue background color if the option is selected */}
                                                {selected ? (
                                                    <span
                                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                            active
                                                                ? "text-white"
                                                                : "text-pribg-primary-purple"
                                                        }`}
                                                    ></span>
                                                ) : null}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            ) : (
                                <span></span>
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    )
}

export default SearchTool
