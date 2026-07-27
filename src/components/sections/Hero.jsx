import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import { ArrowRight, Play, ShoppingCart, BarChart3, Package, Users, Receipt, TrendingUp, Shield, Wifi, Signal, BatteryFull } from 'lucide-react'

const floatingCards = [
  { icon: Receipt, label: 'GST Billing', color: 'from-violet-500 to-purple-600', delay: 0, position: '-left-[120px] top-[18%]', floatDuration: 4.2, floatY: 8 },
  { icon: Package, label: 'Inventory', color: 'from-cyan-500 to-blue-600', delay: 0.3, position: '-right-[100px] top-[14%]', floatDuration: 5.0, floatY: 10 },
  { icon: BarChart3, label: 'Analytics', color: 'from-emerald-500 to-teal-600', delay: 0.6, position: '-left-[110px] top-[52%]', floatDuration: 4.6, floatY: 7 },
  { icon: Users, label: 'Cashiers', color: 'from-orange-500 to-amber-600', delay: 0.9, position: '-right-[95px] top-[72%]', floatDuration: 5.4, floatY: 9 },
]

const stats = [
  { value: 10000, suffix: '+', label: 'Active Vendors', prefix: '' },
  { value: 2, suffix: 'Cr+', label: 'Bills Processed', prefix: '₹' },
  { value: 99.9, suffix: '%', label: 'Uptime SLA', prefix: '', decimals: 1 },
  { value: 4.9, suffix: '★', label: 'Average Rating', prefix: '', decimals: 1 },
]

const statCards = [
  { label: 'Today Sales', value: '₹24,580', icon: TrendingUp, color: 'from-brand-500 to-violet-600' },
  { label: 'Bills Created', value: '142', icon: Receipt, color: 'from-emerald-500 to-teal-600' },
  { label: 'Products', value: '1,284', icon: Package, color: 'from-orange-500 to-amber-600' },
  { label: 'Active Cashiers', value: '6', icon: Users, color: 'from-rose-500 to-pink-600' },
]

const categories = [
  ['Beverages', 40, 'bg-brand-500'],
  ['Snacks', 30, 'bg-violet-500'],
  ['Dairy', 20, 'bg-emerald-500'],
]

const barHeights = [40, 65, 45, 80, 90, 70, 95]

/* ─── Animated counter hook ─── */
function useCounter(target, duration = 2000, delay = 0) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          setTimeout(() => {
            const start = performance.now()
            const step = (now) => {
              const elapsed = now - start
              const progress = Math.min(elapsed / duration, 1)
              const eased = 1 - Math.pow(1 - progress, 3)
              setCount(eased * target)
              if (progress < 1) requestAnimationFrame(step)
            }
            requestAnimationFrame(step)
          }, delay)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration, delay])

  return [count, ref]
}

