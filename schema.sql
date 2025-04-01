-- Create profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('student', 'parent', 'teacher', 'healthcare')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create health_data table
CREATE TABLE health_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  height NUMERIC NOT NULL, -- in cm
  weight NUMERIC NOT NULL, -- in kg
  age INTEGER NOT NULL,
  bmi NUMERIC NOT NULL,
  daily_calories INTEGER,
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create meal_logs table
CREATE TABLE meal_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  meal_type TEXT NOT NULL CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack')),
  description TEXT NOT NULL,
  calories INTEGER,
  protein NUMERIC, -- in grams
  carbs NUMERIC, -- in grams
  fat NUMERIC, -- in grams
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create student_parent relationship table
CREATE TABLE student_parent (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  UNIQUE(student_id, parent_id)
);

-- Create student_teacher relationship table
CREATE TABLE student_teacher (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  teacher_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  class_name TEXT,
  UNIQUE(student_id, teacher_id)
);

-- Create RLS policies
-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE meal_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_parent ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_teacher ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Health data policies
CREATE POLICY "Students can insert their own health data"
  ON health_data FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Students can view their own health data"
  ON health_data FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Parents can view their children's health data"
  ON health_data FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM student_parent
    WHERE parent_id = auth.uid() AND student_id = health_data.user_id
  ));

CREATE POLICY "Teachers can view their students' health data"
  ON health_data FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM student_teacher
    WHERE teacher_id = auth.uid() AND student_id = health_data.user_id
  ));

CREATE POLICY "Healthcare professionals can view all health data"
  ON health_data FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'healthcare'
  ));

-- Similar policies for meal_logs and other tables

