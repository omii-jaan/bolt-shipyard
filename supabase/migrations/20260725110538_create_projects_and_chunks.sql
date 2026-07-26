/*
# Create projects and chunks tables (single-tenant, no auth)

1. New Tables
- `projects`: top-level project container
  - id (uuid, pk)
  - name (text, not null)
  - description (text)
  - status (enum: draft, chunking, active, reviewing, shipped, archived) default 'active'
  - created_at, updated_at (timestamps)
- `chunks`: individual task nodes in the flowchart DAG
  - id (uuid, pk)
  - project_id (uuid, fk -> projects, cascade delete)
  - title (text, not null)
  - description (text)
  - status (enum: pending, claimed, in_progress, in_review, completed, blocked) default 'pending'
  - complexity (int 1-5)
  - estimated_hours (int)
  - assigned_to (text)
  - acceptance_criteria (jsonb array of {id, text, checked})
  - dependency_ids (uuid[] of other chunk ids in same project)
  - position_x (float, default 0) — canvas layout
  - position_y (float, default 0) — canvas layout
  - created_at, updated_at, completed_at (timestamps)

2. Indexes
- chunks by project_id
- chunks by status

3. Security
- RLS enabled on both tables.
- Single-tenant (no sign-in): anon + authenticated have full CRUD because data is intentionally shared/public.
*/

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('draft','chunking','active','reviewing','shipped','archived')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_projects" ON projects;
CREATE POLICY "anon_select_projects" ON projects FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_projects" ON projects;
CREATE POLICY "anon_insert_projects" ON projects FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_projects" ON projects;
CREATE POLICY "anon_update_projects" ON projects FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_projects" ON projects;
CREATE POLICY "anon_delete_projects" ON projects FOR DELETE
  TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS chunks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','claimed','in_progress','in_review','completed','blocked')),
  complexity integer CHECK (complexity BETWEEN 1 AND 5),
  estimated_hours integer,
  assigned_to text,
  acceptance_criteria jsonb DEFAULT '[]'::jsonb,
  dependency_ids uuid[] DEFAULT '{}',
  position_x double precision DEFAULT 0,
  position_y double precision DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

ALTER TABLE chunks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_chunks" ON chunks;
CREATE POLICY "anon_select_chunks" ON chunks FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_chunks" ON chunks;
CREATE POLICY "anon_insert_chunks" ON chunks FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_chunks" ON chunks;
CREATE POLICY "anon_update_chunks" ON chunks FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_chunks" ON chunks;
CREATE POLICY "anon_delete_chunks" ON chunks FOR DELETE
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_chunks_project_id ON chunks(project_id);
CREATE INDEX IF NOT EXISTS idx_chunks_status ON chunks(status);
