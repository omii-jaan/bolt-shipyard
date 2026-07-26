import { motion } from 'framer-motion'

interface Props {
  label: string
  title: string
  description: string
  center?: boolean
}

export default function SectionHeading({ label, title, description, center = true }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      className={center ? 'max-w-2xl mx-auto text-center' : 'max-w-2xl'}
    >
      <div className={`section-label ${center ? 'justify-center' : ''}`}>
        <span className="h-px w-6 bg-bolt-400" />
        {label}
      </div>
      <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.1]">
        {title}
      </h2>
      <p className="mt-5 text-lg leading-relaxed text-sand-300">{description}</p>
    </motion.div>
  )
}
