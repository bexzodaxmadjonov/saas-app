"use client";

import { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { subjects } from "@/constants";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";


const SubjectFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get("subject") || "";

    const [subject, setSubject] = useState(query);

    useEffect(() => {
        let newUrl = "";
        if(subject === "all") {
            newUrl = removeKeysFromUrlQuery({
                params: searchParams.toString(),
                keysToRemove: ["subject"],
            });
        } else {
            newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: "subject",
                value: subject,
            });
        }

        router.push(newUrl, { scroll: false });
    }, [subject])
    return (
        <Select onValueChange={setSubject} value={subject}>
            <SelectTrigger className="outline-none border border-black rounded-lg">
                <SelectValue placeholder="Select Subject" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="all">All Subjects</SelectItem>
                    {subjects.map((subject) => (
                        <SelectItem
                            value={subject}
                            key={subject}
                            className="capitalize"
                        >
                            {subject}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default SubjectFilter;