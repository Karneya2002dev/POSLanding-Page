import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../../hooks/useInView'
import {
  UserPlus,
  LayoutDashboard,
  Tag,
  Package,
  Users,
  Receipt,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: UserPlus,
    title: 'Register your account',
    description:
      'Create your SmartPOS vendor account in under 60 seconds. No credit card required on the free tier. Your JWT token and dashboard are ready instantly.',
    color: 'from-brand-500 to-violet-600',
    glow: 'shadow-brand-500/30',
    accent: 'bg-brand-500/10 text-brand-400',
    tags: ['JWT issued', 'Dashboard unlocked'],
    cards: [
      { label: 'Business name', value: 'Store display name', sub: 'Shown on all bills' },
      { label: 'GST / Tax ID', value: 'Optional on free', sub: 'Required for GST billing' },
      { label: 'Plan', value: 'Free to start', sub: 'Upgrade anytime' },
    ],
  },
  {
    number: '02',
    icon: LayoutDashboard,
    title: 'Vendor dashboard',
    description:
      'Your command centre. Manage categories, products, inventory, cashiers, billing, and subscription — all from one screen with plan-limit enforcement built in.',
    color: 'from-cyan-500 to-blue-600',
    glow: 'shadow-cyan-500/30',
    accent: 'bg-cyan-500/10 text-cyan-400',
    tags: ['Role: vendor', 'Plan limits enforced'],
    cards: [
      { label: 'Module', value: 'Categories & products', sub: '→ Step 3' },
      { label: 'Module', value: 'Inventory', sub: '→ Step 4' },
      { label: 'Module', value: 'Cashier management', sub: '→ Step 5' },
    ],
  },
  {
    number: '03',
    icon: Tag,
    title: 'Categories & products',
    description:
      'Build your product catalogue: create categories, then add products with pricing, GST rates, and HSN codes. Your plan tier controls how many products you can add.',
    color: 'from-emerald-500 to-teal-600',
    glow: 'shadow-emerald-500/30',
    accent: 'bg-emerald-500/10 text-emerald-400',
    tags: ['DB: categories · products', 'Plan-based product limit'],
    cards: [
      { label: 'Category', value: 'Beverages', sub: 'Group products by type' },
      { label: 'Product', value: 'Cold Coffee', sub: '₹80 · HSN 2101' },
      { label: 'GST rate', value: '18%', sub: 'Per-product setting' },
    ],
  },
  {
    number: '04',
    icon: Package,
    title: 'Inventory management',
    description:
      'Set opening stock and low-stock thresholds per product. Every bill auto-deducts stock in real time, and you get alerts before running out.',
    color: 'from-orange-500 to-amber-600',
    glow: 'shadow-orange-500/30',
    accent: 'bg-orange-500/10 text-orange-400',
    tags: ['Low-stock push alerts', 'Inventory table logs all changes'],
    cards: [
      { label: 'Opening stock', value: '200 units', sub: 'Set per product' },
      { label: 'Alert threshold', value: 'Below 20', sub: 'You choose the level' },
      { label: 'Auto deduction', value: 'On every bill', sub: 'Real-time tracking' },
    ],
  },
  {
    number: '05',
    icon: Users,
    title: 'Add cashier',
    description:
      'Create a cashier account from the dashboard. SmartPOS auto-generates login credentials and hard-links the cashier to your vendor via a foreign key constraint.',
    color: 'from-violet-500 to-purple-600',
    glow: 'shadow-violet-500/30',
    accent: 'bg-violet-500/10 text-violet-400',
    tags: ['vendor_id FK enforced', 'Cashier limit by plan'],
    cards: [
      { label: 'Credentials', value: 'Auto-generated', sub: 'Username + password' },
      { label: 'Role', value: 'cashier', sub: 'Scoped JWT token' },
      { label: 'Linked to', value: 'Your vendor ID', sub: 'DB foreign key' },
    ],
  },
  {
    number: '06',
    icon: Receipt,
    title: 'Cashier starts billing',
    description:
      'Cashier logs in with their credentials, picks products from your catalogue, and generates GST-compliant bills in seconds. Stock deducts automatically and every sale feeds your vendor reports.',
    color: 'from-pink-500 to-rose-600',
    glow: 'shadow-pink-500/30',
    accent: 'bg-pink-500/10 text-pink-400',
    tags: ['Print / share receipt', 'Inventory auto-deducted', 'Visible in vendor reports'],
    cards: [
      { label: 'Bill total', value: '₹472.40', sub: 'incl. 18% GST' },
      { label: 'Saved to', value: 'bills + bill_items', sub: 'Full audit trail' },
      { label: 'Stock', value: 'Auto-deducted', sub: 'Real-time inventory' },
    ],
  },
]

