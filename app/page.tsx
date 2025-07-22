import React from 'react'
import { Button } from "@/components/ui/button";
import CompanionCard from "@/components/companionCard";
import CompanionsList from "@/components/companionsList";
import Cta from "@/components/CTA";
import { recentSessions } from "@/constants";
import {getAllCompanions, getRecentHistory} from "@/lib/actions/companion.actions";
import {getSubjectColor} from "@/lib/utils";

const Page = async () => {
    const companions = await getAllCompanions({ limit: 3});
    const recentSessionsCompanions = await getRecentHistory(10)
  return (
    <main>
      <h1 className="text-2xl">Popular Companions</h1>
        <section className="home-section" >
            {companions.map((companion) => (
            <CompanionCard
                key={companion.id}
                {...companion}
                color={getSubjectColor(companion.subject)}
            />
            ))}
        </section>
        <section className="home-section">
            <CompanionsList
                title="Recently completed sessions"
                companions={recentSessionsCompanions}
                classNames="w-2/3 max-lg:w-full"
            />
            <Cta/>
        </section>
        <br/>
    </main>
  )
}

export default Page