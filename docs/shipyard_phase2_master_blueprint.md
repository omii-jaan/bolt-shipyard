# SHIPYARD — PHASE 2 MASTER BLUEPRINT
## The Collaboration Yard, Chunking Engine & Flowchart OS

**Version:** 1.0  
**Classification:** Internal Technical Specification  
**Scope:** Deep-dive architecture for Phase 2 (Post-Showcase / Identity Layer)  

---

## 0. EXECUTIVE SUMMARY

Shipyard is not a freelancer marketplace. It is the **Global Developer Identity Core** — a three-layer platform:

1. **Layer 1 (Identity):** Unified builder profiles anchoring X, GitHub, YouTube, Instagram, shipped products.
2. **Layer 2 (Intelligence):** Tool discovery, ranking, and reputation graph.
3. **Layer 3 (Execution):** The Collaboration Yard — where matched teams actually build, track, and ship.

**Phase 2 builds Layer 3.** The core insight driving this phase: *All AI coding tools are converging to parity.* The only durable human advantage is **systems thinking** — the ability to decompose a vision into chunked, sequenced, executable tasks. Shipyard captures, visualizes, and orchestrates this chunking process.

**The North Star:** A builder enters the Yard with an idea. The AI Chunking Engine decomposes it into a living Flowchart. The builder codes locally (with any AI tool). The Local Dev Bridge tracks execution against the Flowchart. The Team Hub syncs technical and marketing work. One button publishes. The Flowchart becomes the permanent artifact of how the thing was built.

---

## 1. CORE PHILOSOPHY: WHY CHUNKING BEATS PROMING

### 1.1 The Problem
Current AI coding tools (Claude Code, Cursor, GitHub Copilot, etc.) share a fatal flaw: they treat code generation as a conversation, not a construction project. Users burn tokens on circular reasoning, context loss, and architectural drift because there is no persistent, visual, executable plan.

### 1.2 The Insight
The builders who ship real products do not "chat" with AI. They:
1. Decompose the system into discrete, testable chunks.
2. Sequence those chunks by dependency.
3. Execute one chunk at a time, validating before proceeding.
4. Maintain a living map of what is done, what is active, and what is next.

This is how senior engineers work. Shipyard productizes this discipline.

### 1.3 The Shipyard Method
- **Input:** Project owner describes the vision (prompt or structured template).
- **Bifurcation:** The Chunking Engine breaks the vision into a directed graph of tasks (the Flowchart).
- **Execution:** Builders claim chunks, code locally, and the Local Dev Bridge verifies completion.
- **Visualization:** The Flowchart updates in real-time — green for done, pulsing for active, gray for pending.
- **Collaboration:** Marketing, design, and technical teams share the same Flowchart view, aligned on state.

---

## 2. ARCHITECTURE OVERVIEW

```
┌─────────────────────────────────────────────────────────────────┐
│                     SHIPYARD PHASE 2                            │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐ │
│  │   WEB APP    │  │   WEB APP    │  │     LOCAL DEV          │ │
│  │  (Project    │  │   (Builder   │  │     BRIDGE             │ │
│  │   Owner)     │  │   View)      │  │  (MCP Agent / CLI)     │ │
│  └──────┬───────┘  └──────┬───────┘  └──────────┬─────────────┘ │
│         │                 │                     │               │
│         └─────────────────┼─────────────────────┘               │
│                           │                                     │
│              ┌────────────┴────────────┐                        │
│              │   COLLABORATION YARD    │                        │
│              │      (Backend Core)       │                        │
│              ├───────────────────────────┤                        │
│              │  ┌─────────────────────┐  │                        │
│              │  │  CHUNKING ENGINE    │  │                        │
│              │  │  (AI Task Parser)     │  │                        │
│              │  └─────────────────────┘  │                        │
│              │  ┌─────────────────────┐  │                        │
│              │  │  FLOWCHART OS       │  │                        │
│              │  │  (Visual Graph DB)    │  │                        │ │
│              │  └─────────────────────┘  │                        │
│              │  ┌─────────────────────┐  │                        │
│              │  │  TEAM HUB           │  │                        │
│              │  │  (Channels + Tasks)   │  │                        │
│              │  └─────────────────────┘  │                        │
│              │  ┌─────────────────────┐  │                        │
│              │  │  DEPLOYMENT         │  │                        │
│              │  │  ORCHESTRATOR       │  │                        │
│              │  └─────────────────────┘  │                        │
│              └───────────────────────────┘                        │
│                           │                                     │
│              ┌────────────┴────────────┐                        │
│              │      DATA LAYER         │                        │
│              │  PostgreSQL + Redis     │                        │
│              │  + Vector DB (Chunks)     │                        │
│              └───────────────────────────┘                        │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. SUB-PHASE 2.1: THE CHUNKING ENGINE

### 3.1 Purpose
Transform a project description (prompt or template) into a formal, executable directed acyclic graph (DAG) of development tasks.

### 3.2 Input Channels

| Channel | Format | User Type |
|---------|--------|-----------|
| **Free Prompt** | Natural language description | Project owners who know what they want but not how to build it |
| **Structured Template** | Pre-defined fields (Project Type, Tech Stack, Features, Timeline) | Project owners who want faster, more predictable output |
| **Import from Layer 1** | Auto-populated from builder's tool stack and past projects | Returning users with existing Shipyard profiles |

### 3.3 The Bifurcation Pipeline

```
Input (Prompt/Template)
    │
    ▼
