export const dynamic = "force-dynamic";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
    getUserCompanions,
    getUserSessions,
} from "@/lib/actions/companion.actions";
import Image from "next/image";
import CompanionsList from "@/components/companionsList";

const Page = async () => {
    const user = await currentUser();

    if (!user) redirect("/sign-in");

    const companions = await getUserCompanions(user.id);
    const sessionHistory = await getUserSessions(user.id);

    return (
        <main className="container mx-auto max-w-5xl p-6 space-y-8">
            {/* Profile Header */}
            <section className="flex justify-between gap-6 flex-wrap items-center bg-white dark:bg-neutral-900 rounded-2xl shadow-md p-6 border border-neutral-200 dark:border-neutral-800 transition">
                {/* Profile Info */}
                <div className="flex items-center gap-5">
                    <Image
                        src={user.imageUrl}
                        alt={user.firstName!}
                        width={110}
                        height={110}
                        className="rounded-full border-4 border-primary/20 shadow-sm"
                    />
                    <div className="flex flex-col gap-1">
                        <h1 className="font-bold text-3xl tracking-tight">
                            {user.firstName} {user.lastName}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            {user.emailAddresses[0].emailAddress}
                        </p>
                    </div>
                </div>

                {/* Stats */}
                <div className="flex gap-6 flex-wrap">
                    <StatCard
                        icon="/icons/check.svg"
                        label="Lessons Completed"
                        value={sessionHistory.length}
                        color="bg-green-100 text-green-700"
                    />
                    <StatCard
                        icon="/icons/cap.svg"
                        label="Companions Created"
                        value={companions.length}
                        color="bg-blue-100 text-blue-700"
                    />
                </div>
            </section>

            {/* Accordion */}
            <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="recent">
                    <AccordionTrigger className="text-xl cursor-pointer font-semibold hover:text-primary transition">
                        Recent Sessions
                    </AccordionTrigger>
                    <AccordionContent className="mt-3">
                        {sessionHistory.length ? (
                            <CompanionsList
                                title="Recent Sessions"
                                companions={sessionHistory}
                            />
                        ) : (
                            <EmptyState message="No recent sessions yet." />
                        )}
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="companions">
                    <AccordionTrigger className="text-xl cursor-pointer font-semibold hover:text-primary transition">
                        My Companions ({companions.length})
                    </AccordionTrigger>
                    <AccordionContent className="mt-3">
                        {companions.length ? (
                            <CompanionsList title="My Companions" companions={companions} />
                        ) : (
                            <EmptyState message="You haven’t created any companions yet." />
                        )}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </main>
    );
};

// Stat Card Component
const StatCard = ({
                      icon,
                      label,
                      value,
                      color,
                  }: {
    icon: string;
    label: string;
    value: number;
    color: string;
}) => (
    <div
        className={`flex items-center gap-4 rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 min-w-[180px] shadow-sm hover:shadow-md transition cursor-pointer`}
    >
        <div className={`p-3 rounded-full ${color}`}>
            <Image src={icon} alt={label} width={20} height={20} />
        </div>
        <div>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-sm text-muted-foreground">{label}</p>
        </div>
    </div>
);

// Empty State Component
const EmptyState = ({ message }: { message: string }) => (
    <div className="text-muted-foreground text-sm p-6 bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-dashed border-neutral-300 dark:border-neutral-700">
        {message}
    </div>
);

export default Page;
