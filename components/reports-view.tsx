"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export function ReportsView() {
  const [userRole, setUserRole] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const fetchUserProfile = async () => {
      setIsLoading(true)
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        const { data } = await supabase.from("profiles").select("role").eq("id", user.id).single()

        if (data) {
          setUserRole(data.role)
        }
      }
      setIsLoading(false)
    }

    fetchUserProfile()
  }, [supabase])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Tabs defaultValue="overview">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
        <TabsTrigger value="growth">Growth</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Health Summary</CardTitle>
            <CardDescription>
              {userRole === "parent"
                ? "Your child's health metrics over time"
                : userRole === "teacher"
                  ? "Class health metrics overview"
                  : userRole === "healthcare"
                    ? "Population health metrics overview"
                    : "Your health metrics over time"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="h-[300px] w-full bg-muted rounded-md"></div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="nutrition" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Nutritional Analysis</CardTitle>
            <CardDescription>
              {userRole === "parent"
                ? "Your child's nutritional intake analysis"
                : userRole === "teacher"
                  ? "Class nutritional intake analysis"
                  : userRole === "healthcare"
                    ? "Population nutritional intake analysis"
                    : "Your nutritional intake analysis"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="h-[300px] w-full bg-muted rounded-md"></div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="growth" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Growth Tracking</CardTitle>
            <CardDescription>
              {userRole === "parent"
                ? "Your child's growth metrics over time"
                : userRole === "teacher"
                  ? "Class growth metrics overview"
                  : userRole === "healthcare"
                    ? "Population growth metrics overview"
                    : "Your growth metrics over time"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="h-[300px] w-full bg-muted rounded-md"></div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

