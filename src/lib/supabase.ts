import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type ChunkStatus = 'pending' | 'claimed' | 'in_progress' | 'in_review' | 'completed' | 'blocked'

export interface AcceptanceCriterion {
  id: string
  text: string
  checked: boolean
}

export interface Chunk {
  id: string
  project_id: string
  title: string
  description: string | null
  status: ChunkStatus
  complexity: number | null
  estimated_hours: number | null
  assigned_to: string | null
  acceptance_criteria: AcceptanceCriterion[]
  dependency_ids: string[]
  position_x: number
  position_y: number
  created_at: string
  updated_at: string
  completed_at: string | null
}

export interface Project {
  id: string
  name: string
  description: string | null
  status: string
  created_at: string
  updated_at: string
}
