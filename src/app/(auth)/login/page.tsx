import type { Metadata } from "next"
import { redirect } from "next/navigation"

import { getCurrentUser } from "@/lib/session"
import LoginButton from "@/components/login-button"
import * as React from "react"

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
}

export default async function LoginPage() {
  const user = await getCurrentUser({
    username: "anh@gmail.com",
    password: "123456Aa"
  })

  console.log('user', user);

  // // if (!user) {
  // //   redirect("/login")
  // // } else {
  // //   redirect("/")
  // // }
  // React.useEffect(() => {
  //   console.log('user', user);

  // },[])
  return (
    <section className="container flex min-h-screen w-full max-w-xl flex-col items-center justify-center">
      <div className="w-full rounded-md bg-zinc-800/25 p-14 backdrop-blur-lg">
        <h1 className="mb-4 text-center text-3xl font-bold">Sign in</h1>
        <LoginButton />
      </div>
    </section>
  )
}
