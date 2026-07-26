import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Zap, GitBranch, Boxes, Radio, Ship, Sparkles } from 'lucide-react'
import HeroFlowchart from '../components/landing/HeroFlowchart'
import SectionHeading from '../components/landing/SectionHeading'
import ChunkPipeline from '../components/landing/ChunkPipeline'
import FeatureGrid from '../components/landing/FeatureGrid'
import StatsBand from '../components/landing/StatsBand'
import CtaBand from '../components/landing/CtaBand'
import TestimonialRow from '../components/landing/TestimonialRow'
import NodeStatesShowcase from '../components/landing/NodeStatesShowcase'

export default function LandingPage() {
  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-32 pb-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-bolt-500/10 blur-[140px]" />
          <div className="absolute bottom-0 right-0 h-[400px] w-[500px] rounded-full bg-bloom-500/10 blur-[120px]" />
        </div>

        <div className="container-max container-px relative">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="chip mb-6"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-bloom-400 animate-glow" />
                Phase 2 — The Collaboration Yard
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.05 }}
                className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight text-white"
              >
                Decompose ambition.
                <br />
                <span className="text-gradient">Ship the future.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="mt-6 max-w-xl text-lg leading-relaxed text-sand-300"
              >
                Shipyard is the global developer identity core. We don't just connect builders to
                projects — we break visions into executable chunks, visualize progress as a living
                flowchart, and ship to production with one button.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="mt-9 flex flex-wrap items-center gap-4"
              >
                <Link to="/new" className="btn-primary">
                  <Zap className="h-4 w-4" />
                  Start Building
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/flowchart" className="btn-ghost">
                  See the Flowchart OS
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-10 flex items-center gap-6 text-xs text-sand-500"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-bolt-300" />
                  AI Chunking Engine
                </div>
                <div className="flex items-center gap-2">
                  <GitBranch className="h-4 w-4 text-bolt-300" />
                  Living Flowchart
                </div>
                <div className="flex items-center gap-2">
                  <Ship className="h-4 w-4 text-bolt-300" />
                  One-Button Live
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="lg:col-span-6"
            >
              <HeroFlowchart />
            </motion.div>
          </div>
        </div>
      </section>

      <StatsBand />

      {/* THE METHOD */}
      <section className="relative py-28">
        <div className="container-max container-px">
          <SectionHeading
            label="The Shipyard Method"
            title="Chunking beats prompting"
            description="Current AI coding tools treat code as a conversation. Senior engineers treat it as a construction project. Shipyard productizes the discipline that ships real products."
          />
          <div className="mt-16">
            <ChunkPipeline />
          </div>
        </div>
      </section>

      {/* FLOWCHART OS SHOWCASE */}
      <section className="relative py-28">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-ink-900/40 to-transparent" />
        <div className="container-max container-px">
          <SectionHeading
            label="Flowchart OS"
            title="A living map of your project"
            description="Every chunk has a state. Every dependency has a line. Every builder knows exactly what to do next — even after stepping away."
          />
          <div className="mt-16">
            <NodeStatesShowcase />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative py-28">
        <div className="container-max container-px">
          <SectionHeading
            label="The Closed Loop"
            title="Every layer makes the next more valuable"
            description="Identity attracts builders. Chunking creates structure. The Flowchart creates visibility. The Local Bridge creates trust. One button creates completion. Reputation feeds back into identity."
          />
          <div className="mt-16">
            <FeatureGrid />
          </div>
        </div>
      </section>

      <TestimonialRow />

      <CtaBand />
    </div>
  )
}
