"use client"

import { useEffect, useState } from "react"
import { signIn } from "next-auth/react"
import { toast } from "react-hot-toast"

import { Icons } from "@/components/icons"
import { useRouter } from "next/navigation"
import { login } from "@/lib/api/auth"
import { UserLogin } from "@/types"
import "./styles/sign-up.css"
import { Form, Input, Button } from "antd"
import { useLoadingStore } from "@/stores/loading"

const LoginButton = () => {
  // const [isLoading, setIsLoading] = useState(false)
  const loadingStore = useLoadingStore()
  const [form] = Form.useForm()

  useEffect(() => {
    loadingStore.setIsLoading(false);
  }, [])

  const loginWithGoogle = async () => {
    loadingStore.setIsLoading(true)
    try {
      await signIn("google")
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      )
    } finally {
      setTimeout(() => loadingStore.setIsLoading(false), 1000)
    }
  }
  
  const router = useRouter()
  const onLogin = async (record: UserLogin) => {
    try {
      loadingStore.setIsLoading(true);
      await login(record);
      router.push("/")
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => loadingStore.setIsLoading(false), 1000)
    }
  }

  const goToSignup = () : void => {
    loadingStore.setIsLoading(true);
    router.push("/signup")
  }
  
  return (
    <div className="w-full rounded-md bg-[#000000b3] p-14 backdrop-blur-lg">
      <h1 className="mb-4 text-center text-3xl font-bold">Sign in</h1>
      <Form
        name="data"
        initialValues={{ remember: true }}
        onFinish={onLogin}
        form={form}
        autoComplete="off"
      >
        <Form.Item
          name="username"
          rules={[{ required: true, type: 'email', message: 'Please input your email!' }]}
        >
          <Input
            placeholder="Email"
            className="w-full p-4 bg-[black] text-[#8696A5] placeholder:text-[#8696A5] hover:bg-[black] hover:outline-none focus:bg-[black] border-0"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            placeholder="Password"
            className="w-full p-4 bg-[black] text-[#8696A5] placeholder:text-[#8696A5] hover:bg-[black] hover:outline-none focus:bg-[black] border-0"
          />
        </Form.Item>
        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" size="large" className="inline-block w-full text-white bg-[red] hover:outline-none focus:bg-[black] border-0 hover:bg-[#000] hover:text-[#8696A5]">
            Sign in
          </Button>
        </Form.Item>
      </Form>
      <div className="relative h-[25px]">
        <span className="absolute top-[-13px] left-[48%] bg-[#1B1B1C]">or</span>
        <div className="w-full h-[1px] bg-white"></div>
      </div>
      <Button
        aria-label="Login with Google"
        size="large"
        className="w-full bg-white text-[black] hover:bg-[red] hover:text-white flex items-center gap-2"
        onClick={loadingStore.isLoading ? undefined : loginWithGoogle}
        disabled={loadingStore.isLoading}
      >
        <Icons.google className="mr-2 h-4 w-4" aria-hidden="true" />
        Login with Google
      </Button>
      <div className="flex justify-center items-center gap-2 py-2 text-sm tracking-normal">
        <span>Don&apos;t have an account?</span>
        <span onClick={goToSignup} className="hover:underline hover:text-[red] cursor-pointer">Create an account</span>
      </div>
      { loadingStore.isLoading ?? 
          <Icons.spinner
            className="mr-2 h-4 w-4 animate-spin"
            aria-hidden="true"
          />
      }
    </div>
  )
}

export default LoginButton
