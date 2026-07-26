import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Sparkles, ArrowRight, Loader2, PenLine, Boxes } from 'lucide-react'

type InputMode = 'prompt' | 'template'

export default function NewProjectPage() {
  const navigate = useNavigate()
  const [mode, setMode] = useState<InputMode>('prompt')
  const [prompt, setPrompt] = useState('')
  const [projectType, setProjectType] = useState('SaaS')
  const [stack, setStack] = useState('Next.js + Supabase')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/dashboard')
    }, 1800)
  }

  return (
    <div className="pt-32 pb-20">
      <div className="container-max container-px max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="section-label">
            <span className="h-px w-6 bg-bolt-400" />
            New Project
          </div>
          <h1 className="mt-4 font-display text-4xl font-semibold text-white">
            Describe the vision. We'll chunk it.
          </h1>
          <p className="mt-3 text-sand-400">
            The Chunking Engine decomposes your idea into a living Flowchart of executable tasks.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-10 flex gap-2 p-1 rounded-full border border-white/10 bg-white/5 w-fit"
        >
          {([
            { id: 'prompt' as const, label: 'Free Prompt', icon: PenLine },
            { id: 'template' as const, label: 'Template', icon: Boxes },
          ]).map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`relative flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                mode === m.id ? 'text-white' : 'text-sand-400 hover:text-sand-200'
              }`}
            >
              {mode === m.id && (
                <motion.span
                  layoutId="mode-active"
                  className="absolute inset-0 rounded-full bg-bolt-500/20 border border-bolt-400/30"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <m.icon className="h-4 w-4 relative" />
              <span className="relative">{m.label}</span>
            </button>
          ))}
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-8 card p-8"
        >
          {mode === 'prompt' ? (
            <div>
              <label className="text-sm font-medium text-white">What do you want to build?</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={6}
                placeholder="A platform where indie builders can decompose their app ideas into chunked flowcharts, track progress, and ship to production with one button..."
                className="mt-3 w-full rounded-xl bg-ink-950/60 border border-white/10 px-4 py-3 text-sm text-sand-100 placeholder:text-sand-600 focus:outline-none focus:border-bolt-400/50 focus:ring-2 focus:ring-bolt-400/20 transition-all resize-none"
              />
              <p className="mt-2 text-xs text-sand-500">
                The more detail you give, the better the chunking. Describe features, users, and constraints.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              <div>
                <label className="text-sm font-medium text-white">Project name</label>
                <input
                  type="text"
                  placeholder="Horizon Labs"
                  className="mt-2 w-full rounded-xl bg-ink-950/60 border border-white/10 px-4 py-3 text-sm text-sand-100 placeholder:text-sand-600 focus:outline-none focus:border-bolt-400/50 transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-white">Project type</label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="mt-2 w-full rounded-xl bg-ink-950/60 border border-white/10 px-4 py-3 text-sm text-sand-100 focus:outline-none focus:border-bolt-400/50 transition-all"
                  >
                    <option>SaaS</option>
                    <option>Mobile App</option>
                    <option>API</option>
                    <option>Marketplace</option>
                    <option>Open Source</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-white">Tech stack</label>
                  <select
                    value={stack}
                    onChange={(e) => setStack(e.target.value)}
                    className="mt-2 w-full rounded-xl bg-ink-950/60 border border-white/10 px-4 py-3 text-sm text-sand-100 focus:outline-none focus:border-bolt-400/50 transition-all"
                  >
                    <option>Next.js + Supabase</option>
                    <option>React + Vite + Supabase</option>
                    <option>Vue + Firebase</option>
                    <option>Node + PostgreSQL</option>
                    <option>Python + FastAPI</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-white">Core features (one per line)</label>
                <textarea
                  rows={4}
                  placeholder="User authentication&#10;Project dashboard&#10;Real-time flowchart&#10;One-button deploy"
                  className="mt-2 w-full rounded-xl bg-ink-950/60 border border-white/10 px-4 py-3 text-sm text-sand-100 placeholder:text-sand-600 focus:outline-none focus:border-bolt-400/50 transition-all resize-none"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 btn-primary w-full justify-center disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Chunking your vision...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Generate Flowchart
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </motion.form>
      </div>
    </div>
  )
}
