import { motion } from 'framer-motion'
import { Check, Code2, Lock, Eye, Clock, AlertCircle } from 'lucide-react'

const states = [
  { name: 'Pending', icon: Clock, color: 'border-white/10', dot: 'bg-sand-500', text: 'text-sand-400', desc: 'Waiting for dependencies' },
  { name: 'Claimed', icon: Eye, color: 'border-bolt-400/50', dot: 'bg-bolt-400/60', text: 'text-bolt-300', desc: 'A builder has picked it up' },
  { name: 'In Progress', icon: Code2, color: 'border-bolt-400', dot: 'bg-bolt-400', text: 'text-bolt-200', desc: 'Active work, pulsing border' },
  { name: 'In Review', icon: AlertCircle, color: 'border-bloom-400', dot: 'bg-bloom-400', text: 'text-bloom-300', desc: 'Awaiting approval' },
  { name: 'Completed', icon: Check, color: 'border-emerald-400/60', dot: 'bg-emerald-400', text: 'text-emerald-300', desc: 'Done and verified' },
  { name: 'Blocked', icon: Lock, color: 'border-red-400/50', dot: 'bg-red-400', text: 'text-red-300', desc: 'Needs attention' },
]

export default function NodeStatesShowcase() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {states.map((s, i) => (
        <motion.div
          key={s.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4, delay: i * 0.06 }}
          className={`rounded-2xl border ${s.color} bg-ink-900/40 p-5 backdrop-blur-sm`}
        >
          <div className="flex items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-full ${s.dot} ${i === 2 ? 'animate-glow' : ''}`} />
            <s.icon className={`h-4 w-4 ${s.text}`} />
          </div>
          <div className="mt-3 text-sm font-semibold text-white">{s.name}</div>
          <div className="mt-1 text-xs leading-relaxed text-sand-500">{s.desc}</div>
        </motion.div>
      ))}
    </div>
  )
}
