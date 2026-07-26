import { motion } from 'framer-motion'
import { PenLine, Cpu, GitBranch, ClipboardCheck } from 'lucide-react'

const steps = [
  { icon: PenLine, title: 'Describe the vision', text: 'Free prompt or structured template. Project owners say what they want — not how to build it.' },
  { icon: Cpu, title: 'AI decomposes it', text: 'The Chunking Engine breaks the vision into a directed graph of testable, sequenced tasks.' },
  { icon: GitBranch, title: 'Build in sequence', text: 'Builders claim chunks, code locally with any AI tool, and the Local Dev Bridge verifies completion.' },
  { icon: ClipboardCheck, title: 'Ship the artifact', text: 'One button deploys. The Flowchart becomes the permanent record of how it was built.' },
]

export default function ChunkPipeline() {
  return (
    <div className="relative">
      <div className="absolute top-16 left-0 right-0 h-px bg-gradient-to-r from-transparent via-bolt-400/30 to-transparent hidden lg:block" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative"
          >
            <div className="relative z-10 h-12 w-12 rounded-xl bg-gradient-to-br from-bolt-500/20 to-bloom-500/20 border border-white/10 flex items-center justify-center mb-5">
              <s.icon className="h-5 w-5 text-bolt-300" />
              <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-ink-800 border border-white/10 text-[10px] font-mono text-sand-400 flex items-center justify-center">
                {i + 1}
              </span>
            </div>
            <h3 className="font-display text-lg font-semibold text-white">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-sand-400">{s.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
