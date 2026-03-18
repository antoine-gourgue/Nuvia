-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- User profiles
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  biological_sex VARCHAR(10) NOT NULL CHECK (biological_sex IN ('male', 'female')),
  age INTEGER NOT NULL CHECK (age > 0 AND age < 150),
  height_cm NUMERIC(5,1) NOT NULL CHECK (height_cm > 0),
  weight_kg NUMERIC(5,1) NOT NULL CHECK (weight_kg > 0),
  target_weight_kg NUMERIC(5,1),
  goal_type VARCHAR(20) NOT NULL CHECK (goal_type IN ('lose', 'maintain', 'gain')),
  activity_level VARCHAR(20) NOT NULL CHECK (activity_level IN ('sedentary', 'light', 'moderate', 'active', 'very_active')),
  daily_calorie_target INTEGER NOT NULL CHECK (daily_calorie_target > 0),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Meal entries
CREATE TABLE IF NOT EXISTS meal_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(120) NOT NULL,
  meal_type VARCHAR(20) NOT NULL CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack')),
  calories INTEGER NOT NULL CHECK (calories >= 0),
  protein NUMERIC(8,2) NOT NULL CHECK (protein >= 0),
  carbs NUMERIC(8,2) NOT NULL CHECK (carbs >= 0),
  fat NUMERIC(8,2) NOT NULL CHECK (fat >= 0),
  serving_grams NUMERIC(8,2) NOT NULL CHECK (serving_grams > 0),
  entry_date DATE NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Weight entries
CREATE TABLE IF NOT EXISTS weight_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  weight_kg NUMERIC(5,1) NOT NULL CHECK (weight_kg > 0),
  entry_date DATE NOT NULL,
  note VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_meal_entries_user_date ON meal_entries(user_id, entry_date);
CREATE INDEX IF NOT EXISTS idx_weight_entries_user_date ON weight_entries(user_id, entry_date);
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);

-- Unique constraint: one weight entry per user per day
CREATE UNIQUE INDEX IF NOT EXISTS idx_weight_entries_unique_day ON weight_entries(user_id, entry_date);
