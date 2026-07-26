import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Code2, Lock, Eye, Clock, AlertCircle, X, ZoomIn, ZoomOut, Maximize, Hand, User } from 'lucide-react'
import { clsx } from 'clsx'
import type { Chunk, ChunkStatus } from '../../lib/supabase'
import { supabase } from '../../lib/supabase'

const NODE_W = 180
const NODE_H = 76

const stateConfig: Record<ChunkStatus, { ring: string; dot: string; bg: string; text: string; icon: typeof Check; label: string }> = {
  completed: { ring: 'border-emerald-400/60', dot: 'bg-emerald-400', bg: 'bg-emerald-400/5', text: 'text-emerald-300', icon: Check, label: 'Completed' },
  in_progress: { ring: 'border-bolt-400', dot: 'bg-bolt-400', bg: 'bg-bolt-400/10', text: 'text-bolt-300', icon: Code2, label: 'In Progress' },
  claimed: { ring: 'border-bolt-400/50', dot: 'bg-bolt-400/60', bg: 'bg-bolt-400/5', text: 'text-bolt-300', icon: Eye, label: 'Claimed' },
  in_review: { ring: 'border-bloom-400', dot: 'bg-bloom-400', bg: 'bg-bloom-400/5', text: 'text-bloom-300', icon: AlertCircle, label: 'In Review' },
  pending: { ring: 'border-white/10', dot: 'bg-sand-500', bg: 'bg-white/[0.02]', text: 'text-sand-400', icon: Clock, label: 'Pending' },
  blocked: { ring: 'border-red-400/50', dot: 'bg-red-400', bg: 'bg-red-400/5', text: 'text-red-300', icon: Lock, label: 'Blocked' },
}

interface Props {
  projectId: string
}

