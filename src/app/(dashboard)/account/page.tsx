import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { authOptions } from "@/server/auth"
import { prisma } from "@/server/db"

import { getCurrentUser } from "@/lib/session"
import { getPlanDetails, getUserSubscriptionPlan } from "@/lib/subscription"
import AccountForm from "@/components/forms/account-form"

export const metadata: Metadata = {
  title: "Account",
  description: "Manage billing and your subscription plan.",
}

export default async function AccountPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn ?? "/login")
  }

  // find subscription plan of user
  const subscriptionPlan = await getUserSubscriptionPlan(user.id)

  // if user has a subscription plan, check if it's active
  const subStartDate: number | null = null
  const isCanceled = false

  const subPlanDetails = getPlanDetails(subscriptionPlan?.name ?? "")

  // if user has no profiles, redirect to profiles page
  const profiles = await prisma.profile.findMany({
    where: {
      userId: user.id,
    },
  })

  if (!profiles.length) {
    redirect("/profiles")
  }

  return (
    <section className="container w-full max-w-3xl pb-16 pt-10">
      <AccountForm
        subscriptionPlan={subscriptionPlan}
        subPlanDetails={subPlanDetails}
        subStartDate={subStartDate}
        isCanceled={isCanceled}
      />
    </section>
  )
}
