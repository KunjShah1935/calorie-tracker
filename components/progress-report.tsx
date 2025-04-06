import { LineChart, ArrowUp, ArrowDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ProgressReport() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-lg font-medium">Progress Report</h3>
          <p className="text-sm text-muted-foreground">Track your child's nutrition progress over time</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="aiden">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select child" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="aiden">Aiden Smith</SelectItem>
              <SelectItem value="emma">Emma Smith</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Download Report</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nutrition Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">84/100</div>
            <div className="flex items-center text-xs text-green-500">
              <ArrowUp className="mr-1 h-3 w-3" />
              <span>3 points from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meal Diversity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <div className="flex items-center text-xs text-green-500">
              <ArrowUp className="mr-1 h-3 w-3" />
              <span>5% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fruit & Veg Intake</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2</div>
            <div className="flex items-center text-xs text-red-500">
              <ArrowDown className="mr-1 h-3 w-3" />
              <span>0.3 servings from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Protein Adequacy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <div className="flex items-center text-xs text-green-500">
              <ArrowUp className="mr-1 h-3 w-3" />
              <span>4% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="trends">
        <TabsList className="mb-4">
          <TabsTrigger value="trends">Nutrition Trends</TabsTrigger>
          <TabsTrigger value="goals">Nutrition Goals</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Nutrition Score Trends</CardTitle>
              <CardDescription>Nutrition score trends over the past 6 months</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <LineChart className="h-8 w-8" />
                <span>Nutrition score trend chart will appear here</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals">
          <Card>
            <CardHeader>
              <CardTitle>Nutrition Goals</CardTitle>
              <CardDescription>Track progress towards nutrition goals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Increase fruit and vegetable intake</h4>
                      <p className="text-sm text-muted-foreground">Goal: 5 servings per day</p>
                    </div>
                    <span className="text-sm font-medium">64%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 w-[64%] rounded-full bg-green-500" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Reduce processed sugar intake</h4>
                      <p className="text-sm text-muted-foreground">Goal: Less than 25g per day</p>
                    </div>
                    <span className="text-sm font-medium">78%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 w-[78%] rounded-full bg-blue-500" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Increase calcium intake</h4>
                      <p className="text-sm text-muted-foreground">Goal: 1000mg per day</p>
                    </div>
                    <span className="text-sm font-medium">52%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 w-[52%] rounded-full bg-yellow-500" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Increase water intake</h4>
                      <p className="text-sm text-muted-foreground">Goal: 6 glasses per day</p>
                    </div>
                    <span className="text-sm font-medium">83%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 w-[83%] rounded-full bg-purple-500" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations">
          <Card>
            <CardHeader>
              <CardTitle>Personalized Recommendations</CardTitle>
              <CardDescription>Based on your child's nutrition data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h4 className="font-medium">Increase Iron-Rich Foods</h4>
                  <p className="mt-1 text-sm">
                    Your child's iron intake is slightly below the recommended level. Consider adding more lean meats,
                    beans, and leafy greens to their diet.
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">Spinach</span>
                    <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">Lentils</span>
                    <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">Red meat</span>
                    <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">Fortified cereals</span>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h4 className="font-medium">Add More Whole Grains</h4>
                  <p className="mt-1 text-sm">
                    Increasing whole grain intake will help improve fiber consumption and provide more sustained energy
                    throughout the day.
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">Brown rice</span>
                    <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">Whole wheat bread</span>
                    <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">Oatmeal</span>
                    <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">Quinoa</span>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h4 className="font-medium">Reduce Processed Snacks</h4>
                  <p className="mt-1 text-sm">
                    Try replacing processed snacks with fresh fruits, vegetables, or nuts for better nutrition and
                    sustained energy.
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">Apple slices</span>
                    <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">Carrot sticks</span>
                    <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">Yogurt</span>
                    <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">Almonds</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

