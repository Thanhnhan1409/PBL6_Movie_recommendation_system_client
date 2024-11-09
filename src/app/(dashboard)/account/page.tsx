import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { authOptions } from "@/server/auth"
import { getCurrentUser } from "@/lib/session"

export const metadata: Metadata = {
  title: "Account",
  description: "Manage billing and your subscription plan.",
}

export default async function AccountPage() {
  const user = await getCurrentUser(
    {
      username: "anh@gmail.com",
      password: "123456Aa"
    }
  )

  if (!user) {
    redirect(authOptions?.pages?.signIn ?? "/login")
  }

  return (
    <section className="container w-full max-w-3xl pb-16 pt-10">
      {/* <AccountForm
        subscriptionPlan={subscriptionPlan}
        subPlanDetails={subPlanDetails}
        subStartDate={subStartDate}
        isCanceled={isCanceled}
      /> */}
      Account Page
    </section>
  )
}
