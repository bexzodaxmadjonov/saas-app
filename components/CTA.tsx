import Image from "next/image";
import Link from "next/link";

const Cta = () => {
    return (
        <section className="cta-section">
            <button className="cta-badge">Start learning your way.</button>
            <h1>Build a Personalize Learning Companion</h1>
            <p>
                Pick a name, subject, voice, & personality
                - and start learning through voice conversations that feel natural and fun.
            </p>
            <Image src="/images/cta.svg" alt="cta"
            width={400}
            height={400}
            />
            <button className="btn-primary">
                <Image
                    src="/icons/plus.svg"
                    alt="plus"
                    width={15}
                    height={15}
                />
                <Link href="/companions/new">
                    <h2>Build New Companion</h2>
                </Link>
            </button>
        </section>
    )
}

export default Cta;