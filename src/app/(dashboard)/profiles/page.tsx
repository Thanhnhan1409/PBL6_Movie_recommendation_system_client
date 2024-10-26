import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { authOptions } from "@/server/auth"

import { getCurrentUser } from "@/lib/session"
import ManageProfiles from "@/components/manage-profiles"

export const metadata: Metadata = {
  title: "Manage Profiles",
  description: "Manage your profiles",
}

export default async function ManageProfilesPage() {
  const user = await getCurrentUser({
    username: "anh@gmail.com",
    password: "123456Aa"
  })

  if (!user) {
    redirect(authOptions?.pages?.signIn ?? "/login")
  }

  // TODO: refetch profiles on mutation
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
    <section className="w-full shadow-md">
      <ManageProfiles profiles={fakeProfiles} />
    </section>
  )
}
