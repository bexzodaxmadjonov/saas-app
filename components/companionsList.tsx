import { Table, TableBody, TableFooter, TableHead, TableRow,
TableCell, TableHeader, TableCaption} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { getSubjectColor } from "@/lib/utils";

interface companionsListProps {
    title: string,
    companions?: Companion[],
    classNames: string,
}

const CompanionsList = ({ title, companions, classNames } : companionsListProps ) => {
    return (
        <article className={cn('componion-list', classNames)} style={{ border: "2px solid black", padding: 18, borderRadius: 18}}>
            <h2 className="font-bold text-2xl">{title}</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-2/3 text-lg">Lessons</TableHead>
                        <TableHead className="text-lg">Subject</TableHead>
                        <TableHead className="text-lg text-right">Duration</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="gap-8">
                    {companions?.map((companion) => (
                        <TableRow key={companion.id}>
                            <TableCell>
                                <Link href={`/companions/${companion.id}`}>
                                    <div className="flex items-center gap-2">
                                        <div className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden"
                                        style={{ backgroundColor: getSubjectColor(companion.subject)}}>
                                            <Image
                                                src={`/icons/${companion.subject}.svg`}
                                                alt={companion.subject}
                                                width={35}
                                                height={35}
                                            />
                                        </div>
                                        <div className="flex-col">
                                            <h2 className="text-lg font-bold">{companion.name}</h2>
                                            <p className="text-sm">Topic: {companion.topic}</p>
                                        </div>
                                    </div>
                                </Link>
                            </TableCell>
                            <TableCell>
                                <button className="btn-primary w-fit max-md:hidden">{companion.subject}</button>
                                <div className="flex size-[50px] items-center justify-center rounded-lg p-2 md:hidden"
                                style={{ backgroundColor: getSubjectColor(companion.subject)}}>
                                    <Image
                                        src={`/icons/${companion.subject}.svg`}
                                        alt={companion.subject}
                                        width={20}
                                        height={20}
                                    />
                                </div>
                            </TableCell>
                            <TableCell className="text-right items-center">
                                <h2 className="text-lg max-md:hidden">{companion.duration} mins</h2>
                                <div className="flex size-[50px] items-center justify-center rounded-lg gap-1 md:hidden">
                                    <h2 className="text-lg">{companion.duration}</h2>
                                    <Image
                                        src={`/icons/clock.svg`}
                                        alt={companion.subject}
                                        width={20}
                                        height={20}
                                    />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </article>
    )
}

export default CompanionsList;