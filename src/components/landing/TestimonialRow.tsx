import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

const quotes = [
  {
    text: 'Shipyard turned a 3-week scoping exercise into a 20-minute chunking session. My team finally sees the same map.',
    name: 'Sarah Chen',
    role: 'Tech Lead, Horizon Labs',
  },
  {
    text: 'The Local Dev Bridge is the first time-tracking tool that actually respects how engineers work. Ambient, not manual.',
    name: 'Marcus Okoro',
    role: 'Indie Builder, shipped 4 products',
  },
  {
    text: 'One-Button Live killed our deploy anxiety. Pre-flight checks catch what humans forget.',
    name: 'Priya Nair',
    role: 'Founder, Threadline',
  },
]

export default function TestimonialRow() {
  return (
    <section className="relative py-28">
      <div className="container-max container-px">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {quotes.map((q, i) => (
            <motion.figure
              key={q.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card p-7 flex flex-col"
            >
              <Quote className="h-6 w-6 text-bolt-400/60 mb-4" />
              <blockquote className="text-sm leading-relaxed text-sand-200 flex-1">"{q.text}"</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-bolt-400 to-bloom-400 flex items-center justify-center text-sm font-semibold text-white">
                  {q.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <div className="text-sm font-medium text-white">{q.name}</div>
                  <div className="text-xs text-sand-500">{q.role}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
