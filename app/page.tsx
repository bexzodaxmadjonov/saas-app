import React from 'react'
import { Button } from "@/components/ui/button";
import CompanionCard from "@/components/companionCard";
import CompanionsList from "@/components/companionsList";
import Cta from "@/components/CTA";
import { recentSessions } from "@/constants";

const Page = () => {
  return (
    <main>
      <h1 className="text-2xl">Popular Companions</h1>
        <section className="home-section" >
            <CompanionCard
                id="1"
                name="Neura the Brainy Explorer"
                subject="Science"
                topic="Nueral Network of the Brain"
                duration={45}
                color="#E5D0FF"
            />
            <CompanionCard
                id="2"
                name="Countsy the Number Wizard"
                subject="Math"
                topic="Derivatives & Integrals"
                duration={30}
                color="#FFDA6E"
            />
            <CompanionCard
                id="3"
                name="Verba the Vocabulary Builder"
                subject="Lanaguage"
                topic="Emglish Linterature"
                duration={30}
                color="#BDE7FF"
            />
        </section>
        <section className="home-section">
            <CompanionsList
                title="Recently completed sessions"
                companions={recentSessions}
                classNames="w-2/3 max-lg:w-full"
            />
            <Cta/>
        </section>
        <br/>
    </main>
  )
}

export default Page