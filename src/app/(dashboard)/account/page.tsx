import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { authOptions } from "@/server/auth"
import { getCurrentUser } from "@/lib/session"
import { getPlanDetails, getUserSubscriptionPlan } from "@/lib/subscription"
import AccountForm from "@/components/forms/account-form"

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

  // find subscription plan of user
  const subscriptionPlan = await getUserSubscriptionPlan(user.id)

  // if user has a subscription plan, check if it's active
  const subStartDate: number | null = null
  const isCanceled = false

  const subPlanDetails = getPlanDetails(subscriptionPlan?.name ?? "")

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
