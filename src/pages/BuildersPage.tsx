import { motion } from 'framer-motion'
import { Star, GitBranch, Zap, Boxes } from 'lucide-react'
import SectionHeading from '../components/landing/SectionHeading'
import CtaBand from '../components/landing/CtaBand'

const builders = [
  { name: 'Sarah Chen', role: 'Tech Lead', skills: ['Next.js', 'Prisma', 'PostgreSQL'], shipped: 12, reputation: 980, initials: 'SC' },
  { name: 'Marcus Okoro', role: 'Indie Builder', skills: ['React', 'Vite', 'Supabase'], shipped: 4, reputation: 720, initials: 'MO' },
  { name: 'Priya Nair', role: 'Founder', skills: ['TypeScript', 'Node', 'Docker'], shipped: 7, reputation: 890, initials: 'PN' },
  { name: 'Liam Walsh', role: 'Full-Stack', skills: ['Vue', 'Go', 'K8s'], shipped: 9, reputation: 845, initials: 'LW' },
  { name: 'Aiko Tanaka', role: 'Frontend', skills: ['React', 'Three.js', 'Tailwind'], shipped: 15, reputation: 1020, initials: 'AT' },
  { name: 'Diego Santos', role: 'Backend', skills: ['Python', 'FastAPI', 'Redis'], shipped: 6, reputation: 760, initials: 'DS' },
]

export default function BuildersPage() {
  return (
    <div className="pt-32 pb-20">
      <section className="container-max container-px">
        <SectionHeading
          label="Builder Directory"
          title="Verified builders with shipped work"
          description="Every profile is anchored to real shipped products. Reputation is earned by completing complex chunks — not by self-reported resumes."
        />
      </section>

      <section className="py-16">
        <div className="container-max container-px">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {builders.map((b, i) => (
              <motion.div
                key={b.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
                className="card p-6 hover:border-white/15 hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-bolt-400 to-bloom-400 flex items-center justify-center text-lg font-semibold text-white">
                    {b.initials}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-semibold text-white">{b.name}</h3>
                    <p className="text-sm text-sand-400">{b.role}</p>
                    <div className="mt-2 flex items-center gap-1 text-xs text-bolt-300">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      <span className="font-mono">{b.reputation}</span>
                      <span className="text-sand-500">rep</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {b.skills.map((s) => (
                    <span key={s} className="chip !py-0.5 !text-[11px]">{s}</span>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-sand-500">
                  <span className="flex items-center gap-1.5">
                    <Boxes className="h-3.5 w-3.5" />
                    {b.shipped} shipped
                  </span>
                  <button className="font-medium text-bolt-300 hover:text-bolt-200 transition-colors">
                    View profile →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  )
}
