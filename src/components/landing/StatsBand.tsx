import { motion } from 'framer-motion'

const stats = [
  { value: '6', label: 'Node states' },
  { value: '1', label: 'Button to ship' },
  { value: '∞', label: 'Canvas size' },
  { value: '3', label: 'Privacy levels' },
]

export default function StatsBand() {
  return (
    <section className="relative py-14 border-y border-white/5 bg-ink-900/30">
      <div className="container-max container-px">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="text-center"
            >
              <div className="font-display text-4xl sm:text-5xl font-semibold text-gradient">{s.value}</div>
              <div className="mt-2 text-xs uppercase tracking-wider text-sand-500">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
