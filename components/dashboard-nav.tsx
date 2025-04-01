"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, LineChart, FileText, Users, Settings, LogOut, Apple } from "lucide-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export function DashboardNav() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [userRole, setUserRole] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        const { data } = await supabase.from("profiles").select("role").eq("id", user.id).single()

        if (data) {
          setUserRole(data.role)
        }
      }
    }

    fetchUserProfile()
  }, [supabase])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      roles: ["student", "parent", "teacher", "healthcare"],
    },
    {
      title: "Health Data",
      href: "/dashboard/health-data",
      icon: LineChart,
      roles: ["student", "parent", "teacher", "healthcare"],
    },
    {
      title: "Reports",
      href: "/dashboard/reports",
      icon: FileText,
      roles: ["parent", "teacher", "healthcare"],
    },
    {
      title: "User Management",
      href: "/dashboard/users",
      icon: Users,
      roles: ["teacher", "healthcare"],
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
      roles: ["student", "parent", "teacher", "healthcare"],
    },
  ]

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center border-b px-4">
        <Link className="flex items-center" href="/">
          <Apple className="h-6 w-6 text-primary" />
          <span className="ml-2 font-bold">NutriTrack</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm">
          {navItems.map((item) => {
            // Only show nav items that the user has access to based on their role
            if (!userRole || !item.roles.includes(userRole)) {
              return null
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                  pathname === item.href ? "bg-muted font-medium text-primary" : "text-muted-foreground",
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="mt-auto p-4">
        <Button variant="outline" className="w-full justify-start" onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </Button>
      </div>
    </div>
  )
}

