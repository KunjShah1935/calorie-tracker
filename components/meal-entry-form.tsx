"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Check, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export function MealEntryForm() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)

      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSuccess(false)
      }, 3000)
    }, 1500)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="childName">Child's Name</Label>
            <Input id="childName" placeholder="Enter child's name" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="class">Class/Grade</Label>
            <Input id="class" placeholder="e.g. Kindergarten, 1st Grade" />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Meal Type</Label>
          <RadioGroup defaultValue="breakfast" className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="breakfast" id="breakfast" />
              <Label htmlFor="breakfast" className="font-normal">
                Breakfast
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="lunch" id="lunch" />
              <Label htmlFor="lunch" className="font-normal">
                Lunch
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="dinner" id="dinner" />
              <Label htmlFor="dinner" className="font-normal">
                Dinner
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="snack" id="snack" />
              <Label htmlFor="snack" className="font-normal">
                Snack
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="mealItems">Food Items</Label>
          <Textarea
            id="mealItems"
            placeholder="List the food items included in the meal"
            className="min-h-[100px]"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="portionSize">Portion Size</Label>
            <Select defaultValue="medium">
              <SelectTrigger>
                <SelectValue placeholder="Select portion size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amountEaten">Amount Eaten</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select amount eaten" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="most">Most</SelectItem>
                <SelectItem value="half">About Half</SelectItem>
                <SelectItem value="little">Very Little</SelectItem>
                <SelectItem value="none">None</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Additional Notes</Label>
          <Textarea id="notes" placeholder="Any additional information about the meal or child's eating habits" />
        </div>

        <div className="flex justify-end">
          {isSuccess ? (
            <div className="flex items-center text-green-600 font-medium">
              <Check className="mr-2 h-4 w-4" />
              Meal information saved successfully!
            </div>
          ) : (
            <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Meal Information"
              )}
            </Button>
          )}
        </div>
      </div>
    </form>
  )
}

