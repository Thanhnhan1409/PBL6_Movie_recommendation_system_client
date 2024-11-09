import { UserLogin } from "@/types"


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

// export async function getSession() {
//   const token = localStorage.getItem("authToken");
//   return !!token;
// }
