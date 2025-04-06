import { PieChart, BarChart3, TrendingUp } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function NutrientOverview() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-lg font-medium">Nutrient Overview</h3>
          <p className="text-sm text-muted-foreground">Analyze your child's nutrition data and identify trends</p>
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
          <Select defaultValue="week">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Protein</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24g</div>
            <p className="text-xs text-muted-foreground">Average per day</p>
            <div className="mt-2 h-1 w-full rounded-full bg-muted">
              <div className="h-1 w-[65%] rounded-full bg-green-500" />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">65% of daily target</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Carbohydrates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">180g</div>
            <p className="text-xs text-muted-foreground">Average per day</p>
            <div className="mt-2 h-1 w-full rounded-full bg-muted">
              <div className="h-1 w-[85%] rounded-full bg-blue-500" />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">85% of daily target</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45g</div>
            <p className="text-xs text-muted-foreground">Average per day</p>
            <div className="mt-2 h-1 w-full rounded-full bg-muted">
              <div className="h-1 w-[70%] rounded-full bg-yellow-500" />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">70% of daily target</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fiber</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18g</div>
            <p className="text-xs text-muted-foreground">Average per day</p>
            <div className="mt-2 h-1 w-full rounded-full bg-muted">
              <div className="h-1 w-[60%] rounded-full bg-purple-500" />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">60% of daily target</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="macronutrients">
        <TabsList className="mb-4">
          <TabsTrigger value="macronutrients">Macronutrients</TabsTrigger>
          <TabsTrigger value="micronutrients">Micronutrients</TabsTrigger>
          <TabsTrigger value="food-groups">Food Groups</TabsTrigger>
          <TabsTrigger value="meals">Meal Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="macronutrients">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Macronutrient Distribution</CardTitle>
                <CardDescription>Average distribution of macronutrients across all meals</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <PieChart className="h-8 w-8" />
                  <span>Macronutrient distribution chart will appear here</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Daily Intake Trends</CardTitle>
                <CardDescription>Macronutrient intake trends over the selected period</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <TrendingUp className="h-8 w-8" />
                  <span>Intake trend chart will appear here</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="micronutrients">
          <Card>
            <CardHeader>
              <CardTitle>Micronutrient Analysis</CardTitle>
              <CardDescription>Key vitamins and minerals intake</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <BarChart3 className="h-8 w-8" />
                <span>Micronutrient analysis chart will appear here</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="food-groups">
          <Card>
            <CardHeader>
              <CardTitle>Food Group Distribution</CardTitle>
              <CardDescription>Distribution of food groups in your child's meals</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <PieChart className="h-8 w-8" />
                <span>Food group distribution chart will appear here</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="meals">
          <Card>
            <CardHeader>
              <CardTitle>Meal Contribution Analysis</CardTitle>
              <CardDescription>Nutritional contribution of each meal type</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <BarChart3 className="h-8 w-8" />
                <span>Meal contribution chart will appear here</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Home vs. School Nutrition</CardTitle>
          <CardDescription>Comparison of nutritional intake at home versus at school</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <BarChart3 className="h-8 w-8" />
            <span>Home vs. school nutrition comparison will appear here</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

