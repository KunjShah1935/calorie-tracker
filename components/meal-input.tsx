"use client"

import { useState } from "react"
import { CalendarIcon, Check, ChevronsUpDown, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const mealTypes = [
  { label: "Breakfast", value: "breakfast" },
  { label: "Lunch", value: "lunch" },
  { label: "Dinner", value: "dinner" },
  { label: "Morning Snack", value: "morning-snack" },
  { label: "Afternoon Snack", value: "afternoon-snack" },
  { label: "Evening Snack", value: "evening-snack" },
]

const children = [
  { name: "Aiden Smith", id: "CH001", age: 10 },
  { name: "Emma Smith", id: "CH002", age: 8 },
]

const foodItems = [
  { name: "Rice", category: "Grains", nutrients: "Carbohydrates, Fiber" },
  { name: "Whole Wheat Bread", category: "Grains", nutrients: "Carbohydrates, Fiber, Protein" },
  { name: "Chicken Breast", category: "Protein", nutrients: "Protein, Vitamin B6" },
  { name: "Eggs", category: "Protein", nutrients: "Protein, Vitamin D, B12" },
  { name: "Spinach", category: "Vegetables", nutrients: "Vitamin A, K, Iron" },
  { name: "Carrots", category: "Vegetables", nutrients: "Vitamin A, Fiber" },
  { name: "Apples", category: "Fruits", nutrients: "Fiber, Vitamin C" },
  { name: "Bananas", category: "Fruits", nutrients: "Potassium, Vitamin B6" },
  { name: "Milk", category: "Dairy", nutrients: "Calcium, Protein, Vitamin D" },
  { name: "Yogurt", category: "Dairy", nutrients: "Calcium, Protein, Probiotics" },
  { name: "Salmon", category: "Protein", nutrients: "Omega-3, Protein, Vitamin D" },
  { name: "Sweet Potato", category: "Vegetables", nutrients: "Vitamin A, Fiber" },
  { name: "Quinoa", category: "Grains", nutrients: "Protein, Fiber, Magnesium" },
  { name: "Avocado", category: "Fruits", nutrients: "Healthy Fats, Fiber" },
  { name: "Broccoli", category: "Vegetables", nutrients: "Vitamin C, K, Fiber" },
]

export function MealInput() {
  const [date, setDate] = useState<Date>()
  const [open, setOpen] = useState(false)
  const [selectedChild, setSelectedChild] = useState("")
  const [selectedFoods, setSelectedFoods] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("breakfast")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredFoodItems = foodItems.filter(
    (food) =>
      food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food.nutrients.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? date.toDateString() : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label>Child</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
                {selectedChild ? children.find((child) => child.id === selectedChild)?.name : "Select child"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Search child..." />
                <CommandList>
                  <CommandEmpty>No child found.</CommandEmpty>
                  <CommandGroup>
                    {children.map((child) => (
                      <CommandItem
                        key={child.id}
                        value={child.id}
                        onSelect={(currentValue) => {
                          setSelectedChild(currentValue === selectedChild ? "" : currentValue)
                          setOpen(false)
                        }}
                      >
                        <Check
                          className={cn("mr-2 h-4 w-4", selectedChild === child.id ? "opacity-100" : "opacity-0")}
                        />
                        {child.name} ({child.age} years old)
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4 flex flex-wrap">
          <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
          <TabsTrigger value="lunch">Lunch</TabsTrigger>
          <TabsTrigger value="dinner">Dinner</TabsTrigger>
          <TabsTrigger value="snacks">Snacks</TabsTrigger>
        </TabsList>

        {["breakfast", "lunch", "dinner", "snacks"].map((mealTime) => (
          <TabsContent key={mealTime} value={mealTime} className="space-y-6">
            {mealTime === "snacks" ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Snack Time</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select snack time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Morning Snack</SelectItem>
                      <SelectItem value="afternoon">Afternoon Snack</SelectItem>
                      <SelectItem value="evening">Evening Snack</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Food Items</Label>
                    <div className="relative w-1/3">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search foods..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredFoodItems.map((food) => (
                      <Card key={`${mealTime}-${food.name}`} className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="flex items-center gap-2 p-4">
                            <input
                              type="checkbox"
                              id={`${mealTime}-food-${food.name}`}
                              className="h-4 w-4 rounded border-gray-300"
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedFoods([...selectedFoods, food.name])
                                } else {
                                  setSelectedFoods(selectedFoods.filter((f) => f !== food.name))
                                }
                              }}
                              checked={selectedFoods.includes(food.name)}
                            />
                            <div>
                              <Label htmlFor={`${mealTime}-food-${food.name}`} className="font-medium">
                                {food.name}
                              </Label>
                              <p className="text-xs text-muted-foreground">
                                {food.category} • {food.nutrients}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`${mealTime}-notes`}>Additional Notes</Label>
                  <Textarea id={`${mealTime}-notes`} placeholder="Any special notes about this snack..." />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Food Items</Label>
                  <div className="relative w-1/3">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search foods..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredFoodItems.map((food) => (
                    <Card key={`${mealTime}-${food.name}`} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex items-center gap-2 p-4">
                          <input
                            type="checkbox"
                            id={`${mealTime}-food-${food.name}`}
                            className="h-4 w-4 rounded border-gray-300"
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedFoods([...selectedFoods, food.name])
                              } else {
                                setSelectedFoods(selectedFoods.filter((f) => f !== food.name))
                              }
                            }}
                            checked={selectedFoods.includes(food.name)}
                          />
                          <div>
                            <Label htmlFor={`${mealTime}-food-${food.name}`} className="font-medium">
                              {food.name}
                            </Label>
                            <p className="text-xs text-muted-foreground">
                              {food.category} • {food.nutrients}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`${mealTime}-notes`}>Additional Notes</Label>
                  <Textarea id={`${mealTime}-notes`} placeholder={`Any special notes about this ${mealTime}...`} />
                </div>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save Meal Data</Button>
      </div>
    </div>
  )
}