┌─────────────────┐
│ INTENT PARSER   │  ← LLM call #1: Extract entities
│ (NLP Layer)     │     • Project type (SaaS, Mobile, API, etc.)
└────────┬────────┘     • Core features (semantic list)
         │              • Tech stack preferences
         │              • Constraints (budget, timeline, compliance)
         ▼
┌─────────────────┐
│ ARCHITECTURE    │  ← LLM call #2: Generate system design
│ GENERATOR       │     • High-level modules (Auth, DB, API, UI, etc.)
└────────┬────────┘     • Data model sketch
         │              • API contract outline
         ▼
┌─────────────────┐
│ CHUNK DECOMPOSER│  ← LLM call #3: Break into executable chunks
│ (The Core)      │     • Each chunk = 1 task with:
└────────┬────────┘       - unique_id
         │                - title (max 80 chars)
         │                - description (what "done" looks like)
         │                - estimated_complexity (1-5)
         │                - dependencies (list of chunk_ids)
         │                - required_skills (vector tags)
         │                - acceptance_criteria (checklist)
         ▼
┌─────────────────┐
│ DAG VALIDATOR   │  ← Algorithmic layer
│                 │     • Detect circular dependencies
└────────┬────────┘     • Flag impossible sequences
         │              • Estimate critical path length
         ▼
┌─────────────────┐
│ HUMAN-IN-LOOP   │  ← Builder/Owner reviews and edits
│ REVIEW          │     • Drag to reorder
└─────────────────┘     • Merge/split chunks
                        • Add/remove dependencies
                        • Approve → becomes Flowchart
```

### 3.4 Chunk Schema (Database)

```sql
CREATE TABLE chunks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id),

    -- Identity
    title VARCHAR(120) NOT NULL,
    description TEXT NOT NULL,
    slug VARCHAR(140) UNIQUE NOT NULL, -- URL-safe identifier

    -- Graph Position
    parent_chunk_id UUID REFERENCES chunks(id), -- for nested sub-chunks
    dependency_ids UUID[] DEFAULT '{}', -- DAG edges
    layer INTEGER NOT NULL DEFAULT 0, -- topological sort layer (0 = no deps)

    -- Execution State
    status chunk_status NOT NULL DEFAULT 'pending',
    -- ENUM: pending, claimed, in_progress, in_review, completed, blocked

    -- Assignment
    assigned_to UUID REFERENCES users(id),
    claimed_at TIMESTAMP,

    -- Metadata
    complexity INTEGER CHECK (complexity BETWEEN 1 AND 5),
    estimated_hours INTEGER,
    actual_hours INTEGER DEFAULT 0, -- from Local Dev Bridge
    required_skills TEXT[], -- vector search tags

    -- Acceptance
    acceptance_criteria JSONB DEFAULT '[]', -- array of {id, text, checked}

    -- Audit
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP
);

