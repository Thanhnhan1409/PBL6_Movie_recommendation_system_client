'user client'
import { useEffect } from "react"
import { login } from "@/lib/api/auth"

export default function Test() {
  useEffect(() => {
    async function fetchUser() {
      const user = await login({
        username: "anh@gmail.com",
        password: "123456Aa",
      })
      console.log('user', user);
    }
    fetchUser()
  }, [])

  return (
    <section>
      {/* <EditProfileForm profile={fakeProfile} /> */}
      heheh
    </section>
  )
}
