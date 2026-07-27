import { useState, useEffect, useRef } from 'react'
import { Menu, X, Zap, ChevronDown, LayoutDashboard, BarChart2, Package, Receipt, Users, Cloud, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const FEATURES_MENU = [
  { icon: LayoutDashboard, label: 'Dashboard', desc: 'Live sales overview', color: 'text-brand-400' },
  { icon: Receipt, label: 'GST Billing', desc: 'Auto-calculated invoices', color: 'text-violet-400' },
  { icon: Package, label: 'Inventory', desc: 'Real-time stock tracking', color: 'text-cyan-400' },
  { icon: BarChart2, label: 'Reports', desc: 'Revenue & profit insights', color: 'text-emerald-400' },
  { icon: Users, label: 'Multi-Cashier', desc: 'Role-based counter access', color: 'text-orange-400' },
  { icon: Cloud, label: 'Cloud Sync', desc: 'Automatic daily backups', color: 'text-rose-400' },
]

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Features', href: '#features', hasDropdown: true },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [featuresOpen, setFeaturesOpen] = useState(false)
  const [mobileFeatures, setMobileFeatures] = useState(false)
  const dropdownRef = useRef(null)
  const timeoutRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      const total = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setFeaturesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const openFeatures = () => {
    clearTimeout(timeoutRef.current)
    setFeaturesOpen(true)
  }
  const closeFeatures = () => {
    timeoutRef.current = setTimeout(() => setFeaturesOpen(false), 150)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#07080f]/85 backdrop-blur-2xl border-b border-white/[0.06] shadow-2xl shadow-black/40'
            : 'bg-transparent'
        }`}
      >
        {/* Scroll progress bar */}
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-brand-500 via-violet-500 to-accent-400 transition-all duration-100 z-10"
          style={{ width: `${scrollProgress}%`, opacity: scrolled ? 1 : 0 }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[68px] lg:h-[76px]">

            {/* ── Logo ── */}
            <a href="#home" className="flex items-center gap-3 group shrink-0">
              <div className="relative w-9 h-9">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-brand-500 to-violet-600 shadow-lg shadow-brand-500/40 group-hover:shadow-brand-500/60 transition-shadow duration-300" />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-brand-500 to-violet-600 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300" />
                <div className="relative w-full h-full rounded-xl bg-gradient-to-br from-brand-500 to-violet-600 flex items-center justify-center">
                  <Zap className="w-[18px] h-[18px] text-white fill-white" />
                </div>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display font-extrabold text-[18px] text-white tracking-tight">
                  Smart<span className="text-gradient">POS</span>
                </span>
                <span className="text-[9px] font-medium text-slate-500 tracking-widest uppercase mt-0.5">Cloud POS Platform</span>
              </div>
            </a>

            {/* ── Desktop Nav ── */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) =>
                link.hasDropdown ? (
                  <div key={link.label} ref={dropdownRef} className="relative" onMouseEnter={openFeatures} onMouseLeave={closeFeatures}>
                    <button
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 group ${
                        featuresOpen ? 'text-white bg-white/8' : 'text-slate-400 hover:text-white hover:bg-white/6'
                      }`}
                    >
                      {link.label}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${featuresOpen ? 'rotate-180 text-brand-400' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {featuresOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.97 }}
                          transition={{ duration: 0.18, ease: 'easeOut' }}
                          onMouseEnter={openFeatures}
                          onMouseLeave={closeFeatures}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[480px] bg-[#0d0f1e]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden"
                        >
                          {/* Dropdown header */}
                          <div className="px-5 pt-5 pb-3 border-b border-white/6">
                            <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">Platform Features</p>
                          </div>
                          <div className="grid grid-cols-2 gap-1 p-3">
                            {FEATURES_MENU.map((f) => (
                              <a
                                key={f.label}
                                href="#features"
                                onClick={() => setFeaturesOpen(false)}
                                className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/6 transition-all duration-150 group/item"
                              >
                                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover/item:bg-white/10 transition-colors">
                                  <f.icon className={`w-4.5 h-4.5 ${f.color}`} style={{ width: 18, height: 18 }} />
                                </div>
                                <div>
                                  <div className="text-sm font-semibold text-white">{f.label}</div>
                                  <div className="text-xs text-slate-500 mt-0.5">{f.desc}</div>
                                </div>
                              </a>
                            ))}
                          </div>
                          <div className="px-3 pb-3">
                            <a
                              href="#features"
                              onClick={() => setFeaturesOpen(false)}
                              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-brand-500/10 hover:bg-brand-500/20 text-brand-400 text-sm font-semibold transition-all"
                            >
                              View all 15 features
                              <ArrowRight className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className="relative px-3.5 py-2 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/6 transition-all duration-200 group"
                  >
                    {link.label}
                    <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-px bg-gradient-to-r from-brand-400 to-violet-400 group-hover:w-4/5 transition-all duration-300 rounded-full" />
                  </a>
                )
              )}
            </div>

            {/* ── Desktop CTA Buttons ── */}
            <div className="hidden lg:flex items-center gap-2.5">
              <a
                href="https://app.yourdomain.com/login"
                className="text-sm font-medium text-slate-400 hover:text-white px-4 py-2.5 rounded-xl hover:bg-white/8 border border-transparent hover:border-white/10 transition-all duration-200"
              >
                Log in
              </a>

              <a
                href="https://app.yourdomain.com/register"
                className="relative group flex items-center gap-2 text-sm font-semibold text-white px-5 py-2.5 rounded-xl overflow-hidden"
              >
                {/* Button bg layers */}
                <span className="absolute inset-0 bg-gradient-to-r from-brand-600 to-violet-600 transition-opacity duration-300" />
                <span className="absolute inset-0 bg-gradient-to-r from-brand-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute inset-0 shadow-lg shadow-brand-500/30 group-hover:shadow-brand-500/50 transition-shadow duration-300 rounded-xl" />
                {/* Shimmer */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12" />
                <span className="relative flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 fill-white" />
                  Start Free Trial
                </span>
              </a>
            </div>

            {/* ── Mobile Toggle ── */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="lg:hidden relative w-9 h-9 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/8 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} />
                  </motion.span>
                ) : (
                  <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

          </div>
        </div>
      </motion.nav>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[300px] bg-[#0a0c17]/98 backdrop-blur-2xl border-l border-white/8 shadow-2xl shadow-black/60 flex flex-col lg:hidden"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 h-[68px] border-b border-white/8 shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-violet-600 flex items-center justify-center">
                    <Zap className="w-3.5 h-3.5 text-white fill-white" />
                  </div>
                  <span className="font-display font-extrabold text-base text-white">Smart<span className="text-gradient">POS</span></span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-lg border border-white/10 hover:bg-white/8 flex items-center justify-center text-slate-400 hover:text-white transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Nav links */}
              <div className="flex-1 overflow-y-auto py-4 px-3">
                {NAV_LINKS.map((link, i) =>
                  link.hasDropdown ? (
                    <div key={link.label}>
                      <button
                        onClick={() => setMobileFeatures(!mobileFeatures)}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/6 font-medium transition-all text-sm"
                      >
                        {link.label}
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileFeatures ? 'rotate-180 text-brand-400' : 'text-slate-500'}`} />
                      </button>
                      <AnimatePresence>
                        {mobileFeatures && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden ml-2"
                          >
                            <div className="py-1 space-y-0.5">
                              {FEATURES_MENU.map((f) => (
                                <a
                                  key={f.label}
                                  href="#features"
                                  onClick={() => setIsOpen(false)}
                                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-white/5 transition-all"
                                >
                                  <f.icon className={`w-4 h-4 ${f.color}`} />
                                  <span className="text-sm text-slate-400 hover:text-white">{f.label}</span>
                                </a>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/6 font-medium transition-all text-sm"
                    >
                      {link.label}
                    </a>
                  )
                )}
              </div>

              {/* Drawer footer CTAs */}
              <div className="px-3 pb-6 pt-3 border-t border-white/8 space-y-2.5 shrink-0">
                <a
                  href="https://app.yourdomain.com/login"
                  onClick={() => setIsOpen(false)}
                  className="block text-center py-3 rounded-xl text-slate-300 hover:text-white border border-white/10 hover:border-white/20 hover:bg-white/6 font-medium text-sm transition-all"
                >
                  Log in
                </a>
                <a
                  href="https://app.yourdomain.com/register"
                  onClick={() => setIsOpen(false)}
                  className="relative block text-center py-3.5 rounded-xl bg-gradient-to-r from-brand-600 to-violet-600 text-white font-bold text-sm shadow-xl shadow-brand-500/30 overflow-hidden group"
                >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12" />
                  <span className="relative flex items-center justify-center gap-2">
                    <Zap className="w-3.5 h-3.5 fill-white" />
                    Start Free Trial
                  </span>
                </a>
                <p className="text-center text-[10px] text-slate-600 pt-1">No credit card required • Free forever plan</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}