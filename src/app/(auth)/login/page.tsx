import type { Metadata } from "next"
import { redirect } from "next/navigation"

import { getCurrentUser } from "@/lib/session"
import LoginButton from "@/components/login-button"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { login } from "@/lib/api/auth"

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
}

export default async function LoginPage() {
  // const user = await getCurrentUser({
  //   username: "anh@gmail.com",
  //   password: "123456Aa"
  // })

  // console.log('user', user);

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
        <LoginButton />
    </section>
  )
}
