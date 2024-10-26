import { authOptions } from "@/server/auth"
import { UserLogin } from "@/types"
import { getServerSession } from "next-auth/next"


export async function getCurrentUser(data: UserLogin) {
  try {
    const response = await fetch("http://0.0.0.0:8080/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    }).then((res) => res.json())
    return response
  } catch (error) {
    return
  }
}

export async function getSession() {
  return await getServerSession(authOptions)
}
