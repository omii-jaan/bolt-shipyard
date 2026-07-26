import { motion } from 'framer-motion'
import { Check, Code2, Lock } from 'lucide-react'

type NodeState = 'completed' | 'active' | 'pending' | 'blocked'

interface FlowNode {
  id: string
  label: string
  sub: string
  state: NodeState
  x: number
  y: number
}

const nodes: FlowNode[] = [
  { id: '1', label: 'Project Scaffold', sub: 'done', state: 'completed', x: 40, y: 30 },
  { id: '2', label: 'Auth + DB Schema', sub: 'done', state: 'completed', x: 230, y: 30 },
  { id: '3', label: 'API Routes', sub: 'in progress', state: 'active', x: 420, y: 30 },
  { id: '4', label: 'UI Components', sub: 'next', state: 'pending', x: 230, y: 170 },
  { id: '5', label: 'OAuth Middleware', sub: 'blocked', state: 'blocked', x: 420, y: 170 },
]

const edges: [string, string][] = [
  ['1', '2'],
  ['2', '3'],
  ['2', '4'],
  ['3', '5'],
]

const stateStyles: Record<NodeState, { ring: string; dot: string; bg: string; text: string }> = {
  completed: { ring: 'border-emerald-400/60', dot: 'bg-emerald-400', bg: 'bg-emerald-400/5', text: 'text-emerald-300' },
  active: { ring: 'border-bolt-400', dot: 'bg-bolt-400', bg: 'bg-bolt-400/10', text: 'text-bolt-300' },
  pending: { ring: 'border-white/10', dot: 'bg-sand-500', bg: 'bg-white/[0.02]', text: 'text-sand-400' },
  blocked: { ring: 'border-red-400/50', dot: 'bg-red-400', bg: 'bg-red-400/5', text: 'text-red-300' },
}

function nodeById(id: string) {
  return nodes.find((n) => n.id === id)!
}

export default function HeroFlowchart() {
  return (
    <div className="relative">
      <div className="relative rounded-3xl glass-strong p-6 overflow-hidden">
        {/* window chrome */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-400/70" />
            <span className="h-3 w-3 rounded-full bg-amber-400/70" />
            <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
          </div>
          <div className="text-xs font-mono text-sand-500">flowchart · project-horizon</div>
          <div className="chip !py-0.5 !px-2 text-[10px]">
            <Radio className="h-3 w-3 text-bolt-400" />
            live
          </div>
        </div>

        {/* canvas */}
        <div
          className="relative rounded-2xl border border-white/5 bg-ink-950/80 overflow-hidden"
          style={{ height: 260, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '20px 20px' }}
        >
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            {edges.map(([a, b], i) => {
              const na = nodeById(a)
              const nb = nodeById(b)
              const midX = (na.x + 120 + nb.x) / 2
              const d = `M ${na.x + 120} ${na.y + 28} C ${midX} ${na.y + 28}, ${midX} ${nb.y + 28}, ${nb.x} ${nb.y + 28}`
              const active = na.state === 'completed' || na.state === 'active'
              return (
                <g key={i}>
                  <path d={d} fill="none" stroke={active ? 'rgba(61,160,255,0.5)' : 'rgba(255,255,255,0.08)'} strokeWidth={2} />
                  {na.state === 'active' && (
                    <path
                      d={d}
                      fill="none"
                      stroke="rgba(61,160,255,0.9)"
                      strokeWidth={2}
                      strokeDasharray="6 6"
                      className="animate-dash"
                    />
                  )}
                </g>
              )
            })}
          </svg>

          {nodes.map((n, i) => {
            const s = stateStyles[n.state]
            return (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
                className={`absolute rounded-xl border ${s.ring} ${s.bg} px-3 py-2 w-[120px] backdrop-blur-sm`}
                style={{ left: n.x, top: n.y }}
              >
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${s.dot} ${n.state === 'active' ? 'animate-glow' : ''}`} />
                  <span className="text-[11px] font-semibold text-white truncate">{n.label}</span>
                </div>
                <div className={`mt-1 text-[10px] font-mono ${s.text} flex items-center gap-1`}>
                  {n.state === 'completed' && <Check className="h-2.5 w-2.5" />}
                  {n.state === 'active' && <Code2 className="h-2.5 w-2.5" />}
                  {n.state === 'blocked' && <Lock className="h-2.5 w-2.5" />}
                  {n.sub}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* next action banner */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-4 flex items-center justify-between rounded-xl border border-bolt-400/30 bg-bolt-500/10 px-4 py-3"
        >
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-bolt-400 animate-glow" />
            <div>
              <div className="text-xs text-sand-400">Next action</div>
              <div className="text-sm font-medium text-white">API Routes — est. 2h remaining</div>
            </div>
          </div>
          <button className="text-xs font-semibold text-bolt-300 hover:text-bolt-200 transition-colors">
            Start →
          </button>
        </motion.div>
      </div>

      {/* floating accents */}
      <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-bolt-500/20 blur-2xl animate-pulse-slow" />
      <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-bloom-500/15 blur-3xl animate-pulse-slow" />
    </div>
  )
}

function Radio({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <path d="M16.24 7.76a6 6 0 010 8.49M7.76 16.24a6 6 0 010-8.49M19.07 4.93a10 10 0 010 14.14M4.93 19.07a10 10 0 010-14.14" />
    </svg>
  )
}
