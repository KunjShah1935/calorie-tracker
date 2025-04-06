"use client"

import { useState } from "react"
import { Calendar, ChevronDown, FileText, Home, PieChart, Plus, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { MealInput } from "./input/meal-input"
import { ChildAttendance } from "./report/child-attendance"
import { NutrientOverview } from "./report/nutrition-overview"
import { ProgressReport } from "./report/progress-report"
import { ParentOverview } from "./overview"

export function ParentDashboard() {
  const [activeSection, setActiveSection] = useState<"overview" | "input" | "reports">("overview")
  const [activeTab, setActiveTab] = useState<string>("overview")

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar>
          <SidebarHeader className="flex h-14 items-center border-b px-6">
            <div className="flex items-center gap-2 font-semibold">
              <PieChart className="h-6 w-6 text-primary" />
              <span>NutriTrack</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={activeSection === "overview"}
                      onClick={() => {
                        setActiveSection("overview")
                        setActiveTab("overview")
                      }}
                    >
                      <Home className="h-4 w-4" />
                      <span>Overview</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarGroupLabel>Input</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={activeSection === "input" && activeTab === "meal"}
                      onClick={() => {
                        setActiveSection("input")
                        setActiveTab("meal")
                      }}
                    >
                      <Plus className="h-4 w-4" />
                      <span>Meal Input</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarGroupLabel>Reports</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={activeSection === "reports" && activeTab === "nutrition"}
                      onClick={() => {
                        setActiveSection("reports")
                        setActiveTab("nutrition")
                      }}
                    >
                      <PieChart className="h-4 w-4" />
                      <span>Nutrient Overview</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={activeSection === "reports" && activeTab === "progress"}
                      onClick={() => {
                        setActiveSection("reports")
                        setActiveTab("progress")
                      }}
                    >
                      <FileText className="h-4 w-4" />
                      <span>Progress Report</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={activeSection === "reports" && activeTab === "attendance"}
                      onClick={() => {
                        setActiveSection("reports")
                        setActiveTab("attendance")
                      }}
                    >
                      <Calendar className="h-4 w-4" />
                      <span>Attendance Report</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <User className="h-4 w-4 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">Parent Account</span>
                <span className="text-xs text-muted-foreground">Smith Family</span>
              </div>
              <Button variant="ghost" size="icon" className="ml-auto">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 overflow-auto">
          <div className="container py-6">
            {activeSection === "overview" && <ParentOverview />}

            {activeSection === "input" && (
              <Card>
                <CardHeader>
                  <CardTitle>Meal Input</CardTitle>
                  <CardDescription>Enter your child's daily meal information</CardDescription>
                </CardHeader>
                <CardContent>
                  <MealInput />
                </CardContent>
              </Card>
            )}

            {activeSection === "reports" && (
              <Card>
                <CardHeader>
                  <CardTitle>Reports</CardTitle>
                  <CardDescription>View your child's nutrition data, progress, and attendance</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="mb-4">
                      <TabsTrigger value="nutrition">Nutrient Overview</TabsTrigger>
                      <TabsTrigger value="progress">Progress Report</TabsTrigger>
                      <TabsTrigger value="attendance">Attendance Report</TabsTrigger>
                    </TabsList>
                    <TabsContent value="nutrition">
                      <NutrientOverview />
                    </TabsContent>
                    <TabsContent value="progress">
                      <ProgressReport />
                    </TabsContent>
                    <TabsContent value="attendance">
                      <ChildAttendance />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}