export default function HowItWorks() {
  const [ref, inView] = useInView()
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const go = (index) => {
    setDirection(index > current ? 1 : -1)
    setCurrent(index)
  }

  const prev = () => current > 0 && go(current - 1)
  const next = () => current < steps.length - 1 && go(current + 1)

  const step = steps[current]
  const Icon = step.icon
  const progress = ((current + 1) / steps.length) * 100

  const variants = {
    enter: (d) => ({ opacity: 0, x: d > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit: (d) => ({ opacity: 0, x: d > 0 ? -40 : 40 }),
  }

  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div ref={ref} className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-semibold text-brand-400 mb-5">
            How It Works
          </span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white mb-5">
            From signup to first bill in{' '}
            <span className="text-gradient">six steps</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Vendor registers, sets up the store, adds cashiers — cashier starts billing. That's the whole story.
          </p>
        </motion.div>

        {/* Step dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center gap-3 mb-10"
        >
          {steps.map((s, i) => (
            <button
              key={s.number}
              onClick={() => go(i)}
              aria-label={`Go to step ${i + 1}: ${s.title}`}
              className={`
                relative transition-all duration-300 rounded-full
                ${i === current
                  ? 'w-8 h-3 bg-white'
                  : i < current
                  ? 'w-3 h-3 bg-white/40'
                  : 'w-3 h-3 bg-white/15 hover:bg-white/30'}
              `}
            />
          ))}
        </motion.div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass rounded-3xl border border-white/8 overflow-hidden"
        >
          {/* Progress bar */}
          <div className="h-0.5 bg-white/5">
            <motion.div
              className={`h-full bg-gradient-to-r ${step.color}`}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>

          <div className="p-8 sm:p-10">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.28, ease: 'easeInOut' }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                  {/* Left: step info */}
                  <div className="flex flex-col">
                    {/* Step number + icon */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-xl ${step.glow} flex-shrink-0`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <span className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-semibold ${step.accent} mb-1`}>
                          Step {step.number}
                        </span>
                        <h3 className="font-display font-bold text-2xl text-white leading-tight">
                          {step.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-slate-400 leading-relaxed mb-8 flex-1">
                      {step.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {step.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-slate-300 border border-white/8"
                        >
                          <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: detail cards */}
                  <div className="grid grid-cols-1 gap-3 content-start">
                    {step.cards.map((card, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 rounded-2xl bg-white/4 border border-white/6 px-5 py-4"
                      >
                        <div className={`w-2 h-8 rounded-full bg-gradient-to-b ${step.color} flex-shrink-0`} />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-0.5">
                            {card.label}
                          </div>
                          <div className="text-white font-semibold text-sm truncate">
                            {card.value}
                          </div>
                        </div>
                        <span className="text-xs text-slate-500 text-right flex-shrink-0 hidden sm:block">
                          {card.sub}
                        </span>
                      </div>
                    ))}
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation footer */}
          <div className="px-8 sm:px-10 pb-8 flex items-center justify-between gap-4">
            <button
              onClick={prev}
              disabled={current === 0}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-slate-400 hover:text-white border border-white/8 hover:border-white/20 bg-white/3 hover:bg-white/6 disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-200"
            >
              <ChevronLeft className="w-4 h-4" />
              Prev
            </button>

            <span className="text-xs text-slate-500 font-medium">
              {current + 1} / {steps.length}
            </span>

            {current < steps.length - 1 ? (
              <button
                onClick={next}
                className={`flex items-center gap-1.5 px-5 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r ${step.color} hover:opacity-90 shadow-lg transition-all duration-200 hover:-translate-y-0.5`}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <a
                href="https://app.yourdomain.com/register"
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-violet-600 hover:from-brand-500 hover:to-violet-500 shadow-lg shadow-brand-500/25 transition-all duration-200 hover:-translate-y-0.5"
              >
                Get started free
                <ChevronRight className="w-4 h-4" />
              </a>
            )}
          </div>
        </motion.div>

        {/* Step list — quick jump */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2"
        >
          {steps.map((s, i) => {
            const SIcon = s.icon
            return (
              <button
                key={s.number}
                onClick={() => go(i)}
                className={`
                  group flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all duration-200 text-center
                  ${i === current
                    ? 'border-white/20 bg-white/8 text-white'
                    : 'border-white/5 bg-white/2 text-slate-500 hover:border-white/12 hover:bg-white/5 hover:text-slate-300'}
                `}
              >
                <SIcon className={`w-5 h-5 transition-colors ${i === current ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`} />
                <span className="text-xs font-medium leading-tight">{s.title}</span>
              </button>
            )
          })}
        </motion.div>

      </div>
    </section>
  )
}