"use client"

import { getSubjectColor, cn, configureAssistant } from "@/lib/utils"
import { useState, useEffect } from "react"
import { vapi } from "@/lib/vapi.sdk"
import Image from "next/image"
import { addToSessionHistory } from "@/lib/actions/companion.actions"
import { Mic, MicOff, Phone, PhoneOff } from "lucide-react"
import type { CompanionComponentProps, SavedMessage, Message } from "@/types"

enum CallStatus {
    INACTIVE = "INACTIVE",
    CONNECTING = "CONNECTING",
    ACTIVE = "ACTIVE",
    FINISHED = "FINISHED",
}

const CompanionComponent = ({
                                companionId,
                                name,
                                topic,
                                subject,
                                username,
                                userImage,
                                style,
                                voice,
                            }: CompanionComponentProps) => {
    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE)
    const [isSpeaking, setIsSpeaking] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [messages, setMessages] = useState<SavedMessage[]>([])

    useEffect(() => {
        const onCallStart = () => setCallStatus(CallStatus.ACTIVE)
        const onCallEnd = () => {
            setCallStatus(CallStatus.FINISHED)
            addToSessionHistory(companionId)
        }
        const onMessage = (message: Message) => {
            if (message.type === "transcript" && message.transcriptType === "final") {
                const newMessage = { role: message.role, content: message.transcript }
                setMessages((prev) => [newMessage, ...prev])
            }
        }
        const onSpeechStart = () => setIsSpeaking(true)
        const onSpeechEnd = () => setIsSpeaking(false)
        const onError = (error: Error) => console.log("Error", error)

        vapi.on("call-start", onCallStart)
        vapi.on("call-end", onCallEnd)
        vapi.on("message", onMessage)
        vapi.on("speech-start", onSpeechStart)
        vapi.on("speech-end", onSpeechEnd)
        vapi.on("error", onError)

        return () => {
            vapi.off("call-start", onCallStart)
            vapi.off("call-end", onCallEnd)
            vapi.off("message", onMessage)
            vapi.off("speech-start", onSpeechStart)
            vapi.off("speech-end", onSpeechEnd)
            vapi.off("error", onError)
        }
    }, [companionId])

    const toggleMicrophone = () => {
        const isMuted = vapi.isMuted()
        vapi.setMuted(!isMuted)
        setIsMuted(!isMuted)
    }

    const handleCall = async () => {
        setCallStatus(CallStatus.CONNECTING)
        setMessages([])

        const assistantOverrides = {
            variableValues: { subject, topic, style },
            clientMessages: ["transcript"],
            serverMessages: [],
        }
        // eslint-disable-next-line
        vapi.start(configureAssistant(voice, style), assistantOverrides as any)
    }

    const handleDisconnect = () => {
        setCallStatus(CallStatus.FINISHED)
        vapi.stop()
    }

    return (
        <div className="flex flex-col h-[70vh] bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6">
                <div className="flex gap-8 max-sm:flex-col">
                    {/* Companion Avatar */}
                    <div className="flex flex-col items-center gap-4">
                        <div
                            className="relative w-32 h-32 rounded-full flex items-center justify-center shadow-lg"
                            style={{ backgroundColor: getSubjectColor(subject) }}
                        >
                            <div
                                className={cn(
                                    "absolute transition-opacity duration-1000",
                                    callStatus === CallStatus.FINISHED || callStatus === CallStatus.INACTIVE
                                        ? "opacity-100"
                                        : "opacity-0",
                                    callStatus === CallStatus.CONNECTING && "opacity-100 animate-pulse",
                                )}
                            >
                                <Image
                                    src={`/icons/${subject}.svg`}
                                    alt={subject}
                                    width={60}
                                    height={60}
                                />
                            </div>

                            <div
                                className={cn(
                                    "absolute transition-opacity duration-1000",
                                    callStatus === CallStatus.ACTIVE ? "opacity-100" : "opacity-0",
                                )}
                            >
                                <div className={cn("w-24 h-24 rounded-full border-4 border-white/30", isSpeaking && "animate-pulse")}>
                                    <div className="w-full h-full rounded-full bg-white/20 flex items-center justify-center">
                                        <div className="w-12 h-12 rounded-full bg-white/40 animate-ping" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h2 className="font-bold text-2xl text-slate-900">{name}</h2>
                    </div>

                    {/* User Section */}
                    <div className="flex-1 flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <Image
                                src={userImage || "/placeholder.svg?height=60&width=60&query=user avatar"}
                                alt={username}
                                width={60}
                                height={60}
                                className="rounded-full border-2 border-white shadow-md"
                            />
                            <h3 className="font-bold text-xl text-slate-900">{username}</h3>
                        </div>

                        {/* Controls */}
                        <div className="flex gap-3">
                            <button
                                className={cn(
                                    "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200",
                                    callStatus !== CallStatus.ACTIVE
                                        ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                                        : isMuted
                                            ? "bg-red-100 text-red-700 hover:bg-red-200"
                                            : "bg-green-100 text-green-700 hover:bg-green-200",
                                )}
                                onClick={toggleMicrophone}
                                disabled={callStatus !== CallStatus.ACTIVE}
                            >
                                {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                                <span className="max-sm:hidden">{isMuted ? "Unmute" : "Mute"}</span>
                            </button>

                            <button
                                className={cn(
                                    "flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all duration-200 text-white",
                                    callStatus === CallStatus.ACTIVE
                                        ? "bg-red-600 hover:bg-red-700"
                                        : "bg-indigo-600 hover:bg-indigo-700",
                                    callStatus === CallStatus.CONNECTING && "animate-pulse",
                                )}
                                onClick={callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall}
                            >
                                {callStatus === CallStatus.ACTIVE ? (
                                    <>
                                        <PhoneOff className="w-4 h-4" />
                                        End Session
                                    </>
                                ) : (
                                    <>
                                        <Phone className="w-4 h-4" />
                                        {callStatus === CallStatus.CONNECTING ? "Connecting..." : "Start Session"}
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Transcript Section */}
            <div className="flex-1 relative">
                <div className="h-full overflow-y-auto p-6 space-y-4">
                    {messages.length === 0 ? (
                        <div className="flex items-center justify-center h-full text-slate-500">
                            <p>Start a session to see the conversation transcript</p>
                        </div>
                    ) : (
                        messages.map((message, index) => {
                            const isAssistant = message.role === "assistant"
                            return (
                                <div
                                    key={index}
                                    className={cn("flex gap-3 p-3 rounded-lg", isAssistant ? "bg-slate-50" : "bg-indigo-50")}
                                >
                                    <div
                                        className={cn(
                                            "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium",
                                            isAssistant ? "bg-slate-200 text-slate-700" : "bg-indigo-200 text-indigo-700",
                                        )}
                                    >
                                        {isAssistant ? name.charAt(0) : username.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-sm text-slate-600 mb-1">
                                            {isAssistant ? name.split(" ")[0] : username}
                                        </p>
                                        <p className="text-slate-900">{message.content}</p>
                                    </div>
                                </div>
                            )
                        })
                    )}
                </div>

                {/* Fade effect at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />
            </div>
        </div>
    )
}

export default CompanionComponent
