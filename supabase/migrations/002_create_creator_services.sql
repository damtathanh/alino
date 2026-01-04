-- Create creator_services table
CREATE TABLE IF NOT EXISTS creator_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  price INTEGER NOT NULL CHECK (price >= 1 AND price <= 999999),
  description TEXT NOT NULL,
  deliverables TEXT[] NOT NULL,
  estimated_timeline TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('active', 'draft', 'hidden')) DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on user_id for faster queries
CREATE INDEX IF NOT EXISTS idx_creator_services_user_id ON creator_services(user_id);

-- Create index on status for filtering
CREATE INDEX IF NOT EXISTS idx_creator_services_status ON creator_services(status);

-- Enable RLS
ALTER TABLE creator_services ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own services
CREATE POLICY "Users can read their own services"
  ON creator_services
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own services
CREATE POLICY "Users can insert their own services"
  ON creator_services
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own services
CREATE POLICY "Users can update their own services"
  ON creator_services
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own services
CREATE POLICY "Users can delete their own services"
  ON creator_services
  FOR DELETE
  USING (auth.uid() = user_id);

-- Policy: Public can read active services (for public profile viewing)
CREATE POLICY "Public can read active services"
  ON creator_services
  FOR SELECT
  USING (status = 'active');

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_creator_services_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_creator_services_updated_at
  BEFORE UPDATE ON creator_services
  FOR EACH ROW
  EXECUTE FUNCTION update_creator_services_updated_at();