/* ─── Floating card component ─── */
function FloatingCard({ card, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, x: index % 2 === 0 ? -30 : 30 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 1.0 + card.delay, type: 'spring', stiffness: 200, damping: 15 }}
      className={`absolute ${card.position} z-20 hidden sm:flex items-center gap-2 glass rounded-xl px-3 py-2 shadow-xl`}
    >
      <motion.div
        animate={{
          y: [0, -card.floatY, 0, card.floatY * 0.6, 0],
        }}
        transition={{
          duration: card.floatDuration,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="flex items-center gap-2"
      >
        <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center flex-shrink-0`}>
          <card.icon className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="text-xs font-semibold text-white whitespace-nowrap">{card.label}</span>
      </motion.div>
    </motion.div>
  )
}

/* ─── Stat item with counter ─── */
function StatItem({ stat, index }) {
  const [count, ref] = useCounter(stat.value, 2200, index * 150)
  const decimals = stat.decimals ?? 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay: index * 0.1, type: 'spring', stiffness: 180, damping: 20 }}
      whileHover={{ y: -4, scale: 1.03 }}
      className="glass rounded-2xl p-5 text-center card-hover cursor-default"
    >
      <motion.div
        className="font-display font-bold text-2xl sm:text-3xl text-white mb-1"
        initial={{ opacity: 0.5 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {stat.prefix}{decimals > 0 ? count.toFixed(decimals) : Math.round(count).toLocaleString('en-IN')}{stat.suffix}
      </motion.div>
      <div className="text-sm text-slate-400">{stat.label}</div>
    </motion.div>
  )
}

/* ─── Animated bar ─── */

function AnimatedBar({ height, index }) {
  return (
    <motion.div
      className="flex-1 rounded-sm"
      initial={{ height: 0 }}
      whileInView={{ height: `${height}%` }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, delay: 1.4 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: index === 4
          ? 'linear-gradient(to top, #6366f1, #8b5cf6)'
          : index === 6
          ? 'linear-gradient(to top, #06b6d4, #3b82f6)'
          : 'rgba(99,102,241,0.18)',
      }}
    />
  )
}

/* ─── Animated progress bar ─── */
function AnimatedProgress({ width, color, label, percentage, delay }) {
  return (
    <div>
      <div className="flex justify-between mb-0.5">
        <motion.span
          className="text-[7px] text-slate-300"
          initial={{ opacity: 0, x: -5 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.1 }}
        >
          {label}
        </motion.span>
        <motion.span
          className="text-[7px] text-white font-semibold"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.3 }}
        >
          {percentage}%
        </motion.span>
      </div>
      <div className="h-1 bg-white/8 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${color} rounded-full`}
          initial={{ width: 0 }}
          whileInView={{ width: `${width}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: delay + 0.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  )
}

/* ─── Phone inner stat card ─── */
function PhoneStatCard({ icon: Icon, value, label, badge, badgeColor, accentColor, delay }) {
  return (
    <motion.div
      className="bg-white/5 border border-white/8 rounded-xl p-2 relative overflow-hidden"
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay: 1.2 + delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center justify-between mb-1">
        <div className={`w-4 h-4 rounded-md flex items-center justify-center`} style={{ backgroundColor: `${accentColor}20` }}>
          <Icon className="w-2 h-2" style={{ color: accentColor }} />
        </div>
        <span className="text-[6px] rounded-full px-1.5 py-0.5" style={{ color: accentColor, backgroundColor: `${accentColor}15` }}>{badge}</span>
      </div>
      <motion.div
        className="text-white font-bold text-[11px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 + delay }}
      >
        {value}
      </motion.div>
      <div className="text-slate-500 text-[6px]">{label}</div>
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-xl"
        style={{ backgroundColor: accentColor }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: 1.6 + delay, ease: [0.22, 1, 0.36, 1] }}
        originX={0}
      />

        </motion.div>
  )
}

/* ─── Main Hero ─── */
export default function Hero() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 50, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 30 })
  const rotateX = useTransform(springY, [-200, 200], [4, -4])
  const rotateY = useTransform(springX, [-200, 200], [-4, 4])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    mouseX.set(e.clientX - cx)
    mouseY.set(e.clientY - cy)
  }
  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brand-600/20 rounded-full blur-[120px]"
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -20, 15, 0],
            scale: [1, 1.05, 0.97, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-violet-600/15 rounded-full blur-[100px]"
          animate={{
            x: [0, -25, 20, 0],
            y: [0, 20, -15, 0],
            scale: [1, 0.95, 1.05, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-500/5 rounded-full blur-[80px]"
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div
           initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 200, damping: 20 }}
            whileHover={{ scale: 1.04, borderColor: 'rgba(99,102,241,0.4)' }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-brand-500/20 mb-8 cursor-default"
          >
            <motion.span
              className="w-2 h-2 bg-accent-400 rounded-full"
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="text-sm font-medium text-slate-300">
              Trusted by <span className="text-white font-semibold">10,000+ businesses</span> across India
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.05] tracking-tight mb-6"
          >
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              Run Your Entire Business
            </motion.span>
            <br />
            <motion.span
              className="text-gradient inline-block"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              with One Powerful
            </motion.span>
            <br />
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              POS Platform
            </motion.span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Manage billing, inventory, products, cashiers, GST invoices, and subscriptions from one cloud-based POS system built for modern Indian businesses.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <motion.a
              href="https://app.yourdomain.com/register"
              className="group flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-600 to-violet-600 hover:from-brand-500 hover:to-violet-500 text-white font-semibold text-base shadow-xl shadow-brand-500/30 hover:shadow-brand-500/50 transition-colors duration-200"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              Start Free Trial — It's Free
              <motion.span
                className="inline-block"
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </motion.a>
            <motion.button
              className="flex items-center gap-3 px-7 py-4 rounded-2xl glass hover:bg-white/10 text-white font-medium text-base transition-colors duration-200 group"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.span
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/15 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <Play className="w-4 h-4 text-white fill-white ml-0.5" />
              </motion.span>
              Watch Demo
            </motion.button>
          </motion.div>

          {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {stats.map((stat, i) => (
              <StatItem key={stat.label} stat={stat} index={i} />
            ))}
          </div>

          {/* Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-w-[300px] mx-auto"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Floating feature cards */}
            {floatingCards.map((card, i) => (
              <FloatingCard key={card.label} card={card} index={i} />
            ))}

            {/* Connector lines from floating cards to phone (decorative) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 hidden sm:block" viewBox="0 0 300 600" fill="none">
              <motion.line
                x1="0" y1="110" x2="60" y2="130"
                stroke="url(#line-grad-1)" strokeWidth="1" strokeDasharray="4 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.3 }}
                transition={{ duration: 1, delay: 1.5 }}
              />
              <motion.line
                x1="300" y1="90" x2="240" y2="120"
                stroke="url(#line-grad-2)" strokeWidth="1" strokeDasharray="4 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.3 }}
                transition={{ duration: 1, delay: 1.7 }}
              />
              <motion.line
                x1="0" y1="320" x2="60" y2="300"
                stroke="url(#line-grad-3)" strokeWidth="1" strokeDasharray="4 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.3 }}
                transition={{ duration: 1, delay: 1.9 }}
              />
              <motion.line
                x1="300" y1="430" x2="240" y2="400"
                stroke="url(#line-grad-4)" strokeWidth="1" strokeDasharray="4 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.3 }}
                transition={{ duration: 1, delay: 2.1 }}
              />
              <defs>
                <linearGradient id="line-grad-1" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.6" />
                </linearGradient>
                <linearGradient id="line-grad-2" x1="1" y1="0" x2="0" y2="0">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.6" />
                </linearGradient>
                <linearGradient id="line-grad-3" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#14b8a6" stopOpacity="0" />
                  <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.6" />
                </linearGradient>
                <linearGradient id="line-grad-4" x1="1" y1="0" x2="0" y2="0">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.6" />
                </linearGradient>
              </defs>
            </svg>

            {/* Phone frame with 3D tilt */}
            <motion.div
              style={{ rotateX, rotateY, transformPerspective: 800 }}
              className="relative glass rounded-[2.75rem] p-3 shadow-2xl shadow-black/50 glow"
            >
              {/* Side buttons */}
              <div className="absolute -left-[3px] top-24 w-[3px] h-8 bg-surface-700/60 rounded-l-sm" />
              <div className="absolute -left-[3px] top-36 w-[3px] h-12 bg-surface-700/60 rounded-l-sm" />
              <div className="absolute -right-[3px] top-32 w-[3px] h-16 bg-surface-700/60 rounded-r-sm" />

              <div className="relative rounded-[2.25rem] overflow-hidden bg-[#0d0d1a]" style={{ aspectRatio: '9/19.5' }}>

                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#0d0d1a] rounded-b-2xl z-30 flex items-center justify-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-surface-700" />
                  <div className="w-8 h-1.5 rounded-full bg-surface-700" />
                </div>

                {/* Status bar */}
                <div className="absolute top-0 left-0 right-0 h-9 flex items-center justify-between px-6 pt-1.5 z-20 text-white">
                  <span className="text-[10px] font-semibold">9:41</span>
                  <div className="flex items-center gap-1">
                    <Signal className="w-2.5 h-2.5" />
                    <Wifi className="w-2.5 h-2.5" />
                    <BatteryFull className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Dashboard content */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0f0c29] via-[#1a1535] to-[#0d0d1a] pt-10 px-3 pb-4 overflow-hidden">

                  {/* App bar */}
                  <motion.div
                    className="flex items-center justify-between mb-3"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.4 }}
                  >
                    <div className="flex items-center gap-2">
                      <motion.div
                        className="w-6 h-6 rounded-lg bg-gradient-to-br from-brand-500 to-violet-600 flex items-center justify-center"
                        animate={{ rotate: [0, 5, -5, 0] }}
                             transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <ShoppingCart className="w-3 h-3 text-white" />
                      </motion.div>
                      <span className="text-xs font-semibold text-white">SmartPOS</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <motion.div
                        className="flex items-center gap-1 bg-emerald-500/15 border border-emerald-500/20 rounded-full px-2 py-0.5"
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <motion.div
                          className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <span className="text-[8px] font-semibold text-emerald-400">Live</span>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Greeting */}
                  <motion.div
                    className="mb-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.0, duration: 0.3 }}
                  >
                    <p className="text-[9px] text-slate-400">Good Afternoon, Shop 👋</p>
                    <p className="text-[7px] text-slate-500">24 Jun 2026</p>
                  </motion.div>

                  {/* Today Sales hero card */}
                  <motion.div
                    className="rounded-xl p-3 mb-2.5 bg-gradient-to-br from-brand-500 to-violet-600 relative overflow-hidden"
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 1.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[8px] text-white/75 font-medium">Today's Sales</span>
                      <div className="flex items-center gap-1 bg-white/10 rounded-full px-1.5 py-0.5">
                        <TrendingUp className="w-2 h-2 text-white/80" />
                        <span className="text-[7px] text-white/80">Today</span>
                      </div>
                    </div>
                    <motion.div
                      className="text-white font-bold text-xl"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.3, duration: 0.4 }}
                    >
                      {statCards[0].value}
                    </motion.div>
                    {/* Decorative circles with animation */}
                    <motion.div
                      className="absolute -right-4 -bottom-4 w-16 h-16 rounded-full bg-white/5"
                      animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                      className="absolute -right-1 -bottom-6 w-12 h-12 rounded-full bg-white/5"
                      animate={{ scale: [1, 0.8, 1], rotate: [0, -60, 0] }}
                      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  </motion.div>

                  {/* 2×2 stat cards grid */}
                  <div className="grid grid-cols-2 gap-1.5 mb-2.5">
                    <PhoneStatCard icon={Receipt} value="₹1.2L" label="Monthly Sales" badge="This month" accentColor="#10b981" delay={0} />
                    <PhoneStatCard icon={BarChart3} value="142" label="Total Orders" badge="All time" accentColor="#6366f1" delay={0.08} />
                    <PhoneStatCard icon={Package} value="1,284" label="Total Products" badge="Listed" accentColor="#f97316" delay={0.16} />
                    <PhoneStatCard icon={Users} value="6" label="Cashiers" badge="Active" accentColor="#f43f5e" delay={0.24} />
                    </div>
                     <motion.div
                    className="glass rounded-xl p-2.5 mb-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.35, duration: 0.4 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[8px] text-slate-400 font-medium">Revenue Chart</span>
                      <div className="flex gap-1">
                        <span className="text-[6.5px] text-slate-500 bg-white/5 rounded-full px-1.5 py-0.5">Daily</span>
                        <span className="text-[6.5px] text-white bg-brand-500 rounded-full px-1.5 py-0.5">Weekly</span>
                        <span className="text-[6.5px] text-slate-500 bg-white/5 rounded-full px-1.5 py-0.5">Monthly</span>
                      </div>
                    </div>
                    <div className="flex items-end gap-1 h-10">
                      {barHeights.map((h, i) => (
                        <AnimatedBar key={i} height={h} index={i} />
                      ))}
                    </div>
                    <div className="flex justify-between mt-1">
                      {['T', 'F', 'S', 'S', 'M', 'T', 'W'].map((d, i) => (
                        <span key={i} className="flex-1 text-center text-[5.5px] text-slate-600">{d}</span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Top categories */}
                  <motion.div
                    className="glass rounded-xl p-2.5"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.4 }}
                  >
                    <div className="text-[8px] text-slate-400 mb-1.5 font-medium">Top Categories</div>
                    <div className="space-y-1.5">
                      {categories.map(([name, w, color], i) => (
                        <AnimatedProgress
                          key={name}
                          width={w}
                          color={color}
                          label={name}
                          percentage={w}
                          delay={1.6 + i * 0.15}
                        />
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Bottom home indicator */}
                <motion.div
                  className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/25 rounded-full z-30"
                  animate={{ opacity: [0.25, 0.5, 0.25] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                {/* Gradient overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#0d0d1a]/60 to-transparent pointer-events-none z-10" />
              </div>
            </motion.div>

            {/* Glow reflection under phone */}
            <motion.div
              className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[60%] h-16 bg-brand-500/20 rounded-full blur-[40px]"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scaleX: [0.9, 1.1, 0.9],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </div>
      </div>

      {/* Bottom fade to next section */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#060612] to-transparent pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      />
    </section>
  )
}