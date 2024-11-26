"use client"

import { ChangeEvent, useState } from "react"
import { signIn } from "next-auth/react"
import { toast } from "react-hot-toast"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { signup } from "@/lib/api/auth"
import { UserSignup } from "@/types"

const SignUpButton = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<UserSignup>({
    fullname: "",
    password: "",
    email: "",
    confirmPassword: "",
    user_id: 123
  })
  const [error, setError] = useState(false)

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    if (name === "password" && value.length <= 6) {
      setError(true);
    } else {
      setError(false);
    }
  };
  
  const router = useRouter()

  const onSignup = async () => {
    data.user_id = Math.floor(Math.random() * 10000)
    const res = await signup(data);
    if(res) {
      router.push("/login")
    } else {
      toast.error("Login failed")
    }
  }

  const goToLogin = () : void => {
    setIsLoading(true);
    router.push("/login")
  }
  

  return (
    <div className="w-full rounded-md bg-[#000000b3] p-14 backdrop-blur-lg">
      <h1 className="mb-4 text-center text-3xl font-bold">Sign up</h1>
      <input
        type="text"
        name="email"
        value={data.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full p-4 mb-4 rounded-md bg-[black] placeholder:text-[#8696A5]"
      />
      <input
        type="text"
        name="fullname"
        value={data.fullname}
        onChange={handleChange}
        placeholder="Full Name"
        className="w-full p-4 mb-4 rounded-md bg-[black] placeholder:text-[#8696A5]"
      />
      <input
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        placeholder="Your password"
        className="w-full p-4 mb-4 rounded-md bg-[#000] placeholder:text-[#8696A5]"
      />
      {error && <span className="text-sm text-[red]">Password must be more than 6 characters.</span>}
      <input
        type="password"
        name="confirmPassword"
        value={data.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm your password"
        className="w-full p-4 mb-4 rounded-md bg-[#000] placeholder:text-[#8696A5]"
      />
      <Button onClick={onSignup} className="w-full p-2 mb-4 rounded-md bg-[red] text-white">Sign up</Button>
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
        <Icons.google className="mr-2 h-4 w-4" aria-hidden="true" />
        Login with Google
      </Button>
      <div className="flex justify-center items-center gap-2 py-2 text-sm tracking-normal">
        <span>Already have an account?</span>
        <span onClick={goToLogin} className="hover:underline hover:text-[red] cursor-pointer">Log in</span>
      </div>
      { isLoading ?? 
          <Icons.spinner
            className="mr-2 h-4 w-4 animate-spin"
            aria-hidden="true"
          />
      }
    </div>
  )
}

export default SignUpButton