-- Index for DAG traversal
CREATE INDEX idx_chunks_project_layer ON chunks(project_id, layer);
CREATE INDEX idx_chunks_status ON chunks(status);
CREATE INDEX idx_chunks_assigned ON chunks(assigned_to, status);
```

### 3.5 Why This Matters
Without chunking, AI-assisted development is a black box. With chunking, every project has a **persistent, inspectable, shareable plan**. This plan becomes:
- The contract between project owner and builder.
- The progress tracker for stakeholders.
- The learning artifact for future builders ("How was X built?" → view the Flowchart).
- The reputation signal (builders who consistently complete complex chunks rank higher).

---

## 4. SUB-PHASE 2.2: THE FLOWCHART OS

### 4.1 Purpose
A real-time, interactive visual interface where the Chunk DAG becomes a living map of the project. Inspired by Google Notebook LM's flowcharts, but for execution, not just documentation.

### 4.2 Visual Design Specification

**Canvas:**
- Infinite pan/zoom canvas (like Figma, Miro)
- Background: `bg-primary` (#050508) with subtle dot grid at `rgba(255,255,255,0.03)`
- Chunk nodes snap to 8px grid

**Node Design (Per Chunk):**
```
┌─────────────────────────────────────┐
│  ● Status Dot    Chunk Title        │  ← 16px padding, rounded-xl (12px)
│  [=========>]    3/5 checks done    │  ← Progress bar, 4px height
│  @builder_name   ~4h remaining      │  ← Meta row, text-muted
└─────────────────────────────────────┘
     │
     │ Dependency line (animated if active)
     ▼
```

**Node States:**
| State | Visual Treatment | Animation |
|-------|-----------------|-----------|
| **Pending** | Border `border-default`, bg `bg-card` | Static |
| **Claimed** | Border `accent-blue` at 50% opacity | Slow pulse (2s) |
| **In Progress** | Border `accent-blue` solid, glow shadow | Active pulse (1s), subtle float |
| **In Review** | Border `accent-pink` dashed | Gentle shake every 5s |
| **Completed** | Border `green-500` solid, checkmark icon | Fill animation left-to-right |
| **Blocked** | Border `red-500` solid, muted bg | Static, red dot indicator |

**Connection Lines:**
- Color: `rgba(255,255,255,0.1)` default, `accent-blue` when upstream is active
- Thickness: 2px
- Curved bezier (not straight lines) for organic feel
- Animated dash flow when data/dependency is "moving"

**Interaction Patterns:**
- **Click node:** Slide-out drawer with full chunk details, code links, comments, time logs
- **Drag node:** Reorganize layout (does NOT change dependencies — purely visual)
- **Double-click:** Enter "focus mode" — zoom to node + immediate children only
- **Right-click:** Context menu (Claim, Assign, Block, Add sub-chunk)
- **Hover upstream:** Highlight all dependent nodes ("what breaks if this fails?")
- **Hover downstream:** Highlight all blocking nodes ("what unlocks when this is done?")

### 4.3 The "Bathroom Test" Feature
You mentioned: *"when they come back from the bathroom, they know exactly what the next step is."*

This is not a joke. It is a core UX requirement.

**Implementation:**
- **Persistent "Next Action" Banner:** Fixed at bottom of screen, always visible.
  - Shows: "Next: Set up OAuth middleware (Chunk #4) — estimated 3h"
  - One-click "Start This Chunk" → updates status, starts Local Dev Bridge timer
- **Session Recovery:** When builder returns after idle (>15 min), a modal summarizes:
  - What was completed since they left
  - What is currently active
  - What is blocked and why
  - Suggested next chunk based on dependency graph
- **Audio Cue (optional):** Soft chime when a dependency chunk completes ("your blocker is resolved").

### 4.4 Tick-Mark Synchronization
- Each chunk has acceptance criteria (checkboxes).
- When a builder completes a criterion in their local environment (verified by test or manual check), the Flowchart updates in real-time via WebSocket.
- When ALL criteria for a chunk are ticked, the chunk auto-moves to "In Review."
- When the chunk is approved (by project owner or auto-approved if no owner review required), downstream chunks unlock and their borders animate from gray to blue.

### 4.5 Technical Stack for Flowchart OS

| Layer | Technology | Reason |
|-------|-----------|--------|
| **Renderer** | React + HTML5 Canvas (via Fabric.js or PixiJS) | 60fps pan/zoom with 500+ nodes |
| **State Sync** | WebSocket (Socket.io or native WS) | Real-time updates across all viewers |
| **Layout Engine** | Dagre (DAG layout) + manual overrides | Automatic topological sorting, manual nudges saved |
| **Persistence** | Chunk positions stored as JSONB per user view | Each user can save custom layouts |
| **Collaboration** | Yjs CRDT | Multiple users dragging nodes simultaneously without conflict |

---

## 5. SUB-PHASE 2.3: LOCAL DEV BRIDGE (MCP AGENT)

### 5.1 Purpose
Connect the builder's local development environment to the Collaboration Yard without forcing them to change their workflow. They use Claude Code, Cursor, terminal, VS Code — whatever. Shipyard observes, tracks, and reports.

### 5.2 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    BUILDER'S LOCAL MACHINE                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ VS Code  │  │ Terminal │  │Claude Code│  │  Cursor  │   │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘   │
│       │             │             │             │           │
│       └─────────────┴─────────────┴─────────────┘           │
│                         │                                   │
│              ┌──────────┴──────────┐                        │
│              │   SHIPYARD AGENT    │                        │
│              │   (Local Daemon)    │                        │
│              │  • File watcher     │                        │
│              │  • Git hook parser   │                        │
│              │  • Terminal logger   │                        │
│              │  • MCP server        │                        │
│              └──────────┬──────────┘                        │
│                         │                                   │
│              ┌──────────┴──────────┐                        │
│              │   LOCAL SQLITE DB   │                        │
│              │  (Offline buffer)   │                        │
│              └─────────────────────┘                        │
└─────────────────────────┬───────────────────────────────────┘
                          │ HTTPS / WebSocket (encrypted)
                          ▼
┌─────────────────────────────────────────────────────────────┐
│              SHIPYARD COLLABORATION YARD                    │
│              (Cloud Backend)                                  │
└─────────────────────────────────────────────────────────────┘
```

