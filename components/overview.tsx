import { Calendar, PieChart, TrendingUp } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const children = [
  { name: "Aiden Smith", age: 10, grade: "5th Grade", avatar: "AS" },
  { name: "Emma Smith", age: 8, grade: "3rd Grade", avatar: "ES" },
]

export function ParentOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Parent Dashboard</h2>
        <p className="text-muted-foreground">Monitor your children's nutrition, progress, and attendance</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {children.map((child) => (
          <Card key={child.name}>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src="" alt={child.name} />
                <AvatarFallback>{child.avatar}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{child.name}</CardTitle>
                <CardDescription>
                  {child.age} years old • {child.grade}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-muted-foreground">Nutrition Score</span>
                  <span className="text-2xl font-bold">84/100</span>
                  <span className="text-xs text-green-500">+3 this week</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-muted-foreground">Attendance</span>
                  <span className="text-2xl font-bold">96%</span>
                  <span className="text-xs text-muted-foreground">This month</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-muted-foreground">Meal Entries</span>
                  <span className="text-2xl font-bold">18</span>
                  <span className="text-xs text-muted-foreground">This week</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="nutrition">
        <TabsList>
          <TabsTrigger value="nutrition">Nutrition Summary</TabsTrigger>
          <TabsTrigger value="meals">Recent Meals</TabsTrigger>
          <TabsTrigger value="activity">School Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="nutrition" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Nutrition Summary</CardTitle>
              <CardDescription>Overview of your children's nutritional intake this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-4 text-sm font-semibold">Aiden Smith</h4>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Protein</span>
                        <span className="font-medium">68%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div className="h-2 rounded-full bg-green-500" style={{ width: "68%" }} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Carbohydrates</span>
                        <span className="font-medium">82%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div className="h-2 rounded-full bg-blue-500" style={{ width: "82%" }} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Fats</span>
                        <span className="font-medium">75%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div className="h-2 rounded-full bg-yellow-500" style={{ width: "75%" }} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Vitamins & Minerals</span>
                        <span className="font-medium">62%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div className="h-2 rounded-full bg-purple-500" style={{ width: "62%" }} />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="mb-4 text-sm font-semibold">Emma Smith</h4>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Protein</span>
                        <span className="font-medium">72%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div className="h-2 rounded-full bg-green-500" style={{ width: "72%" }} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Carbohydrates</span>
                        <span className="font-medium">78%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div className="h-2 rounded-full bg-blue-500" style={{ width: "78%" }} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Fats</span>
                        <span className="font-medium">65%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div className="h-2 rounded-full bg-yellow-500" style={{ width: "65%" }} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Vitamins & Minerals</span>
                        <span className="font-medium">70%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div className="h-2 rounded-full bg-purple-500" style={{ width: "70%" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="meals" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Meals</CardTitle>
              <CardDescription>Latest meals recorded for your children</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {children.map((child) => (
                  <div key={`meals-${child.name}`} className="space-y-4">
                    <h4 className="font-semibold">{child.name}</h4>
                    <div className="space-y-4">
                      {[
                        { date: "Today", meal: "Breakfast", items: "Oatmeal with fruits, milk" },
                        { date: "Today", meal: "Lunch", items: "Chicken sandwich, apple, yogurt" },
                        { date: "Yesterday", meal: "Dinner", items: "Pasta with vegetables, orange juice" },
                      ].map((meal, i) => (
                        <div key={i} className="flex items-start gap-4 border-b pb-4 last:border-0">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <PieChart className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">
                              {meal.meal} - {meal.date}
                            </p>
                            <p className="text-sm text-muted-foreground">{meal.items}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="activity" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>School Activity</CardTitle>
              <CardDescription>Recent updates from school</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    type: "attendance",
                    child: "Aiden Smith",
                    description: "Attended all classes today",
                    time: "Today, 3:30 PM",
                  },
                  {
                    type: "meal",
                    child: "Aiden Smith",
                    description: "Had lunch at school cafeteria",
                    time: "Today, 12:15 PM",
                  },
                  {
                    type: "attendance",
                    child: "Emma Smith",
                    description: "Attended all classes today",
                    time: "Today, 3:15 PM",
                  },
                  {
                    type: "meal",
                    child: "Emma Smith",
                    description: "Had lunch at school cafeteria",
                    time: "Today, 11:45 AM",
                  },
                  {
                    type: "attendance",
                    child: "Aiden Smith",
                    description: "Was 10 minutes late to school",
                    time: "Yesterday, 8:40 AM",
                  },
                ].map((activity, i) => (
                  <div key={i} className="flex items-start gap-4 border-b pb-4 last:border-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      {activity.type === "attendance" ? (
                        <Calendar className="h-5 w-5 text-primary" />
                      ) : (
                        <PieChart className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{activity.child}</p>
                      <p className="text-sm">{activity.description}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Nutrition Trends</CardTitle>
          <CardDescription>Your children's nutrition scores over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center border rounded-md bg-muted/20">
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <TrendingUp className="h-8 w-8" />
              <span>Nutrition trend chart will appear here</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

