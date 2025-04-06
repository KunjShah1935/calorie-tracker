"use client"

import { useState } from "react"
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

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

const classes = [
  { name: "Class 5-A", id: "5-A" },
  { name: "Class 5-B", id: "5-B" },
  { name: "Class 4-A", id: "4-A" },
  { name: "Class 4-B", id: "4-B" },
  { name: "Class 3-A", id: "3-A" },
]

export function AttendanceInput() {
  const [date, setDate] = useState<Date>()
  const [open, setOpen] = useState(false)
  const [selectedClass, setSelectedClass] = useState("")
  const [attendanceType, setAttendanceType] = useState("class")
  const [studentAttendance, setStudentAttendance] = useState<Record<string, "present" | "absent" | "late">>({})

  const handleAttendanceChange = (studentId: string, status: "present" | "absent" | "late") => {
    setStudentAttendance({
      ...studentAttendance,
      [studentId]: status,
    })
  }

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
          <Label>Attendance Type</Label>
          <RadioGroup defaultValue="class" className="flex" onValueChange={(value) => setAttendanceType(value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="class" id="class" />
              <Label htmlFor="class">Class</Label>
            </div>
            <div className="flex items-center space-x-2 ml-4">
              <RadioGroupItem value="individual" id="individual" />
              <Label htmlFor="individual">Individual</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      {attendanceType === "class" ? (
        <div className="space-y-2">
          <Label>Class</Label>
          <Select onValueChange={setSelectedClass}>
            <SelectTrigger>
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent>
              {classes.map((cls) => (
                <SelectItem key={cls.id} value={cls.id}>
                  {cls.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ) : (
        <div className="space-y-2">
          <Label>Student</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
                {selectedClass ? students.find((student) => student.id === selectedClass)?.name : "Select student"}
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
                          setSelectedClass(currentValue === selectedClass ? "" : currentValue)
                          setOpen(false)
                        }}
                      >
                        <Check
                          className={cn("mr-2 h-4 w-4", selectedClass === student.id ? "opacity-100" : "opacity-0")}
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
      )}

      {attendanceType === "class" && selectedClass && (
        <div className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reason (if absent)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students
                  .filter((student) => student.class === selectedClass)
                  .map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>
                        <Select
                          onValueChange={(value) =>
                            handleAttendanceChange(student.id, value as "present" | "absent" | "late")
                          }
                        >
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="present">Present</SelectItem>
                            <SelectItem value="absent">Absent</SelectItem>
                            <SelectItem value="late">Late</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        {studentAttendance[student.id] === "absent" && <Input placeholder="Reason for absence" />}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {attendanceType === "individual" && selectedClass && (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Status</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="present">Present</SelectItem>
                  <SelectItem value="absent">Absent</SelectItem>
                  <SelectItem value="late">Late</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Time</Label>
              <Input type="time" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Reason (if absent)</Label>
            <Textarea placeholder="Enter reason for absence" />
          </div>
        </div>
      )}

      <div className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save Attendance</Button>
      </div>
    </div>
  )
}