### 5.3 The Agent (Local Daemon)

**Name:** `shipyard-agent` (npm package: `@shipyard/agent`)
**Install:** `npx @shipyard/agent init` — generates config, hooks into shell, installs MCP.

**Core Modules:**

#### A. File System Watcher
- Watches the project directory (respects `.gitignore`)
- Tracks: file creation, modification, deletion, renames
- Batches events into "sessions" (activity within 5 min of each other = one session)
- Maps file changes to chunks via heuristic:
  - If `git commit -m "feat: add OAuth"` → matches chunk titled "Implement OAuth"
  - If file path contains `auth/` → matches chunks tagged with `auth`
  - Builder can manually link a file/session to a chunk via CLI: `shipyard link --chunk=uuid`

#### B. Git Integration
- Parses commit messages for chunk references (`[chunk:uuid]` or auto-inferred)
- Tracks commit frequency, lines changed, files touched
- Measures "velocity" per chunk: commits/hour, lines/hour (not for billing — for Flowchart health)

#### C. Terminal Logger
- Optional opt-in (privacy-first)
- Logs command history (not output, just commands: `npm install`, `docker build`, etc.)
- Identifies tech stack signals (sees `cargo build` → Rust project, `pip install` → Python)
- Reports time spent in terminal per session

#### D. MCP Server (Model Context Protocol)
- Exposes Shipyard context TO the AI coding tool:
  - "Current active chunk: Implement OAuth middleware"
  - "Acceptance criteria: [list]"
  - "Dependencies completed: [list]"
  - "Tech stack: Next.js, Prisma, PostgreSQL"
- The AI assistant (Claude, etc.) reads this context and generates code that FITS the chunk, not random exploration.
- This is the **anti-token-waste mechanism**: the AI knows exactly what micro-task it is solving.

#### E. Time Tracker
- Automatically starts when file activity detected in project directory
- Pauses after 5 min idle (no file saves, no terminal input)
- Reports: `actual_hours` to the chunk record
- **Anti-gaming:**
  - Must have file changes OR git commits to count time
  - Pure idle time (>15 min) auto-discarded
  - Random screenshot audit (optional, configurable by project owner)

### 5.4 Privacy & Security
- All data encrypted in transit (TLS 1.3)
- Local SQLite buffer: works offline, syncs when reconnected
- Builder controls granularity:
  - Level 1: Time only (no file names, no code)
  - Level 2: File names + commit messages (no code content)
  - Level 3: Full diff sharing (for open-source or trusted teams)
