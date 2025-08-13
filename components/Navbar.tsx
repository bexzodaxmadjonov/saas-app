"use client"

import Link from "next/link"
import Image from "next/image"
import NavItems from "@/components/NavItems"
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

const Page = () => {
    return (
        <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-4">
                <Link href="/">
                    <div className="flex items-center gap-2.5 cursor-pointer">
                        <Image src="/images/gapchi.png" alt="logo" width={90} height={90} />
                    </div>
                </Link>

                <div className="flex items-center gap-8">
                    <NavItems />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <SignedOut>
                    <div className="flex gap-4">
                        <SignInButton>
                            <button className="btn-signin">Sign In</button>
                        </SignInButton>
                    </div>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </div>
    )
}

export default Page
