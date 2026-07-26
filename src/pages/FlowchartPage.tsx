import { motion } from 'framer-motion'
import { Check, Code2, Lock, Eye, Clock, AlertCircle, ZoomIn, Hand, MousePointer2, ArrowRight, Zap } from 'lucide-react'
import SectionHeading from '../components/landing/SectionHeading'
import CtaBand from '../components/landing/CtaBand'
import FlowchartCanvas from '../components/flowchart/FlowchartCanvas'

const states = [
  { name: 'Pending', icon: Clock, color: 'border-white/10', dot: 'bg-sand-500', text: 'text-sand-400', desc: 'Static. Waiting for upstream chunks to complete.' },
  { name: 'Claimed', icon: Eye, color: 'border-bolt-400/50', dot: 'bg-bolt-400/60', text: 'text-bolt-300', desc: 'Slow 2s pulse. A builder has picked it up.' },
  { name: 'In Progress', icon: Code2, color: 'border-bolt-400', dot: 'bg-bolt-400', text: 'text-bolt-200', desc: 'Active 1s pulse with glow shadow and subtle float.' },
  { name: 'In Review', icon: AlertCircle, color: 'border-bloom-400', dot: 'bg-bloom-400', text: 'text-bloom-300', desc: 'Dashed border with a gentle shake every 5s.' },
  { name: 'Completed', icon: Check, color: 'border-emerald-400/60', dot: 'bg-emerald-400', text: 'text-emerald-300', desc: 'Solid green border with a left-to-right fill animation.' },
  { name: 'Blocked', icon: Lock, color: 'border-red-400/50', dot: 'bg-red-400', text: 'text-red-300', desc: 'Static, muted background, red dot indicator.' },
]

const interactions = [
  { icon: MousePointer2, title: 'Click', desc: 'Slide-out drawer with full chunk details, code links, comments, and time logs.' },
  { icon: Hand, title: 'Drag', desc: 'Reorganize the layout. Dragging is purely visual — it never changes dependencies.' },
  { icon: ZoomIn, title: 'Focus mode', desc: 'Double-click to zoom into a node and its immediate children. The rest fades away.' },
  { icon: Eye, title: 'Hover upstream', desc: 'Highlight everything that depends on this node — "what breaks if this fails?"' },
]

const DEMO_PROJECT_ID = 'a1b2c3d4-0000-0000-0000-000000000001'

export default function FlowchartPage() {
  return (
    <div className="pt-32 pb-20">
      <section className="container-max container-px">
        <SectionHeading
          label="Flowchart OS"
          title="The living map of your project"
          description="An infinite canvas where every chunk is a node with a state. Every dependency is a curved, animated line. Every builder knows exactly what to do next. Try it below — drag nodes, pan the canvas, click a node for details."
        />
      </section>

      {/* Live Interactive Canvas */}
      <section className="py-16">
        <div className="container-max container-px">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display text-xl font-semibold text-white">Project Horizon — Live Demo</h3>
              <p className="text-sm text-sand-500 mt-1">This canvas is connected to a real database. Changes persist.</p>
            </div>
            <span className="chip !bg-emerald-400/10 !border-emerald-400/30 !text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-glow" />
              live data
            </span>
          </div>
          <FlowchartCanvas projectId={DEMO_PROJECT_ID} />
        </div>
      </section>

      <section className="py-20">
        <div className="container-max container-px">
          <h3 className="font-display text-2xl font-semibold text-white mb-8">Six node states</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {states.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className={`rounded-2xl border ${s.color} bg-ink-900/40 p-6 backdrop-blur-sm`}
              >
                <div className="flex items-center gap-3">
                  <span className={`h-3 w-3 rounded-full ${s.dot} ${i === 2 ? 'animate-glow' : ''}`} />
                  <s.icon className={`h-5 w-5 ${s.text}`} />
                  <span className="font-display text-lg font-semibold text-white">{s.name}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-sand-400">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-max container-px">
          <h3 className="font-display text-2xl font-semibold text-white mb-8">Interaction patterns</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {interactions.map((it, i) => (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="card p-6"
              >
                <div className="h-10 w-10 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center mb-4">
                  <it.icon className="h-5 w-5 text-bolt-300" />
                </div>
                <h4 className="font-semibold text-white">{it.title}</h4>
                <p className="mt-2 text-sm text-sand-400 leading-relaxed">{it.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-max container-px">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card p-10 max-w-3xl mx-auto"
          >
            <div className="section-label">
              <span className="h-px w-6 bg-bolt-400" />
              The Bathroom Test
            </div>
            <h3 className="mt-4 font-display text-3xl font-semibold text-white">
              Come back from a break. Know exactly what's next.
            </h3>
            <p className="mt-4 text-sand-300 leading-relaxed">
              A persistent "Next Action" banner stays fixed at the bottom of the screen. After 15
              minutes idle, a session recovery modal summarizes what was completed, what's active,
              what's blocked, and suggests the next chunk. An optional audio cue chimes when a
              blocker resolves.
            </p>
          </motion.div>
        </div>
      </section>

      <CtaBand />
    </div>
  )
}
