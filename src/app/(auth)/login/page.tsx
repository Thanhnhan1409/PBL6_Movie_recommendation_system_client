import type { Metadata } from "next"
// import { redirect } from "next/navigation"

// import { getCurrentUser } from "@/lib/session"
import LoginButton from "@/components/login-button"
import * as React from "react"
import Image from 'next/image'

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
}

export default function LoginPage() {
  return (
    <section className="relative">
      <Image 
        src="https://assets.nflxext.com/ffe/siteui/vlv3/81d64f3c-9627-4741-8f74-422bf35f9f1d/web/VN-vi-20241104-TRIFECTA-perspective_ec239fd1-fe52-4f5e-89e7-96a454545347_large.jpg"
        alt="background"
        width={1920}
        height={1080}
        className="w-full h-full absolute inset-0 -z-20"
      />
      <div className="w-full h-full absolute inset-0 -z-10 bg-[grey] opacity-50"></div>
      <div className="container relative flex min-h-screen w-full max-w-xl flex-col items-center justify-center">
        <LoginButton />
      </div>
    </section>
  )
}
