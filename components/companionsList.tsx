import { Table, TableBody, TableHead, TableRow, TableCell, TableHeader } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"
import { getSubjectColor } from "@/lib/utils"
import { Clock, Play } from "lucide-react"
import type { Companion } from "@/types"

interface CompanionsListProps {
    title: string
    companions?: Companion[]
    classNames?: string
}

const CompanionsList = ({ title, companions, classNames }: CompanionsListProps) => {
    return (
        <div className={cn("bg-white rounded-2xl shadow-lg overflow-hidden", classNames)}>
            <div className="p-6 border-b border-slate-100">
                <h2 className="font-bold text-2xl text-slate-900">{title}</h2>
            </div>

            <Table>
                <TableHeader>
                    <TableRow className="border-slate-100">
                        <TableHead className="text-slate-600 font-medium">Companion</TableHead>
                        <TableHead className="text-slate-600 font-medium">Subject</TableHead>
                        <TableHead className="text-slate-600 font-medium text-right">Duration</TableHead>
                        <TableHead className="w-20"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {companions?.map((companion) => (
                        <TableRow key={companion.id} className="border-slate-100 hover:bg-slate-50 transition-colors">
                            <TableCell className="py-4">
                                <div className="flex items-center gap-4">
                                    <div
                                        className="w-12 h-12 flex items-center justify-center rounded-xl shadow-sm"
                                        style={{ backgroundColor: getSubjectColor(companion.subject) }}
                                    >
                                        <Image
                                            src={`/icons/${companion.subject}.svg`}
                                            alt={companion.subject}
                                            width={24}
                                            height={24}
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900">{companion.name}</h3>
                                        <p className="text-sm text-slate-500">Topic: {companion.topic}</p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 capitalize">
                  {companion.subject}
                </span>
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-1 text-slate-600">
                                    <Clock className="w-4 h-4" />
                                    <span>{companion.duration} min</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Link href={`/companions/${companion.id}`}>
                                    <button className="flex items-center justify-center cursor-pointer w-10 h-10 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transition-colors">
                                        <Play className="w-4 h-4 ml-0.5" />
                                    </button>
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default CompanionsList
