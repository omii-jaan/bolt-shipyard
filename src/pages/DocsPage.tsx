import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Book, Code2, Boxes, Radio, ShieldCheck, Ship, Mail, ArrowRight } from 'lucide-react'
import SectionHeading from '../components/landing/SectionHeading'

const sections = [
  { icon: Boxes, title: 'Chunking Engine', desc: 'How the AI decomposes a vision into a DAG of executable tasks.', slug: 'chunking-engine' },
  { icon: Radio, title: 'Flowchart OS', desc: 'Canvas renderer, node states, WebSocket sync, and the Next Action banner.', slug: 'flowchart-os' },
  { icon: ShieldCheck, title: 'Local Dev Bridge', desc: 'The MCP agent: file watcher, git hooks, time tracker, and privacy levels.', slug: 'local-dev-bridge' },
  { icon: Code2, title: 'Team Hub', desc: 'Channels, role-based views, and the Flowchart bot.', slug: 'team-hub' },
  { icon: Ship, title: 'One-Button Live', desc: 'Pre-flight checks, deployment pipelines, and post-ship automation.', slug: 'one-button-live' },
  { icon: Mail, title: 'Email Infrastructure', desc: 'Provisioning name@shipyard.dev, verification badges, and outreach.', slug: 'email-infra' },
]

export default function DocsPage() {
  return (
    <div className="pt-32 pb-20">
      <section className="container-max container-px">
        <SectionHeading
          label="Documentation"
          title="Read the blueprint"
          description="The full Phase 2 specification — architecture, data models, API contracts, and implementation roadmap."
        />
      </section>

      <section className="py-16">
        <div className="container-max container-px">
          <div className="grid lg:grid-cols-12 gap-8">
            <aside className="lg:col-span-3">
              <div className="sticky top-28">
                <div className="text-xs font-semibold uppercase tracking-wider text-sand-500 mb-3">
                  On this page
                </div>
                <ul className="space-y-2">
                  {sections.map((s) => (
                    <li key={s.slug}>
                      <a
                        href={`#${s.slug}`}
                        className="text-sm text-sand-400 hover:text-white transition-colors flex items-center gap-2"
                      >
                        <s.icon className="h-3.5 w-3.5" />
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            <div className="lg:col-span-9 space-y-16">
              {sections.map((s, i) => (
                <motion.section
                  key={s.slug}
                  id={s.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center">
                      <s.icon className="h-5 w-5 text-bolt-300" />
                    </div>
                    <h2 className="font-display text-2xl font-semibold text-white">{s.title}</h2>
                  </div>
                  <p className="text-sand-300 leading-relaxed">{s.desc}</p>
                  <div className="mt-5 card p-5">
                    <pre className="text-xs font-mono text-sand-400 overflow-x-auto"><code>{`// ${s.title}
// Detailed specification available in the master blueprint.`}</code></pre>
                  </div>
                </motion.section>
              ))}

              <div className="card p-8 flex items-center justify-between">
                <div>
                  <h3 className="font-display text-xl font-semibold text-white">Read the full blueprint</h3>
                  <p className="mt-1 text-sm text-sand-400">The complete Phase 2 master specification.</p>
                </div>
                <Link to="/new" className="btn-primary">
                  <Book className="h-4 w-4" />
                  Open spec
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
