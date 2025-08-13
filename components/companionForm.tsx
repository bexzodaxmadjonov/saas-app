"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { subjects } from "@/constants"
import { createCompanion } from "@/lib/actions/companion.actions"
import { Sparkles, User, BookOpen, MessageCircle, Clock } from "lucide-react"
import { redirect } from "next/navigation"

const formSchema = z.object({
    name: z.string().min(1, { message: "Companion name is required." }),
    subject: z.string().min(1, { message: "Subject is required." }),
    topic: z.string().min(1, { message: "Topic is required." }),
    voice: z.string().min(1, { message: "Voice is required." }),
    style: z.string().min(1, { message: "Style is required." }),
    duration: z.coerce.number().min(1, { message: "Duration is required." }),
})

const CompanionForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            subject: "",
            topic: "",
            voice: "",
            style: "",
            duration: 15,
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
            setIsSubmitting(true);
            const companion = await createCompanion(values)

            if (companion) {
                redirect(`/companions/${companion.id}`)
            } else {
                console.log("Failed to create a companion.")
                redirect("/")
            }
    }

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                    <Sparkles className="w-4 h-4" />
                    Create Your Companion
                </div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">
                    Build Your Learning Partner
                </h1>
                <p className="text-slate-600">
                    Customize your AI companion to match your learning style and preferences
                </p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center gap-2 text-slate-700 font-medium">
                                    <User className="w-4 h-4" />
                                    Companion Name
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="e.g., Alex, Maya, Professor Smith"
                                        {...field}
                                        className="border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center gap-2 text-slate-700 font-medium">
                                    <BookOpen className="w-4 h-4" />
                                    Subject
                                </FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger className="border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg">
                                            <SelectValue placeholder="Choose your subject" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {subjects.map((subject) => (
                                                <SelectItem value={subject} key={subject} className="capitalize">
                                                    {subject}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="topic"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-slate-700 font-medium">
                                    What should this companion teach?
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="e.g., Calculus derivatives, Spanish conversation, Python programming basics"
                                        {...field}
                                        className="border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg min-h-[100px]"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="voice"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-2 text-slate-700 font-medium">
                                        <MessageCircle className="w-4 h-4" />
                                        Voice Type
                                    </FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger className="border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg">
                                                <SelectValue placeholder="Select voice" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="male">Male Voice</SelectItem>
                                                <SelectItem value="female">Female Voice</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="style"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-slate-700 font-medium">
                                        Speaking Style
                                    </FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger className="border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg">
                                                <SelectValue placeholder="Choose style" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="formal">Formal & Professional</SelectItem>
                                                <SelectItem value="casual">Casual & Friendly</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="duration"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center gap-2 text-slate-700 font-medium">
                                    <Clock className="w-4 h-4" />
                                    Session Duration (minutes)
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="15"
                                        {...field}
                                        className="border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        disabled={isSubmitting}
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer py-3 rounded-lg font-semibold text-lg transition-colors duration-200"
                    >
                        {isSubmitting ? "Building..." : "Build Your Companion"}
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default CompanionForm
