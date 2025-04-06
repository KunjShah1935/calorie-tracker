"use client"

import { useState } from "react"
import { Calendar, ChevronDown, FileText, Home, PieChart, Plus, User, Users } from "lucide-react"

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

import { AttendanceInput } from "./input/attendance-input"
import { MealInput } from "./input/meal-input"
import { AttendanceReport } from "./report/attendance-report"
import { NutritionOverview } from "./report/nutrition-overview"
import { ProgressReport } from "./report/progress-report"
import { DashboardOverview } from "./overview"

export function Nutrition() {
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
                      <span>Daily Meal</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={activeSection === "input" && activeTab === "attendance"}
                      onClick={() => {
                        setActiveSection("input")
                        setActiveTab("attendance")
                      }}
                    >
                      <Calendar className="h-4 w-4" />
                      <span>Attendance</span>
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
                      <span>Nutrition Overview</span>
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
                      <Users className="h-4 w-4" />
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
                <span className="text-sm font-medium">Teacher Account</span>
                <span className="text-xs text-muted-foreground">Class 5-A</span>
              </div>
              <Button variant="ghost" size="icon" className="ml-auto">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 overflow-auto">
          <div className="container py-6">
            {activeSection === "overview" && <DashboardOverview />}

            {activeSection === "input" && (
              <Card>
                <CardHeader>
                  <CardTitle>Input Data</CardTitle>
                  <CardDescription>Enter daily meal details and attendance information for students</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="mb-4">
                      <TabsTrigger value="meal">Daily Meal</TabsTrigger>
                      <TabsTrigger value="attendance">Attendance</TabsTrigger>
                    </TabsList>
                    <TabsContent value="meal">
                      <MealInput />
                    </TabsContent>
                    <TabsContent value="attendance">
                      <AttendanceInput />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}

            {activeSection === "reports" && (
              <Card>
                <CardHeader>
                  <CardTitle>Reports</CardTitle>
                  <CardDescription>View nutrition data, progress reports, and attendance statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="mb-4">
                      <TabsTrigger value="nutrition">Nutrition Overview</TabsTrigger>
                      <TabsTrigger value="progress">Progress Report</TabsTrigger>
                      <TabsTrigger value="attendance">Attendance Report</TabsTrigger>
                    </TabsList>
                    <TabsContent value="nutrition">
                      <NutritionOverview />
                    </TabsContent>
                    <TabsContent value="progress">
                      <ProgressReport />
                    </TabsContent>
                    <TabsContent value="attendance">
                      <AttendanceReport />
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

