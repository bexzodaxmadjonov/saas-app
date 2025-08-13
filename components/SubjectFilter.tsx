"use client"

import { useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { subjects } from "@/constants"
import { useRouter, useSearchParams } from "next/navigation"
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils"
import { Filter } from "lucide-react"

const SubjectFilter = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const query = searchParams.get("subject") || ""

    const [subject, setSubject] = useState(query)

    useEffect(() => {
        let newUrl = ""
        if (subject === "all") {
            newUrl = removeKeysFromUrlQuery({
                params: searchParams.toString(),
                keysToRemove: ["subject"],
            })
        } else {
            newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: "subject",
                value: subject,
            })
        }

        router.push(newUrl, { scroll: false })
    }, [subject, router, searchParams])

    return (
        <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <Select onValueChange={setSubject} value={subject}>
                <SelectTrigger className="w-48 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg">
                    <SelectValue placeholder="Filter by subject" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all" className="font-medium">
                        All Subjects
                    </SelectItem>
                    {subjects.map((subject) => (
                        <SelectItem value={subject} key={subject} className="capitalize">
                            {subject}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}

export default SubjectFilter
