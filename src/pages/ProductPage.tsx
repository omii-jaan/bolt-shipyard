import { motion } from 'framer-motion'
import SectionHeading from '../components/landing/SectionHeading'
import FeatureGrid from '../components/landing/FeatureGrid'
import CtaBand from '../components/landing/CtaBand'

export default function ProductPage() {
  return (
    <div className="pt-32 pb-20">
      <section className="container-max container-px">
        <SectionHeading
          label="Product"
          title="Three layers. One closed loop."
          description="Shipyard is the global developer identity core — identity, intelligence, and execution in a single platform."
        />
      </section>

      <section className="py-20">
        <div className="container-max container-px">
          <div className="grid lg:grid-cols-3 gap-6">
            {[
              { n: '01', t: 'Identity', d: 'Unified builder profiles anchoring X, GitHub, YouTube, Instagram, and shipped products into one verified identity.' },
              { n: '02', t: 'Intelligence', d: 'Tool discovery, ranking, and a reputation graph that surfaces the right builder for the right project.' },
              { n: '03', t: 'Execution', d: 'The Collaboration Yard — where matched teams build, track, and ship against a living Flowchart.' },
            ].map((l, i) => (
              <motion.div
                key={l.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card p-8"
              >
                <div className="font-mono text-xs text-bolt-400">{l.n}</div>
                <h3 className="mt-3 font-display text-2xl font-semibold text-white">{l.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-sand-400">{l.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-max container-px">
          <SectionHeading
            label="Capabilities"
            title="Built for the way senior engineers work"
            description="Each capability reinforces the next. By the time a competitor copies one feature, the network effects of the loop defend the rest."
          />
          <div className="mt-16">
            <FeatureGrid />
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  )
}
