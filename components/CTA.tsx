import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Plus, Sparkles } from "lucide-react"

const Cta = () => {
    return (
        <section className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20 px-6">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />

            <div className="relative max-w-4xl mx-auto text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
                    <Sparkles className="w-4 h-4" />
                    Start learning your way
                </div>

                {/* Main heading */}
                <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                    Build a{" "}
                    <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Personalized
          </span>{" "}
                    Learning Companion
                </h1>

                {/* Description */}
                <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                    Pick a name, subject, voice, & personality - and start learning through voice conversations that feel natural
                    and fun.
                </p>

                {/* Illustration */}
                <div className="mb-12">
                    <Image
                        src="/images/ai-learning-companion.png"
                        alt="AI Learning Companion"
                        width={500}
                        height={400}
                        className="mx-auto rounded-2xl shadow-2xl"
                    />
                </div>

                {/* CTA Button */}
                <Link href="/companions/new">
                    <button className="group inline-flex cursor-pointer items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        <div className="flex items-center justify-center w-8 h-8 bg-white/20 rounded-full">
                            <Plus className="w-5 h-5" />
                        </div>
                        Build New Companion
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </Link>
            </div>
        </section>
    )
}

export default Cta
