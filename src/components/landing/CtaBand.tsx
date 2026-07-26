import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Zap } from 'lucide-react'

export default function CtaBand() {
  return (
    <section className="relative py-28">
      <div className="container-max container-px">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl glass-strong px-8 py-16 sm:px-16 sm:py-20 text-center"
        >
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-bolt-500/15 blur-[120px]" />
            <div className="absolute bottom-0 right-0 h-[300px] w-[400px] rounded-full bg-bloom-500/15 blur-[100px]" />
          </div>

          <div className="section-label justify-center">
            <span className="h-px w-6 bg-bolt-400" />
            Start now
          </div>
          <h2 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-[1.1]">
            Every builder gets a verified identity.
            <br />
            <span className="text-gradient">Every project gets a map.</span>
          </h2>
          <p className="mt-6 max-w-xl mx-auto text-lg text-sand-300">
            Ship a project with Shipyard and your Flowchart becomes the proof of how it was built —
            a reputation signal no resume can match.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link to="/new" className="btn-primary">
              <Zap className="h-4 w-4" />
              Start Building
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/builders" className="btn-ghost">
              Browse Builders
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