export default function FlowchartCanvas({ projectId }: Props) {
  const [chunks, setChunks] = useState<Chunk[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Chunk | null>(null)
  const [scale, setScale] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [isPanning, setIsPanning] = useState(false)
  const panStart = useRef({ x: 0, y: 0, ox: 0, oy: 0 })
  const dragRef = useRef<{ id: string; startX: number; startY: number } | null>(null)
  const canvasRef = useRef<HTMLDivElement>(null)

  const fetchChunks = useCallback(async () => {
    const { data, error } = await supabase
      .from('chunks')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at')
    if (error) {
      console.error('Failed to load chunks:', error)
      return
    }
    setChunks((data as Chunk[]) || [])
    setLoading(false)
  }, [projectId])

  useEffect(() => {
    fetchChunks()
  }, [fetchChunks])

  // Pan handler
  const onCanvasMouseDown = (e: React.MouseEvent) => {
    if (dragRef.current) return
    setSelected(null)
    setIsPanning(true)
    panStart.current = { x: e.clientX, y: e.clientY, ox: offset.x, oy: offset.y }
  }

  useEffect(() => {
    if (!isPanning) return
    const onMove = (e: MouseEvent) => {
      setOffset({
        x: panStart.current.ox + (e.clientX - panStart.current.x),
        y: panStart.current.oy + (e.clientY - panStart.current.y),
      })
    }
    const onUp = () => setIsPanning(false)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [isPanning])

  // Node drag
  const onNodeMouseDown = (e: React.MouseEvent, chunk: Chunk) => {
    e.stopPropagation()
    setSelected(chunk)
    dragRef.current = { id: chunk.id, startX: e.clientX, startY: e.clientY }
  }

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragRef.current) return
      const dx = (e.clientX - dragRef.current.startX) / scale
      const dy = (e.clientY - dragRef.current.startY) / scale
      setChunks((prev) =>
        prev.map((c) =>
          c.id === dragRef.current!.id
            ? { ...c, position_x: Math.max(0, c.position_x + dx), position_y: Math.max(0, c.position_y + dy) }
            : c,
        ),
      )
      dragRef.current.startX = e.clientX
      dragRef.current.startY = e.clientY
    }
    const onUp = async () => {
      if (!dragRef.current) return
      const chunk = chunks.find((c) => c.id === dragRef.current!.id)
      if (chunk) {
        await supabase
          .from('chunks')
          .update({ position_x: chunk.position_x, position_y: chunk.position_y })
          .eq('id', chunk.id)
      }
      dragRef.current = null
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [chunks, scale])

  const zoom = (delta: number) => {
    setScale((s) => Math.min(2.5, Math.max(0.3, s + delta)))
  }

  const resetView = () => {
    setScale(1)
    setOffset({ x: 0, y: 0 })
  }

  // Build edges
  const edges: { from: Chunk; to: Chunk }[] = []
  chunks.forEach((c) => {
    c.dependency_ids.forEach((depId) => {
      const dep = chunks.find((d) => d.id === depId)
      if (dep) edges.push({ from: dep, to: c })
    })
  })

  const updateStatus = async (chunkId: string, status: ChunkStatus) => {
    setChunks((prev) =>
      prev.map((c) =>
        c.id === chunkId
          ? { ...c, status, completed_at: status === 'completed' ? new Date().toISOString() : null }
          : c,
      ),
    )
    setSelected((prev) => (prev?.id === chunkId ? { ...prev, status } : prev))
    await supabase.from('chunks').update({ status, completed_at: status === 'completed' ? new Date().toISOString() : null }).eq('id', chunkId)
  }

  const toggleCriterion = async (chunkId: string, critId: string) => {
    const chunk = chunks.find((c) => c.id === chunkId)
    if (!chunk) return
    const updated = chunk.acceptance_criteria.map((c) =>
      c.id === critId ? { ...c, checked: !c.checked } : c,
    )
    setChunks((prev) => prev.map((c) => (c.id === chunkId ? { ...c, acceptance_criteria: updated } : c)))
    setSelected((prev) => (prev?.id === chunkId ? { ...prev, acceptance_criteria: updated } : prev))
    await supabase.from('chunks').update({ acceptance_criteria: updated }).eq('id', chunkId)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[600px] rounded-2xl border border-white/5 bg-ink-950/60">
        <div className="text-sand-500 text-sm">Loading flowchart...</div>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Toolbar */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 rounded-full glass-strong px-2 py-1.5">
        <button onClick={() => zoom(0.2)} className="h-8 w-8 rounded-full hover:bg-white/10 flex items-center justify-center text-sand-300 transition-colors" aria-label="Zoom out">
          <ZoomOut className="h-4 w-4" />
        </button>
        <span className="text-xs font-mono text-sand-400 px-2 min-w-[3rem] text-center">{Math.round(scale * 100)}%</span>
        <button onClick={() => zoom(-0.2)} className="h-8 w-8 rounded-full hover:bg-white/10 flex items-center justify-center text-sand-300 transition-colors" aria-label="Zoom in">
          <ZoomIn className="h-4 w-4" />
        </button>
        <div className="h-5 w-px bg-white/10 mx-1" />
        <button onClick={resetView} className="h-8 w-8 rounded-full hover:bg-white/10 flex items-center justify-center text-sand-300 transition-colors" aria-label="Reset view">
          <Maximize className="h-4 w-4" />
        </button>
      </div>

      {/* Hint */}
      <div className="absolute top-4 left-4 z-20 chip">
        <Hand className="h-3.5 w-3.5 text-bolt-300" />
        Drag canvas to pan · Drag nodes to move · Click for details
      </div>

      {/* Canvas */}
      <div
        ref={canvasRef}
        onMouseDown={onCanvasMouseDown}
        className={clsx(
          'relative h-[600px] rounded-2xl border border-white/5 bg-ink-950/80 overflow-hidden select-none',
          isPanning ? 'cursor-grabbing' : 'cursor-grab',
        )}
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      >
        <div
          className="absolute top-0 left-0 origin-top-left"
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
            transition: isPanning || dragRef.current ? 'none' : 'transform 0.1s ease-out',
          }}
        >
          {/* Edges */}
          <svg className="absolute top-0 left-0 pointer-events-none" style={{ width: 2000, height: 800 }}>
            {edges.map(({ from, to }, i) => {
              const x1 = from.position_x + NODE_W
              const y1 = from.position_y + NODE_H / 2
              const x2 = to.position_x
              const y2 = to.position_y + NODE_H / 2
              const midX = (x1 + x2) / 2
              const d = `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`
              const active = from.status === 'completed' || from.status === 'in_progress'
              return (
                <g key={i}>
                  <path d={d} fill="none" stroke={active ? 'rgba(61,160,255,0.4)' : 'rgba(255,255,255,0.08)'} strokeWidth={2} />
                  {from.status === 'in_progress' && (
                    <path d={d} fill="none" stroke="rgba(61,160,255,0.9)" strokeWidth={2} strokeDasharray="6 6" className="animate-dash" />
                  )}
                  <circle cx={x2} cy={y2} r={3} fill={active ? 'rgba(61,160,255,0.6)' : 'rgba(255,255,255,0.15)'} />
                </g>
              )
            })}
          </svg>

          {/* Nodes */}
          {chunks.map((chunk) => {
            const cfg = stateConfig[chunk.status]
            const Icon = cfg.icon
            const completedCriteria = chunk.acceptance_criteria.filter((c) => c.checked).length
            const totalCriteria = chunk.acceptance_criteria.length
            return (
              <motion.div
                key={chunk.id}
                onMouseDown={(e) => onNodeMouseDown(e, chunk)}
                onClick={(e) => { e.stopPropagation(); setSelected(chunk) }}
                className={clsx(
                  'absolute rounded-xl border backdrop-blur-sm cursor-pointer transition-shadow',
                  cfg.ring, cfg.bg,
                  chunk.status === 'in_progress' && 'glow-bolt',
                  selected?.id === chunk.id && 'ring-2 ring-bolt-400/60',
                )}
                style={{ left: chunk.position_x, top: chunk.position_y, width: NODE_W, height: NODE_H }}
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <div className="p-3 h-full flex flex-col justify-between">
                  <div className="flex items-center gap-2">
                    <span className={clsx('h-2 w-2 rounded-full shrink-0', cfg.dot, chunk.status === 'in_progress' && 'animate-glow')} />
                    <span className="text-xs font-semibold text-white truncate flex-1">{chunk.title}</span>
                    <Icon className={clsx('h-3.5 w-3.5 shrink-0', cfg.text)} />
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className={clsx('font-mono', cfg.text)}>{cfg.label}</span>
                    {totalCriteria > 0 && (
                      <span className="text-sand-500 font-mono">{completedCriteria}/{totalCriteria}</span>
                    )}
                  </div>
                  {totalCriteria > 0 && (
                    <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className={clsx('h-full rounded-full transition-all', chunk.status === 'completed' ? 'bg-emerald-400' : 'bg-bolt-400')}
                        style={{ width: `${(completedCriteria / totalCriteria) * 100}%` }}
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Details Drawer */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md z-40 glass-strong border-l border-white/10 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className={clsx('inline-flex items-center gap-1.5 text-xs font-medium', stateConfig[selected.status].text)}>
                      <span className={clsx('h-2 w-2 rounded-full', stateConfig[selected.status].dot, selected.status === 'in_progress' && 'animate-glow')} />
                      {stateConfig[selected.status].label}
                    </div>
                    <h3 className="mt-2 font-display text-xl font-semibold text-white">{selected.title}</h3>
                  </div>
                  <button onClick={() => setSelected(null)} className="h-8 w-8 rounded-full hover:bg-white/10 flex items-center justify-center text-sand-400 transition-colors">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {selected.description && (
                  <p className="text-sm leading-relaxed text-sand-300 mb-6">{selected.description}</p>
                )}

                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="card p-3">
                    <div className="text-[10px] uppercase tracking-wider text-sand-500">Complexity</div>
                    <div className="mt-1 text-sm font-semibold text-white">{selected.complexity || '-'}/5</div>
                  </div>
                  <div className="card p-3">
                    <div className="text-[10px] uppercase tracking-wider text-sand-500">Est. hours</div>
                    <div className="mt-1 text-sm font-semibold text-white">{selected.estimated_hours || '-'}h</div>
                  </div>
                  <div className="card p-3">
                    <div className="text-[10px] uppercase tracking-wider text-sand-500">Builder</div>
                    <div className="mt-1 text-sm font-semibold text-white flex items-center gap-1">
                      {selected.assigned_to ? (
                        <>
                          <User className="h-3 w-3" />
                          {selected.assigned_to}
                        </>
                      ) : (
                        <span className="text-sand-500">Unassigned</span>
                      )}
                    </div>
                  </div>
                </div>

                {selected.acceptance_criteria.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-sand-500 mb-3">Acceptance Criteria</h4>
                    <ul className="space-y-2">
                      {selected.acceptance_criteria.map((c) => (
                        <li key={c.id}>
                          <button
                            onClick={() => toggleCriterion(selected.id, c.id)}
                            className="w-full flex items-start gap-3 text-left p-2 rounded-lg hover:bg-white/5 transition-colors"
                          >
                            <span className={clsx(
                              'mt-0.5 h-4 w-4 rounded border flex items-center justify-center shrink-0 transition-all',
                              c.checked ? 'bg-emerald-400/20 border-emerald-400/60' : 'border-white/20',
                            )}>
                              {c.checked && <Check className="h-3 w-3 text-emerald-300" />}
                            </span>
                            <span className={clsx('text-sm', c.checked ? 'text-sand-500 line-through' : 'text-sand-200')}>
                              {c.text}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mb-6">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-sand-500 mb-3">Dependencies</h4>
                  {selected.dependency_ids.length === 0 ? (
                    <p className="text-sm text-sand-500">No dependencies — this chunk can start immediately.</p>
                  ) : (
                    <ul className="space-y-1.5">
                      {selected.dependency_ids.map((depId) => {
                        const dep = chunks.find((c) => c.id === depId)
                        return dep ? (
                          <li key={depId} className="flex items-center gap-2 text-sm">
                            <span className={clsx('h-2 w-2 rounded-full', stateConfig[dep.status].dot)} />
                            <span className="text-sand-200">{dep.title}</span>
                            <span className={clsx('text-xs', stateConfig[dep.status].text)}>{stateConfig[dep.status].label}</span>
                          </li>
                        ) : null
                      })}
                    </ul>
                  )}
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-sand-500 mb-3">Change Status</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {(Object.keys(stateConfig) as ChunkStatus[]).map((s) => {
                      const cfg = stateConfig[s]
                      const Icon = cfg.icon
                      return (
                        <button
                          key={s}
                          onClick={() => updateStatus(selected.id, s)}
                          className={clsx(
                            'flex flex-col items-center gap-1 rounded-lg border p-2.5 text-[10px] font-medium transition-all',
                            selected.status === s
                              ? clsx(cfg.ring, cfg.bg, cfg.text)
                              : 'border-white/10 text-sand-500 hover:border-white/20 hover:text-sand-300',
                          )}
                        >
                          <Icon className="h-4 w-4" />
                          {cfg.label}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