- Project owners see only what builders consent to share

### 5.5 Why This Matters
Current time-tracking tools (Toggl, Harvest) require manual entry. Current git analytics (GitHub Insights) are retrospective. The Local Dev Bridge is **ambient, real-time, and chunk-aware.** It knows not just that you coded for 4 hours, but that you spent 1.5h on Auth (Chunk #3) and 2.5h on Database (Chunk #7) — and whether you met the acceptance criteria.

---

## 6. SUB-PHASE 2.4: TEAM HUB (MULTI-DISCIPLINE WORKSPACE)

### 6.1 Purpose
The Collaboration Yard is not just for coders. Marketing, design, product, and technical teams share one space, aligned on the same Flowchart.

### 6.2 Channel Architecture

Each project has default channels:

| Channel | Purpose | Participants |
|---------|---------|--------------|
| **#general** | Project-wide announcements, standups | Everyone |
| **#flowchart** | Read-only mirror of Flowchart updates (bot-posted) | Everyone |
| **#technical** | Code discussion, architecture decisions | Builders, Tech Lead |
| **#marketing** | Launch copy, social strategy, landing page reviews | Marketers, PM |
| **#reviews** | Chunk completion reviews, approvals | Project Owner, QA |
| **#random** | Culture, off-topic | Everyone |

**Custom channels** can be created per project.

### 6.3 The "One Button Live" System

When a project reaches a deployable state (configurable: all chunks done, or critical path done, or manual trigger):

```
┌──────────────────────────────────────────┐
│  [ 🚀 SHIP IT ]  ← Big button, always    │
│                  visible in top-right     │
└──────────────────────────────────────────┘
```

**Click triggers:**
1. **Pre-flight Check:**
   - All chunks marked complete?
   - Tests passing? (if CI connected)
   - Environment variables set?
   - Marketing assets ready? (checklist)
2. **Deployment Pipeline:**
   - If Next.js/Vercel: auto-detects `vercel.json`, deploys via API
   - If Docker: builds image, pushes to registry, triggers ECS/K8s
   - If static: uploads to CDN (Cloudflare/Netlify)
   - If mobile: triggers Expo/EAS build or TestFlight
3. **Post-Deploy:**
   - Flowchart gets a "Shipped" badge
   - Project status updates to "Live"
   - Marketing channel auto-posts: "🚀 [Project] is now live at [URL]"
   - Builder profiles get +1 "Shipped Project" reputation

**The Button is context-aware:**
- If marketing assets missing → button is yellow, says "Almost Ready — 2 marketing tasks pending"
- If tests failing → button is red, disabled, shows "Fix 3 failing tests"
- If all green → button pulses with gradient glow (your lightning blue → soft pink)

### 6.4 Role-Based Views

**Builder View:**
- Flowchart focused on assigned chunks
- Local Dev Bridge status panel
- Technical channel + DMs

**Project Owner View:**
- Full Flowchart with all assignments
- Budget/time dashboard
- Review queue (chunks pending approval)
- "Ship It" button control

**Marketing View:**
- Flowchart filtered to "marketing chunks" (copy, assets, launch checklist)
- Asset upload panel (logos, screenshots, videos)
- Social preview generator (auto-creates OG images from project data)

---

## 7. SUB-PHASE 2.5: EMAIL & COLD OUTREACH INFRASTRUCTURE

### 7.1 Purpose
Every builder gets `name@shipyard.dev`. This is not just email — it is an **identity-verified outreach channel** that surfaces Shipyard context at the point of contact.

### 7.2 Email Provisioning

**Technical:**
- Subdomain: `shipyard.dev` managed via AWS SES or Resend
- Each user: `firstname.lastname@shipyard.dev` or `username@shipyard.dev`
- Inbound email parsed and forwarded to user's personal email (Gmail, etc.)
- Outbound email sent through Shipyard SMTP with DKIM/SPF/DMARC

**The Magic:**
When someone receives an email from `sarah.chen@shipyard.dev`:
- The email footer contains a Shipyard badge: "Verify on Shipyard →"
- Clicking opens the sender's Shipyard profile
- The recipient sees: shipped projects, tool expertise, Flowcharts of past work, reputation score

### 7.3 The Outreach Workflow

**Scenario: Project Owner wants to recruit a specific builder**

1. Search builder in Shipyard directory
2. Click "Invite to Collaborate"
3. System pre-fills invitation with:
   - Project summary
   - Chunk breakdown (auto-generated)
   - Estimated scope
   - Compensation terms (if any)
4. Builder receives email + in-platform notification
5. Builder clicks email → lands on Project Preview page (read-only Flowchart)
6. Builder accepts → enters Collaboration Yard

**Scenario: Builder cold-emails a company for work**

1. Builder composes email in their own client (Gmail, etc.)
2. Uses `sarah.chen@shipyard.dev` as From address
3. Recipient sees Shipyard verification badge
4. Recipient clicks → sees builder's full profile, shipped products, tool rankings
5. Trust is established instantly without resume exchange

### 7.4 Anti-Spam Guardrails
- Rate limit: max 20 cold emails/day per builder
- Reputation penalty for no-response rate >70%
- Recipients can "Flag" spam → human review
- Verified badge revoked for abuse

---

## 8. DATA MODEL (CORE TABLES)

### 8.1 Projects
```sql
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID NOT NULL REFERENCES users(id),

    -- Identity
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(220) UNIQUE NOT NULL,
    description TEXT,

    -- State
    status project_status NOT NULL DEFAULT 'draft',
    -- ENUM: draft, chunking, active, reviewing, shipped, archived

    -- Visibility
    visibility visibility_type NOT NULL DEFAULT 'private',
    -- ENUM: private, unlisted, public

    -- Tech Stack (auto-detected + manual)
    tech_stack JSONB DEFAULT '[]',

    -- Layer 2 Integration
    featured_tools UUID[] DEFAULT '{}', -- references tool_directory

    -- Metadata
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    shipped_at TIMESTAMP
);
```

### 8.2 Users (Builders & Owners)
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Identity
    username VARCHAR(50) UNIQUE NOT NULL,
    display_name VARCHAR(100),
    email VARCHAR(255) UNIQUE NOT NULL, -- personal email
    shipyard_email VARCHAR(255) UNIQUE, -- username@shipyard.dev

    -- Anchored Profiles (Layer 1)
    social_links JSONB DEFAULT '{}',
    -- { twitter: "...", github: "...", youtube: "...", instagram: "..." }

    -- Reputation
    reputation_score INTEGER DEFAULT 0,
    shipped_projects_count INTEGER DEFAULT 0,
    total_chunks_completed INTEGER DEFAULT 0,

    -- Skills (vector tags for matching)
    skills TEXT[],

    -- Settings
    dev_bridge_level INTEGER DEFAULT 2, -- privacy level

    created_at TIMESTAMP DEFAULT NOW()
);
```

### 8.3 Collaborations (Match Records)
```sql
CREATE TABLE collaborations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id),
    builder_id UUID NOT NULL REFERENCES users(id),

    -- Role
    role collaboration_role NOT NULL DEFAULT 'builder',
    -- ENUM: owner, tech_lead, builder, marketer, designer

    -- State
    status collab_status NOT NULL DEFAULT 'pending',
    -- ENUM: invited, accepted, active, paused, completed

    -- Compensation (flexible)
    compensation_type comp_type, -- hourly, fixed, equity, passion
    compensation_amount DECIMAL,

    invited_at TIMESTAMP DEFAULT NOW(),
    accepted_at TIMESTAMP,

    UNIQUE(project_id, builder_id)
);
```

### 8.4 Time Logs (from Local Dev Bridge)
```sql
CREATE TABLE time_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chunk_id UUID NOT NULL REFERENCES chunks(id),
    builder_id UUID NOT NULL REFERENCES users(id),

    started_at TIMESTAMP NOT NULL,
    ended_at TIMESTAMP,
    duration_minutes INTEGER,

    -- Source
    source log_source NOT NULL DEFAULT 'dev_bridge',
    -- ENUM: dev_bridge, manual_entry, review_time

    -- Evidence (privacy-respecting)
    evidence JSONB DEFAULT '{}',
    -- { file_changes: 12, commits: 3, commands: ["npm test"] }

    created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 9. API ARCHITECTURE

