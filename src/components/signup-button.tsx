"use client"

import { ChangeEvent, useEffect, useState } from "react"
import { signIn } from "next-auth/react"
import { toast } from "react-hot-toast"

import { Icons } from "@/components/icons"
import { useRouter } from "next/navigation"
import { signup } from "@/lib/api/auth"
import { UserSignup } from "@/types"
import "./styles/sign-up.css"
import { notification, DatePicker, Input, Form, Button } from 'antd';

const SignUpButton = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<UserSignup>({
    fullname: "",
    password: "",
    email: "",
    confirmPassword: "",
    age: 0
  })
  const router = useRouter()

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
  

  const onSignup = async () => {
    try {
      setIsLoading(true);
      const res = await signup(data);
      router.push("/login");
      notification.success({
        message: 'Sign up successfully!',
        description: res?.data?.data?.detail ?? 'Sign up successfully!',
      });
    } catch (error) {
      // setErrorMessage(error?.response?.data?.detail ?? 'Sign up failed!');
      notification.error({
        message: 'Sign up failed!',
        description: error?.response?.data?.detail ?? 'Sign up failed!',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const goToLogin = () : void => {
    setIsLoading(true);
    router.push("/login")
  }
  
  const onChange = (date: any, dateString: string | undefined) => {
    setData((prevData) => ({
      ...prevData,
      age: new Date().getFullYear() - new Date(dateString?? '').getFullYear()
    }));
  }

  return (
    <div className="w-full rounded-md bg-[#000000b3] p-10 backdrop-blur-lg sign-up">
      <h1 className="mb-4 text-center text-3xl font-bold">Sign up</h1>
      {/* <input
        type="text"
        name="email"
        value={data.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full p-4 mb-4 rounded-md bg-[black] placeholder:text-[#8696A5]"
      />
      <Input placeholder="Outlined" className="w-full p-4 mb-4 bg-[black] text-[#8696A5] hover:bg-[black] hover:outline-none focus:bg-[black] border-0 " />
      <input
        type="text"
        name="fullname"
        value={data.fullname}
        onChange={handleChange}
        placeholder="Full Name"
        className="w-full p-4 mb-4 rounded-md bg-[black] placeholder:text-[#8696A5]"
      />
      <DatePicker className="w-full p-4 mb-4 bg-[black] text-[#8696A5] hover:bg-[black] hover:outline-none focus:bg-[black]" onChange={onChange} />
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
      </div> */}
      <Form
        name="data"
        initialValues={{ remember: true }}
        onFinish={onSignup}
        autoComplete="off"
      >
        <Form.Item
          name="email"
          rules={[{ required: true, type: 'email', message: 'Please input your email!' }]}
        >
          <Input
            placeholder="Email"
            className="w-full p-4 bg-[black] text-[#8696A5] placeholder:text-[#8696A5] hover:bg-[black] hover:outline-none focus:bg-[black] border-0"
            value={data.email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setData((prevData) => ({ ...prevData, email: e.target.value }))}
          />
        </Form.Item>
        <Form.Item
          name="fullname"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input
            placeholder="Full name"
            className="w-full p-4 bg-[black] text-[#8696A5] placeholder:text-[#8696A5] hover:bg-[black] hover:outline-none focus:bg-[black] border-0"
            value={data.fullname}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setData((prevData) => ({ ...prevData, fullname: e.target.value }))}
          />
        </Form.Item>
        <Form.Item
          name="age"
          rules={[{ required: true, message: 'Please input your birthday!' }]}
        >
          <DatePicker
            placeholder="Your birthday"
            className="w-full p-4 bg-[black] text-[#8696A5] placeholder:text-[#8696A5] hover:bg-[black] hover:outline-none focus:bg-[black] border-0"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setData((prevData) => ({ ...prevData, age: new Date().getFullYear() - new Date(e.target.value?? '').getFullYear() }))}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            placeholder="Password"
            className="w-full p-4 bg-[black] text-[#8696A5] placeholder:text-[#8696A5] hover:bg-[black] hover:outline-none focus:bg-[black] border-0"
            value={data.password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setData((prevData) => ({ ...prevData, password: e.target.value }))}  
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          rules={[{ required: true, message: 'Please input your confirm password!' }]}
        >
          <Input.Password
            placeholder="Confirm Password"
            className="w-full p-4 bg-[black] text-[#8696A5] placeholder:text-[#8696A5] hover:bg-[black] hover:outline-none focus:bg-[black] border-0"
            value={data.confirmPassword}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setData((prevData) => ({ ...prevData, confirmPassword: e.target.value }))}  
          />
        </Form.Item>
        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" className="inline-block w-full text-white bg-[red] hover:outline-none focus:bg-[black] border-0 hover:bg-[#000] hover:text-[#8696A5]">
            Sign up
          </Button>
        </Form.Item>
      </Form>
      <div className="relative h-[25px]">
        <span className="absolute top-[-13px] left-[48%] bg-[#1B1B1C]">or</span>
        <div className="w-full h-[1px] bg-white"></div>
      </div>
      <Button
        aria-label="Login with Google"
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
