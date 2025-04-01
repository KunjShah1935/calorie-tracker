import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { UserRoleBasedContent } from "@/components/user-role-based-content"

export const metadata: Metadata = {
  title: "Dashboard - NutriTrack",
  description: "Manage your nutrition data and health metrics",
}

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="View and manage your nutrition data and health metrics." />
      <div className="grid gap-4 md:gap-8">
        <UserRoleBasedContent />
        hello world
      </div>
    </DashboardShell>
  )
}

