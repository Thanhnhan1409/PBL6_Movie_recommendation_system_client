"use client"

import { useEffect, useState } from "react"
import { signIn } from "next-auth/react"
import { Icons } from "@/components/icons"
import { useRouter } from "next/navigation"
import { getMe, login } from "@/lib/api/auth"
import { UserLogin } from "@/types"
import "./styles/sign-up.css"
import { Form, Input, Button, Skeleton, notification } from "antd"
import { useLoadingStore } from "@/stores/loading"
import { useProfileStore } from "@/stores/profile"

const LoginButton = () => {
  const loadingStore = useLoadingStore()
  const profileStore = useProfileStore()
  const [form] = Form.useForm()

  useEffect(() => {
    localStorage.setItem("authToken", "");
    loadingStore.setIsLoading(false);
  }, [])

  const loginWithGoogle = async () => {
    loadingStore.setIsLoading(true)
    try {
      await signIn("google")
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => loadingStore.setIsLoading(false), 1000)
    }
  }
  
  const router = useRouter()
  const onLogin = async (record: UserLogin) => {
    try {
      loadingStore.setIsLoading(true);
      const res = await login(record);
      const profileRes = await getMe();
      profileStore.setActiveProfile({
        ...profileRes?.data,
        avatar: '/images/Netfli5.png'
      });
      profileStore.setParentProfile({
        ...profileRes?.data,
        avatar: '/images/Netfli5.png'
      });
      notification.success({
        message: 'Log in',
        description: res?.data?.detail ?? 'Log in successfully!',
      });
      await router.push("/");
    } catch (error) {
      console.error(error);
      loadingStore.setIsLoading(false);
      notification.error({
        message: 'Log in failed!',
        description: error?.response?.data?.detail ?? 'Log in failed!',
      });
    }
  }

  const goToSignup = () : void => {
    loadingStore.setIsLoading(true);
    router.push("/signup")
  }

  // const goToHome = () => {
  //   if(true) {
  //     console.log('12313');
  //     return (
  //       <motion.div
  //         className="container flex min-h-screen w-full max-w-5xl flex-col items-center justify-center space-y-8 fixed inset-0"
  //         initial={{ opacity: 0, scale: 0.9 }}
  //         animate={{ opacity: 1, scale: 1 }}
  //         exit={{ opacity: 0, scale: 0.9 }}
  //         transition={{ duration: 0.3 }}
  //       >
  //         <h1 className="text-center text-3xl font-medium sm:text-4xl">
  //           {`Who's`} watching?
  //         </h1>
  //         <div className="flex flex-wrap items-start justify-center gap-2 pb-8 sm:gap-4 md:gap-8">
  //           {/* {profilesQuery.isLoading
  //             ? Array.from({ length: 4 }, (_, i) => (
  //                 <Skeleton
  //                   key={i}
  //                   className="aspect-square h-24 rounded bg-neutral-700 sm:h-28 md:h-32"
  //                 />
  //               ))
  //             : profilesQuery.isSuccess &&
  //               profilesQuery.data.map((profile) => (
  //                 <Button
  //                   aria-label="Select profile"
  //                   key={profile.id}
  //                   variant="ghost"
  //                   className="group h-auto flex-col space-y-2 p-0 hover:bg-transparent focus:ring-0 focus:ring-offset-0 active:scale-[0.98] dark:hover:bg-transparent"
  //                   onClick={() => {
  //                     useProfileStore.setState({
  //                       profile: profile,
  //                       pinForm: profile.pin ? true : false,
  //                     })
  //                   }}
  //                 >
  //                   <div className="relative aspect-square h-24 w-fit overflow-hidden rounded shadow-sm group-hover:ring-2 group-hover:ring-slate-50 sm:h-28 md:h-32">
  //                     {profile.icon ? (
  //                       <Image
  //                         src={profile.icon.href}
  //                         alt={profile.icon.title}
  //                         fill
  //                         sizes="(max-width: 768px) 100vw, 
  //                           (max-width: 1200px) 50vw, 33vw"
  //                         priority
  //                         className="object-cover"
  //                       />
  //                     ) : (
  //                       <Skeleton className="h-full w-full bg-neutral-700" />
  //                     )}
  //                   </div>
  //                   <div className="flex flex-col items-center justify-center gap-5">
  //                     <h2 className="text-sm text-slate-400 group-hover:text-slate-50 sm:text-base">
  //                       {profile.name}
  //                     </h2>
  //                     {profile.pin && (
  //                       <Icons.lock
  //                         className="h-4 w-4 text-slate-400"
  //                         aria-label="Private profile"
  //                       />
  //                     )}
  //                   </div>
  //                 </Button>
  //               ))} */}
  //         </div>
  //         <Button
  //           aria-label="Navigate to manage profiles page"
  //           type="primary"
  //           className="rounded-none"
  //           onClick={() => router.push("/profiles")}
  //           disabled={loadingStore.isLoading}
  //         >
  //           Manage Profiles
  //         </Button>
  //       </motion.div>
  //     )
  //   }
  // }
  
  return (
    <div className="w-full rounded-md bg-[#000000b3] p-14 backdrop-blur-lg">
      <div className="mb-4 text-center text-3xl font-bold">Sign in</div>
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
