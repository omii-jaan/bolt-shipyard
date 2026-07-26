import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Check, Zap } from 'lucide-react'
import SectionHeading from '../components/landing/SectionHeading'

const tiers = [
  {
    name: 'Builder',
    price: 'Free',
    desc: 'For individual builders shipping solo projects.',
    features: ['Unlimited public projects', 'AI Chunking Engine (50 chunks/mo)', 'Flowchart OS', 'Local Dev Bridge', 'name@shipyard.dev email'],
    cta: 'Start free',
    highlight: false,
  },
  {
    name: 'Team',
    price: '$24',
    period: '/seat/mo',
    desc: 'For small teams building together in the Yard.',
    features: ['Everything in Builder', 'Unlimited chunks', 'Team Hub channels', 'Role-based views', 'One-Button Live', 'Priority support'],
    cta: 'Start 14-day trial',
    highlight: true,
  },
  {
    name: 'Studio',
    price: 'Custom',
    desc: 'For studios managing many projects and builders.',
    features: ['Everything in Team', 'Unlimited seats', 'SAML SSO', 'Audit logs', 'Dedicated success manager', 'Custom integrations'],
    cta: 'Talk to us',
    highlight: false,
  },
]

export default function PricingPage() {
  return (
    <div className="pt-32 pb-20">
      <section className="container-max container-px">
        <SectionHeading
          label="Pricing"
          title="Pay for the Yard, not the tools"
          description="The Chunking Engine, Flowchart OS, and Local Dev Bridge are free for individuals. Teams pay for collaboration and deployment."
        />
      </section>

      <section className="py-16">
        <div className="container-max container-px">
          <div className="grid lg:grid-cols-3 gap-6 items-start">
            {tiers.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative card p-8 ${t.highlight ? 'border-bolt-400/40 glow-bolt' : ''}`}
              >
                {t.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 chip !bg-bolt-500/20 !border-bolt-400/40 !text-bolt-200">
                    <Zap className="h-3 w-3" />
                    Most popular
                  </div>
                )}
                <h3 className="font-display text-xl font-semibold text-white">{t.name}</h3>
                <p className="mt-2 text-sm text-sand-400">{t.desc}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="font-display text-4xl font-semibold text-white">{t.price}</span>
                  {t.period && <span className="text-sm text-sand-500">{t.period}</span>}
                </div>
                <ul className="mt-6 space-y-3">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-sand-300">
                      <Check className="h-4 w-4 text-bolt-400 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/new"
                  className={`mt-8 w-full ${t.highlight ? 'btn-primary' : 'btn-ghost'} justify-center`}
                >
                  {t.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
