import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Boxes, Clock, Check, TrendingUp, Plus, ArrowRight, Zap } from 'lucide-react'

const projects = [
  { name: 'Horizon Labs', progress: 68, chunks: 24, done: 16, status: 'active' },
  { name: 'Threadline', progress: 100, chunks: 18, done: 18, status: 'shipped' },
  { name: 'Pulse API', progress: 42, chunks: 12, done: 5, status: 'active' },
]

export default function DashboardPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="container-max container-px">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-display text-3xl font-semibold text-white">Your Yard</h1>
            <p className="mt-1 text-sand-400">Welcome back. Here's what's moving.</p>
          </div>
          <Link to="/new" className="btn-primary">
            <Plus className="h-4 w-4" />
            New Project
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { icon: Boxes, label: 'Active chunks', value: '12', color: 'text-bolt-300' },
            { icon: Clock, label: 'Hours this week', value: '23.5', color: 'text-sand-200' },
            { icon: Check, label: 'Completed', value: '47', color: 'text-emerald-300' },
            { icon: TrendingUp, label: 'Reputation', value: '980', color: 'text-bloom-300' },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="card p-5"
            >
              <s.icon className={`h-5 w-5 ${s.color} mb-3`} />
              <div className="font-display text-2xl font-semibold text-white">{s.value}</div>
              <div className="text-xs text-sand-500 mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>

        <h2 className="font-display text-xl font-semibold text-white mb-5">Projects</h2>
        <div className="space-y-4">
          {projects.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="card p-6 hover:border-white/15 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-display text-lg font-semibold text-white">{p.name}</h3>
                  <p className="text-xs text-sand-500 mt-0.5">
                    {p.done}/{p.chunks} chunks {p.status === 'shipped' && '· shipped'}
                  </p>
                </div>
                <span className={`chip ${p.status === 'shipped' ? '!bg-emerald-400/10 !border-emerald-400/30 !text-emerald-300' : '!bg-bolt-400/10 !border-bolt-400/30 !text-bolt-300'}`}>
                  {p.status}
                </span>
              </div>
              <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${p.progress}%` }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                  className={`h-full rounded-full ${p.status === 'shipped' ? 'bg-emerald-400' : 'bg-gradient-to-r from-bolt-400 to-bolt-500'}`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 card p-6 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-bolt-400 animate-glow" />
            <div>
              <div className="text-xs text-sand-500">Next action</div>
              <div className="text-sm font-medium text-white">Implement OAuth middleware — est. 3h</div>
            </div>
          </div>
          <button className="btn-primary !py-2">
            <Zap className="h-4 w-4" />
            Start
            <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>
      </div>
    </div>
  )
}