### 9.1 REST Endpoints (Core)

```
POST   /api/v1/projects                    → Create project
GET    /api/v1/projects/:id                → Get project + Flowchart
PUT    /api/v1/projects/:id/chunk          → Trigger Chunking Engine
GET    /api/v1/projects/:id/chunks         → List all chunks (DAG)
POST   /api/chunks/:id/claim            → Builder claims chunk
POST   /api/chunks/:id/complete         → Submit for review
POST   /api/chunks/:id/approve          → Owner approves chunk
GET    /api/flowchart/:project_id       → Get node positions + edges
PUT    /api/flowchart/:project_id       → Update node positions
POST   /api/collaborations              → Send invitation
PUT    /api/collaborations/:id/accept   → Accept invitation
POST   /api/ship                        → Trigger "One Button Live"
GET    /api/users/:username/profile     → Public builder profile
POST   /api/search/builders             → Semantic search (AI matching)
```

### 9.2 WebSocket Events (Real-Time)

```javascript
// Client subscribes to project room
socket.emit('join', { project_id: 'uuid' });

// Events pushed from server:
'chunk:claimed'       → { chunk_id, builder_id, builder_name }
'chunk:completed'     → { chunk_id, completed_at }
'chunk:approved'      → { chunk_id, approver_id }
'chunk:blocked'       → { chunk_id, reason }
'flowchart:update'    → { node_id, position, status }
'time:log'            → { chunk_id, builder_id, minutes_added }
'message:new'         → { channel_id, message }
'project:shipped'     → { url, shipped_at }
```

