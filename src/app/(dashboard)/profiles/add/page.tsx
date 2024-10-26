import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { authOptions } from "@/server/auth"

import { getCurrentUser } from "@/lib/session"
import AddProfileForm from "@/components/forms/add-profile-form"

export const metadata: Metadata = {
  title: "Add Profile",
  description: "Add a new profile",
}

export default async function AddProfilePage() {
  const user = await getCurrentUser({
    username: "anh@gmail.com",
    password: "123456Aa"
  })

  if (!user) {
    redirect(authOptions?.pages?.signIn ?? "/login")
  }

  const fakeProfiles = [
    {
      id: '123123123', // Tạo ID ngẫu nhiên
      name: "Nguyễn Văn A",
      language: "Vietnamese",
      gameHandle: "GameMaster123",
      email: "nguyenvana@example.com",
      pin: "123456",
      icon: {
        url: "https://example.com/icon.png",
        altText: "Icon of Nguyễn Văn A",
      },
    },
    {
      id: '123123123e', // Tạo ID ngẫu nhiên
      name: "Nguyễn Văn A",
      language: "Vietnamese",
      gameHandle: "GameMaster123",
      email: "nguyenvana@example.com",
      pin: "123456",
      icon: {
        url: "https://example.com/icon.png",
        altText: "Icon of Nguyễn Văn A",
      },
    }
  ];
  return (
    <section>
      {/* <AddProfileForm profiles={fakeProfiles} profileIcon={''} /> */}
      <AddProfileForm  />
    </section>
  )
}
