import { Link } from 'react-router-dom'
import { Github, Twitter, Youtube, Instagram } from 'lucide-react'
import Logo from './Logo'

const cols = [
  {
    title: 'Product',
    links: [
      { label: 'Chunking Engine', to: '/product' },
      { label: 'Flowchart OS', to: '/flowchart' },
      { label: 'Local Dev Bridge', to: '/product' },
      { label: 'Team Hub', to: '/product' },
      { label: 'One-Button Live', to: '/product' },
    ],
  },
  {
    title: 'Platform',
    links: [
      { label: 'Builder Directory', to: '/builders' },
      { label: 'Pricing', to: '/pricing' },
      { label: 'Documentation', to: '/docs' },
      { label: 'Dashboard', to: '/dashboard' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/' },
      { label: 'Blog', to: '/' },
      { label: 'Careers', to: '/' },
      { label: 'Contact', to: '/' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="relative mt-32 border-t border-white/5">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ink-950 pointer-events-none" />
      <div className="container-max container-px relative py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10">
          <div className="col-span-2 md:col-span-3">
            <Link to="/" className="flex items-center gap-2.5">
              <Logo className="h-9 w-9" />
              <span className="font-display text-xl font-semibold text-white">Shipyard</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-sand-400">
              The global developer identity core. Decompose ambition into executable chunks,
              visualize progress as a living flowchart, and ship to production with one button.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[Github, Twitter, Youtube, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-9 w-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-sand-400 hover:text-white hover:border-white/20 hover:bg-white/10 transition-all"
                  aria-label="social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-sand-500">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-sm text-sand-300 hover:text-white transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="hairline mt-14" />

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-sand-500">
            © {new Date().getFullYear()} Shipyard. Built by builders, for builders.
          </p>
          <div className="flex items-center gap-6 text-xs text-sand-500">
            <a href="#" className="hover:text-sand-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-sand-300 transition-colors">Terms</a>
            <a href="#" className="hover:text-sand-300 transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