### 9.3 MCP Server Protocol

The Local Dev Bridge exposes an MCP server that AI assistants query:

```json
// MCP Tool: get_active_chunk
{
  "name": "get_active_chunk",
  "description": "Get the current active chunk for the project",
  "input_schema": {
    "type": "object",
    "properties": {
      "project_id": { "type": "string" }
    }
  }
}

// Response:
{
  "chunk_id": "uuid",
  "title": "Implement OAuth Middleware",
  "description": "...",
  "acceptance_criteria": [...],
  "dependencies_completed": true,
  "tech_stack": ["Next.js", "NextAuth", "Prisma"]
}
```

This prevents the AI from hallucinating architecture decisions that violate the Chunking plan.

---

## 10. IMPLEMENTATION ROADMAP

### Sprint 0: Foundation (Weeks 1-2)
- [ ] Set up monorepo (Next.js + Node.js + PostgreSQL + Redis)
- [ ] Design token system (your lightning blue + soft pink palette locked)
- [ ] Auth system (GitHub OAuth primary, email secondary)
- [ ] User profile schema + social anchor links
- [ ] Basic project CRUD

### Sprint 1: Chunking Engine MVP (Weeks 3-4)
- [ ] Prompt/template input UI
- [ ] LLM integration (OpenRouter → Nemotron 3 Ultra or Claude)
- [ ] DAG generation + validation
- [ ] Human-in-loop review UI (drag-drop reorder, edit chunks)
- [ ] Chunk persistence + schema

### Sprint 2: Flowchart OS MVP (Weeks 5-6)
- [ ] Canvas renderer (React + Canvas)
- [ ] Node component (all 6 states)
- [ ] Connection lines (bezier, animated)
- [ ] Pan/zoom/focus mode
- [ ] WebSocket real-time sync
- [ ] "Next Action" banner + session recovery

### Sprint 3: Local Dev Bridge MVP (Weeks 7-8)
- [ ] `@shipyard/agent` npm package scaffold
- [ ] File watcher module
- [ ] Git hook parser
- [ ] Time tracker (idle detection)
- [ ] MCP server (context exposure)
- [ ] SQLite local buffer + cloud sync
- [ ] Privacy level controls

