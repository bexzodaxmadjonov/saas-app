import Image from "next/image"
import Link from "next/link"
import { Clock, Play, Bookmark } from "lucide-react"

interface CompanionCardProps {
    id: string
    name: string
    topic: string
    duration: number
    color: string
    subject: string
}

const CompanionCard = ({ id, name, topic, duration, color, subject }: CompanionCardProps) => {
    return (
        <article className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group w-fit">
            {/* Header with subject and bookmark */}
            <div className="p-6 pb-4" style={{ backgroundColor: `${color}20` }}>
                <div className="flex justify-between items-start mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-slate-700 bg-white/80 backdrop-blur-sm capitalize">
            {subject}
          </span>
                    <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
                        <Bookmark className="w-4 h-4 text-slate-600" />
                    </button>
                </div>

                {/* Companion avatar */}
                <div className="flex justify-center mb-4">
                    <div
                        className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
                        style={{ backgroundColor: color }}
                    >
                        <Image src={`/icons/${subject}.svg`} alt={subject} width={32} height={32} />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 pt-2">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{name}</h3>
                <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                    <span className="font-medium">Topic:</span> {topic}
                </p>

                <div className="flex items-center gap-2 text-slate-500 text-sm mb-6">
                    <Clock className="w-4 h-4" />
                    <span>{duration} minutes</span>
                </div>

                {/* Launch button */}
                <Link href={`/companions/${id}`} className="block">
                    <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 group-hover:scale-105">
                        <Play className="w-4 h-4" />
                        Launch Lesson
                    </button>
                </Link>
            </div>
        </article>
    )
}

export default CompanionCard
