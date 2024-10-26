import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { authOptions } from "@/server/auth"

import { getCurrentUser } from "@/lib/session"
import EditProfileForm from "@/components/forms/edit-profile-form"

export const metadata: Metadata = {
  title: "Edit Profile",
  description: "Edit your profile",
}

interface EditProfilePageProps {
  params: {
    profileId: string
  }
}

export default async function EditProfilePage({
  params,
}: EditProfilePageProps) {
  const { profileId } = params

  const user = await getCurrentUser({
    username: "anh@gmail.com",
    password: "123456Aa"
  })

  if (!user) {
    redirect(authOptions?.pages?.signIn ?? "/login")
  }

  const fakeProfile = {
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
  };
  return (
    <section>
      {/* <EditProfileForm profile={fakeProfile} /> */}
      <EditProfileForm />
    </section>
  )
}
