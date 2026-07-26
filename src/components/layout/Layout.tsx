import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Zap } from 'lucide-react'
import { clsx } from 'clsx'
import Logo from './Logo'
import Footer from './Footer'

const navLinks = [
  { to: '/product', label: 'Product' },
  { to: '/flowchart', label: 'Flowchart OS' },
  { to: '/builders', label: 'Builders' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/docs', label: 'Docs' },
]

export default function Layout() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    window.scrollTo({ top: 0 })
  }, [location.pathname])

  return (
    <div className="min-h-screen flex flex-col">
      <header
        className={clsx(
          'fixed top-0 inset-x-0 z-50 transition-all duration-500',
          scrolled ? 'py-3' : 'py-5',
        )}
      >
        <div className="container-max container-px">
          <div
            className={clsx(
              'flex items-center justify-between rounded-full px-5 py-2.5 transition-all duration-500',
              scrolled ? 'glass-strong shadow-2xl shadow-black/40' : 'bg-transparent',
            )}
          >
            <Link to="/" className="flex items-center gap-2.5 group">
              <Logo className="h-8 w-8 transition-transform group-hover:scale-110" />
              <span className="font-display text-lg font-semibold tracking-tight text-white">
                Shipyard
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) =>
                    clsx(
                      'relative px-4 py-2 text-sm font-medium rounded-full transition-colors',
                      isActive
                        ? 'text-white'
                        : 'text-sand-400 hover:text-sand-100',
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-0 rounded-full bg-white/10"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className="relative">{l.label}</span>
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/dashboard"
                className="text-sm font-medium text-sand-300 hover:text-white transition-colors"
              >
                Sign in
              </Link>
              <Link to="/new" className="btn-primary !py-2 !px-5">
                <Zap className="h-4 w-4" />
                Start Building
              </Link>
            </div>

            <button
              className="md:hidden p-2 text-sand-100"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="md:hidden mt-2 glass-strong rounded-2xl p-4 flex flex-col gap-1"
              >
                {navLinks.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    className={({ isActive }) =>
                      clsx(
                        'px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                        isActive ? 'bg-white/10 text-white' : 'text-sand-300 hover:bg-white/5',
                      )
                    }
                  >
                    {l.label}
                  </NavLink>
                ))}
                <div className="h-px bg-white/10 my-2" />
                <Link to="/dashboard" className="px-4 py-3 text-sm font-medium text-sand-200">
                  Sign in
                </Link>
                <Link to="/new" className="btn-primary justify-center">
                  <Zap className="h-4 w-4" />
                  Start Building
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
