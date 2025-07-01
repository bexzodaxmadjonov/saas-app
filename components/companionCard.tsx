import Image from "next/image";
import Link from "next/link";

interface CompanionCardProps {
    id: string;
    name: string;
    topic: string;
    duration: number;
    color: string;
    subject: string;
}

const CompanionCard = ({ id, name, topic, duration, color, subject } : CompanionCardProps) => {
    return (
        <article className="companion-card" style={{ backgroundColor: color }}>
            <div className="flex justify-between items-center">
                <div className="subject-badge">
                    {subject}
                </div>
                <button className="companion-bookmark">
                    <Image src="/icons/bookmark.svg" alt="bookmark" width={12.5} height={15} />
                </button>
            </div>

            <h2 className="text-2xl font-bold">{name}</h2>
            <p className="text-sm">Topic: {topic}</p>
            <div className="flex gap-1">
                <Image src="/icons/clock.svg" alt="clock" width={12.5} height={15} />
                <p className="text-sm">{duration} minutes duration</p>
            </div>
            <Link href={`/companions/${id}`} className="w-full">
                <button className="btn-primary w-full justify-center">
                    Launch Lesson
                </button>
            </Link>
        </article>
    )
}

export default CompanionCard;