### Sprint 4: Team Hub & Communication (Weeks 9-10)
- [ ] Channel system (default + custom)
- [ ] Message persistence + threads
- [ ] Role-based views
- [ ] Flowchart bot (auto-posts updates to #flowchart)

### Sprint 5: One Button Live (Weeks 11-12)
- [ ] Deployment detector (Vercel, Netlify, Docker, etc.)
- [ ] Pre-flight checklist engine
- [ ] "Ship It" button with state-aware UI
- [ ] Post-deploy automation (reputation + notifications)

### Sprint 6: Email Infrastructure (Weeks 13-14)
- [ ] `shipyard.dev` domain + SES/Resend setup
- [ ] Inbound email parsing
- [ ] Outbound email with verification badge
- [ ] Cold outreach UI (search → compose → send)
- [ ] Anti-spam rate limiting

### Sprint 7: Polish & Integration (Weeks 15-16)
- [ ] Connect Layer 1 (profiles) to Layer 3 (Yard)
- [ ] Connect Layer 2 (tool directory) to chunk tags
- [ ] Reputation engine (shipped projects → score)
- [ ] Performance optimization (Flowchart with 1000+ nodes)
- [ ] Mobile responsiveness for Flowchart view

---

## 11. ENGINEERING RISKS & MITIGATIONS

| Risk | Severity | Mitigation |
|------|----------|------------|
| **Chunking hallucination** | High | Human-in-loop mandatory. DAG validator catches loops. Builder can override any AI suggestion. |
| **Privacy backlash** | High | Dev Bridge is opt-in per project. Three privacy levels. Local SQLite means Shipyard cloud sees nothing until sync. |
| **WebSocket scale** | Medium | Redis pub/sub for multi-server. Fall back to polling if WS fails. |
| **Canvas performance** | Medium | Virtualize off-screen nodes. Cap at 500 visible, paginate rest. Use PixiJS if React Canvas lags. |
| **Email deliverability** | Medium | Warm up `shipyard.dev` domain gradually. Use Resend/Postmark for reputation. |
| **AI context limits** | Low | MCP server sends only active chunk + immediate dependencies, not full project. |

---

## 12. STRATEGIC MOAT: WHY THIS WINS

### 12.1 The Competition
| Competitor | What They Do | Why Shipyard Beats Them |
|------------|-------------|------------------------|
| **Upwork/Toptal** | Match freelancers to jobs | No chunking. No execution layer. No proof of shipped work. |
| **GitHub** | Code hosting + profiles | No project planning. No real-time collaboration. No marketing layer. |
| **Notion** | Docs + light project management | No code-aware tracking. No AI chunking. No deployment. |
| **Linear/Jira** | Issue tracking | Not builder-centric. No identity layer. No AI decomposition. |
| **Figma** | Design collaboration | Not for code. No execution tracking. |

### 12.2 The Moat
Shipyard's moat is **not any single feature.** It is the **closed loop:**

1. **Identity** attracts builders ("I want my unified profile")
2. **Tool Directory** attracts discovery ("I want my tool ranked")
3. **Matching** creates transactions ("I need a builder")
4. **Chunking** creates structure ("Here's exactly how to build it")
5. **Flowchart** creates visibility ("I can see progress without asking")
6. **Local Bridge** creates trust ("I know work is happening")
7. **Team Hub** creates retention ("My whole team is here")
8. **One-Button Live** creates completion ("We shipped")
9. **Reputation** feeds back into Identity ("Shipped projects = higher rank")

Each layer makes the next layer more valuable. By the time a competitor copies one feature, the network effects of the loop defend the rest.

### 12.3 The Vision Statement (For Your Landing Page)

> "Shipyard is the global developer identity core. We don't just connect builders to projects — we decompose ambition into executable chunks, visualize progress as a living flowchart, and ship to production with one button. Every builder gets a verified identity. Every project gets a map. Every ship builds reputation."

---

## 13. IMMEDIATE NEXT STEPS FOR YOU

1. **Lock the name:** Is it "Shipyard"? Check domain + trademark.
2. **Lock the colors:** Give me exact hex codes for lightning blue, soft pink, and blue shade.
3. **Choose the LLM for Chunking:** Nemotron 3 Ultra via OpenRouter? Claude 3.5 Sonnet? (Claude is better at structured reasoning — recommended for the Chunking Engine.)
4. **Define the first user story:** Who is the first project owner? What do they want to build? (This becomes our MVP test case.)
5. **Set up the repo:** I recommend Next.js 14 (App Router) + shadcn/ui + Tailwind + Prisma + PostgreSQL + Socket.io.

---

*This document is a living specification. As we build, we will add Sub-Phases 2.7, 2.8, etc. — AI-assisted code review, automated testing per chunk, builder marketplace rankings, and monetization mechanics.*

**End of Phase 2 Master Blueprint.**
