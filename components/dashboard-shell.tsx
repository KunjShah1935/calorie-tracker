import type React from "react"
import { DashboardNav } from "@/components/dashboard-nav"

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-col md:flex-row">
        <aside className="md:w-64 border-r bg-muted">
          <DashboardNav />
        </aside>
        <main className="flex-1 p-6 md:p-8 pt-6">
          <div className="mx-auto max-w-5xl space-y-6">{children}</div>
        </main>
      </div>
    </div>
  )
}

