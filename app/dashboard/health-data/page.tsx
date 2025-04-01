import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { HealthDataForm } from "@/components/health-data-form"

export const metadata: Metadata = {
  title: "Health Data - NutriTrack",
  description: "Enter and update your health metrics",
}

export default function HealthDataPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Health Data" text="Enter and update your health metrics." />
      <div className="grid gap-4 md:gap-8">
        <HealthDataForm />
      </div>
    </DashboardShell>
  )
}

