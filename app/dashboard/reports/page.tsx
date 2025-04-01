import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { ReportsView } from "@/components/reports-view"

export const metadata: Metadata = {
  title: "Reports - NutriTrack",
  description: "View detailed health and nutrition reports",
}

export default function ReportsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Reports" text="View detailed health and nutrition reports." />
      <div className="grid gap-4 md:gap-8">
        <ReportsView />
      </div>
    </DashboardShell>
  )
}

