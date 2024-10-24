// import { env } from "@/env.mjs"
import type { SubscriptionPlan } from "@/types"

export const mobilePlan: SubscriptionPlan = {
  name: "Mobile",
  description: "The plan is suitable for mobile devices.",
  stripePriceId: "",
  monthlyPrice: 2.99,
  videoQuality: "Good",
  resolution: "480p",
  devices: "Phone, Tablet",
}

export const basicPlan: SubscriptionPlan = {
  name: "Basic",
  description: "The plan is suitable for basic devices.",
  stripePriceId: "",
  monthlyPrice: 3.99,
  videoQuality: "Good",
  resolution: "720p",
  devices: "Phone, Tablet, Computer, TV",
}

export const standardPlan: SubscriptionPlan = {
  name: "Standard",
  description: "The plan is suitable for standard devices.",
  stripePriceId: "",
  monthlyPrice: 7.99,
  videoQuality: "Better",
  resolution: "1080p",
  devices: "Phone, Tablet, Computer, TV",
}

export const premiumPlan: SubscriptionPlan = {
  name: "Premium",
  description: "The plan is suitable for premium devices.",
  stripePriceId: "",
  monthlyPrice: 9.99,
  videoQuality: "Best",
  resolution: "4K+HDR",
  devices: "Phone, Tablet, Computer, TV",
}

export const subscriptionPlans = [
  mobilePlan,
  basicPlan,
  standardPlan,
  premiumPlan,
]
