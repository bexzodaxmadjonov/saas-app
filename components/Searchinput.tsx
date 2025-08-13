"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils"
import { Search, X } from "lucide-react"

const SearchInput = () => {
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()

    const query = searchParams.get("topic") || ""
    const [searchQuery, setSearchQuery] = useState(query)

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchQuery) {
                const newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: "topic",
                    value: searchQuery,
                })
                router.push(newUrl, { scroll: false })
            } else {
                if (pathname === "/companions") {
                    const newUrl = removeKeysFromUrlQuery({
                        params: searchParams.toString(),
                        keysToRemove: ["topic"],
                    })
                    router.push(newUrl, { scroll: false })
                }
            }
        }, 500)

        return () => clearTimeout(delayDebounceFn)
    }, [searchQuery, router, searchParams, pathname])

    const clearSearch = () => {
        setSearchQuery("")
    }

    return (
        <div className="relative flex items-center">
            <div className="relative flex items-center w-full max-w-md">
                <Search className="absolute left-3 w-4 h-4 text-slate-400" />
                <input
                    placeholder="Search companions..."
                    className="w-full pl-10 pr-10 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                    <button
                        onClick={clearSearch}
                        className="absolute right-3 p-1 hover:bg-slate-100 rounded-full transition-colors"
                    >
                        <X className="w-4 h-4 text-slate-400" />
                    </button>
                )}
            </div>
        </div>
    )
}

export default SearchInput
