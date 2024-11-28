"use client"

import { useEffect } from "react"
import { signIn } from "next-auth/react"

import { Icons } from "@/components/icons"
import { useRouter } from "next/navigation"
import { signup } from "@/lib/api/auth"
import { UserSignup } from "@/types"
import "./styles/sign-up.css"
import { notification, DatePicker, Input, Form, Button } from 'antd';
import { useLoadingStore } from "@/stores/loading"

const SignUpButton = () => {
  const loadingStore = useLoadingStore()
  const router = useRouter()
  const [form] = Form.useForm();

  const loginWithGoogle = async () => {
    loadingStore.setIsLoading(true)
    try {
      await signIn("google")
    } catch (error) {
      notification.error({
        message: 'Sign in failed!',
        description:error instanceof Error ? error.message ?? 'Sign in failed!' : ''
      });
    } finally {
      setTimeout(() => loadingStore.setIsLoading(false), 2500)
    }
  }

  const onSignup = async (record: UserSignup) => {
    try {
      loadingStore.setIsLoading(true);
      const res = await signup({
        ...record,
        age: new Date().getFullYear() - new Date(record.age?? '').getFullYear()
      });
      router.push("/login");
      notification.success({
        message: 'Sign up successfully!',
        description: res?.data?.data?.detail ?? 'Sign up successfully!',
      });
    } catch (error) {
      notification.error({
        message: 'Sign up failed!',
        description: error?.response?.data?.detail ?? 'Sign up failed!',
      });
    } finally {
      loadingStore.setIsLoading(false);
    }
  };

  const goToLogin = () : void => {
    loadingStore.setIsLoading(true);
    router.push("/login")
  }

  useEffect(() => {
    localStorage.setItem("authToken", "")
    loadingStore.setIsLoading(false);
  }, [])

  return (
    <div className="w-full rounded-md bg-[#000000b3] p-10 backdrop-blur-lg sign-up">
      <h1 className="mb-4 text-center text-3xl font-bold">Sign up</h1>
      <Form
        name="data"
        initialValues={{ remember: true }}
        onFinish={onSignup}
        form={form}
        autoComplete="off"
      >
        <Form.Item
          name="email"
          rules={[{ required: true, type: 'email', message: 'Please input your email!' }]}
        >
          <Input
            placeholder="Email"
            className="w-full p-4 bg-[black] text-[#8696A5] placeholder:text-[#8696A5] hover:bg-[black] hover:outline-none focus:bg-[black] border-0"
          />
        </Form.Item>
        <Form.Item
          name="fullname"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input
            placeholder="Full name"
            className="w-full p-4 bg-[black] text-[#8696A5] placeholder:text-[#8696A5] hover:bg-[black] hover:outline-none focus:bg-[black] border-0"
          />
        </Form.Item>
        <Form.Item
          name="age"
          rules={[
            { required: true, message: 'Please input your birthday!' },
            { validator: (_, value) => {
              const age = new Date().getFullYear() - new Date(value ?? '').getFullYear();
              if (age < 8) {
                return Promise.reject('Age must be at least 8 years old!');
              }
              return Promise.resolve();
            }}
          ]}
        >
          <DatePicker
            disabledDate={(current) => current && current.valueOf() > Date.now()}
            placeholder="Your birthday"
            className="w-full p-4 bg-[black] text-[#8696A5] placeholder:text-[#8696A5] hover:bg-[black] hover:outline-none focus:bg-[black] border-0"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: 'Please input your password!' },
            { min: 6, message: 'Password must be at least 6 characters!' }
          ]}
        >
          <Input.Password
            placeholder="Password"
            className="w-full p-4 bg-[black] text-[#8696A5] placeholder:text-[#8696A5] hover:bg-[black] hover:outline-none focus:bg-[black] border-0"
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          rules={[
            { required: true, message: 'Please input your confirm password!' },
            { validator: (_, value) => {
              if (!value || form.getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('Confirm password does not match!');
            }}
          ]}
        >
          <Input.Password
            placeholder="Confirm Password"
            className="w-full p-4 bg-[black] text-[#8696A5] placeholder:text-[#8696A5] hover:bg-[black] hover:outline-none focus:bg-[black] border-0"
          />
        </Form.Item>
        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" size="large" className="inline-block w-full text-white bg-[red] hover:outline-none focus:bg-[black] border-0 hover:bg-[#000] hover:text-[#8696A5]">
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
        onClick={loadingStore.isLoading ? undefined : loginWithGoogle}
        disabled={loadingStore.isLoading}
        size="large"
      >
        <Icons.google className="mr-2 h-4 w-4" aria-hidden="true" />
        Login with Google
      </Button>
      <div className="flex justify-center items-center gap-2 py-2 text-sm tracking-normal">
        <span>Already have an account?</span>
        <span onClick={goToLogin} className="hover:underline hover:text-[red] cursor-pointer">Log in</span>
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

export default SignUpButton;
