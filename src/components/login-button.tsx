"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { toast } from "react-hot-toast"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { getCurrentUser } from "@/lib/session"
import { redirect, useRouter } from "next/navigation"
import { login } from "@/lib/api/auth"

const LoginButton = () => {
  const [isLoading, setIsLoading] = useState(false)

  const loginWithGoogle = async () => {
    setIsLoading(true)
    try {
      await signIn("google")
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      )
    } finally {
      setTimeout(() => setIsLoading(false), 2500)
    }
  }
  
  const router = useRouter()
  const onLogin = async () => {
    const res = await login({
      username: "anh@gmail.com",
      password: "123456Aa"
    })
    if(res) {
      router.push("/")
    } else {
      toast.error("Login failed")
    }
  }

  return (
    <div className="w-full rounded-md bg-zinc-800/25 p-14 backdrop-blur-lg">
      <h1 className="mb-4 text-center text-3xl font-bold">Sign in</h1>
      <input type="text" placeholder="Email" className="w-full p-2 mb-4 rounded-md text-[black]" />
      <input type="password" placeholder="Your password" className="w-full p-2 mb-4 rounded-md text-[black]" />
      <Button onClick={onLogin} className="w-full p-2 mb-4 rounded-md bg-[red] text-white">Login</Button>
      <div className="relative h-[25px]">
        <span className="absolute top-[-13px] left-[48%] bg-[#1B1B1C]">or</span>
        <div className="w-full h-[1px] bg-white"></div>
      </div>
      <Button
        aria-label="Login with Google"
        variant="brand"
        className="w-full bg-white text-[black] hover:bg-[red] hover:text-white flex items-center gap-2"
        onClick={isLoading ? undefined : loginWithGoogle}
        disabled={isLoading}
      >
        {isLoading ? (
          <Icons.spinner
            className="mr-2 h-4 w-4 animate-spin"
            aria-hidden="true"
          />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" aria-hidden="true" />
        )}
        Login with Google
      </Button>
    </div>
  )
}

export default LoginButton
