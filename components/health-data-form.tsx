"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export function HealthDataForm() {
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [age, setAge] = useState("")
  const [dailyCalories, setDailyCalories] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClientComponentClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setError("You must be logged in to submit health data")
        return
      }

      // Calculate BMI
      const heightInMeters = Number.parseFloat(height) / 100
      const weightInKg = Number.parseFloat(weight)
      const bmi = weightInKg / (heightInMeters * heightInMeters)

      const { error: insertError } = await supabase.from("health_data").insert([
        {
          user_id: user.id,
          height: Number.parseFloat(height),
          weight: Number.parseFloat(weight),
          age: Number.parseInt(age),
          bmi: Number.parseFloat(bmi.toFixed(2)),
          daily_calories: dailyCalories ? Number.parseInt(dailyCalories) : null,
          recorded_at: new Date().toISOString(),
        },
      ])

      if (insertError) {
        setError(insertError.message)
        return
      }

      setSuccess("Health data submitted successfully")
    } catch (error) {
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Health Data Entry</CardTitle>
          <CardDescription>Enter your current health metrics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                step="0.1"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input id="age" type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dailyCalories">Daily Calories (optional)</Label>
              <Input
                id="dailyCalories"
                type="number"
                value={dailyCalories}
                onChange={(e) => setDailyCalories(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit Health Data"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

