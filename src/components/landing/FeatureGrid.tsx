import { motion } from 'framer-motion'
import { Boxes, Radio, Users, Ship, Mail, ShieldCheck } from 'lucide-react'

const features = [
  {
    icon: Boxes,
    title: 'Chunking Engine',
    desc: 'AI decomposes any project into a DAG of testable, sequenced tasks with acceptance criteria and dependency tracking.',
    accent: 'from-bolt-500/20 to-bolt-700/5',
  },
  {
    icon: Radio,
    title: 'Flowchart OS',
    desc: 'An infinite canvas where every chunk lives as a node. Six states, animated dependencies, real-time sync.',
    accent: 'from-bloom-500/20 to-bloom-700/5',
  },
  {
    icon: ShieldCheck,
    title: 'Local Dev Bridge',
    desc: 'A privacy-first agent that watches your local work, maps it to chunks, and exposes context to any AI coding tool via MCP.',
    accent: 'from-bolt-500/20 to-bolt-700/5',
  },
  {
    icon: Users,
    title: 'Team Hub',
    desc: 'Technical and marketing teams share one Flowchart. Channels, roles, and views keep everyone aligned on state.',
    accent: 'from-bloom-500/20 to-bloom-700/5',
  },
  {
    icon: Ship,
    title: 'One-Button Live',
    desc: 'A pre-flight check, a deployment pipeline, and a post-ship reputation update — all from one glowing button.',
    accent: 'from-bolt-500/20 to-bolt-700/5',
  },
  {
    icon: Mail,
    title: 'Verified Identity',
    desc: 'Every builder gets name@shipyard.dev. Emails carry a verification badge that links back to a living profile.',
    accent: 'from-bloom-500/20 to-bloom-700/5',
  },
]

export default function FeatureGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {features.map((f, i) => (
        <motion.div
          key={f.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
          className="group relative card p-6 hover:border-white/15 transition-all hover:-translate-y-1 duration-300"
        >
          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${f.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
          <div className="relative">
            <div className="h-11 w-11 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <f.icon className="h-5 w-5 text-bolt-300" />
            </div>
            <h3 className="font-display text-lg font-semibold text-white">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-sand-400">{f.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
