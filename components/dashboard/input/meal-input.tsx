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
import { cn } from "@/lib/utils"

const mealTypes = [
  { label: "Breakfast", value: "breakfast" },
  { label: "Mid-Morning Snack", value: "morning-snack" },
  { label: "Lunch", value: "lunch" },
  { label: "Afternoon Snack", value: "afternoon-snack" },
  { label: "Dinner", value: "dinner" },
]

const students = [
  { name: "Aiden Smith", id: "ST001", class: "5-A" },
  { name: "Emma Johnson", id: "ST002", class: "5-A" },
  { name: "Noah Williams", id: "ST003", class: "5-A" },
  { name: "Olivia Brown", id: "ST004", class: "5-A" },
  { name: "Liam Davis", id: "ST005", class: "5-A" },
  { name: "Sophia Miller", id: "ST006", class: "5-A" },
  { name: "Mason Wilson", id: "ST007", class: "5-A" },
  { name: "Isabella Moore", id: "ST008", class: "5-A" },
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
]

export function MealInput() {
  const [date, setDate] = useState<Date>()
  const [open, setOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState("")
  const [selectedFoods, setSelectedFoods] = useState<string[]>([])

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
          <Label htmlFor="meal-type">Meal Type</Label>
          <Select>
            <SelectTrigger id="meal-type">
              <SelectValue placeholder="Select meal type" />
            </SelectTrigger>
            <SelectContent>
              {mealTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Student</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
              {selectedStudent ? students.find((student) => student.id === selectedStudent)?.name : "Select student"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search student..." />
              <CommandList>
                <CommandEmpty>No student found.</CommandEmpty>
                <CommandGroup>
                  {students.map((student) => (
                    <CommandItem
                      key={student.id}
                      value={student.id}
                      onSelect={(currentValue) => {
                        setSelectedStudent(currentValue === selectedStudent ? "" : currentValue)
                        setOpen(false)
                      }}
                    >
                      <Check
                        className={cn("mr-2 h-4 w-4", selectedStudent === student.id ? "opacity-100" : "opacity-0")}
                      />
                      {student.name} ({student.class})
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Food Items</Label>
          <div className="relative w-1/3">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search foods..." className="pl-8" />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {foodItems.map((food) => (
            <Card key={food.name} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex items-center gap-2 p-4">
                  <input
                    type="checkbox"
                    id={`food-${food.name}`}
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
                    <Label htmlFor={`food-${food.name}`} className="font-medium">
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
        <Label htmlFor="notes">Additional Notes</Label>
        <Input id="notes" placeholder="Any special notes about this meal..." />
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save Meal Data</Button>
      </div>
    </div>
  )
}

