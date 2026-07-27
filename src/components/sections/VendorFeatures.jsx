import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../../hooks/useInView'
import {
  LayoutDashboard, BarChart2, Package, Tag,
  Receipt, FileText, Mail, CreditCard, Printer,
  UserCheck, Settings, TrendingUp, ArrowRight,
} from 'lucide-react'

// ─── Data ────────────────────────────────────────────────────────────────────

const categories = ['All', 'Billing', 'Inventory', 'Analytics', 'Settings']

const features = [
  {
    icon: Receipt,
    label: 'GST Billing',
    desc: 'CGST / SGST / IGST auto-calculated on every bill. Fully compliant invoices in seconds.',
    color: 'from-emerald-500 to-teal-600',
    dot: '#10b981',
    category: 'Billing',
    featured: true,
  },
  {
    icon: Printer,
    label: 'Printable bills',
    desc: 'One-tap thermal or A4 print. Works with any ESC/POS printer or browser print dialog.',
    color: 'from-blue-500 to-indigo-600',
    dot: '#3b82f6',
    category: 'Billing',
  },
  {
    icon: FileText,
    label: 'PDF invoice',
    desc: 'Branded, downloadable invoices with your logo, address and tax breakdown.',
    color: 'from-indigo-500 to-brand-600',
    dot: '#6366f1',
    category: 'Billing',
  },
  {
    icon: Mail,
    label: 'Email receipt',
    desc: 'Auto-send receipts to customers the moment a bill is created.',
    color: 'from-sky-500 to-cyan-600',
    dot: '#06b6d4',
    category: 'Billing',
  },
  {
    icon: Package,
    label: 'Inventory',
    desc: 'Real-time stock tracking. Every bill auto-deducts. Low-stock alerts keep you ready.',
    color: 'from-cyan-500 to-blue-600',
    dot: '#22d3ee',
    category: 'Inventory',
    featured: true,
  },
  {
    icon: Tag,
    label: 'Product management',
    desc: 'Bulk import, smart catalogues, and per-product GST rates.',
    color: 'from-violet-500 to-purple-600',
    dot: '#8b5cf6',
    category: 'Inventory',
  },
  {
    icon: TrendingUp,
    label: 'Categories',
    desc: 'Hierarchical product taxonomy keeps your catalogue organised as you scale.',
    color: 'from-orange-500 to-amber-600',
    dot: '#f59e0b',
    category: 'Inventory',
  },
  {
    icon: UserCheck,
    label: 'Multi-cashier',
    desc: 'Role-based access per counter. Each cashier gets their own scoped JWT login.',
    color: 'from-fuchsia-500 to-pink-600',
    dot: '#ec4899',
    category: 'Team',
    featured: true,
  },
  {
    icon: LayoutDashboard,
    label: 'Dashboard',
    desc: 'Live metrics and KPIs at a glance — sales, stock levels, top products.',
    color: 'from-brand-500 to-violet-600',
    dot: '#7c3aed',
    category: 'Analytics',
    featured: true,
  },
  {
    icon: BarChart2,
    label: 'Sales reports',
    desc: 'Daily, weekly, and monthly breakdowns with export to PDF or CSV.',
    color: 'from-emerald-500 to-teal-600',
    dot: '#059669',
    category: 'Analytics',
  },
  {
    icon: CreditCard,
    label: 'Subscriptions',
    desc: 'Plan management and billing portal with Razorpay integration.',
    color: 'from-purple-500 to-violet-600',
    dot: '#9333ea',
    category: 'Settings',
  },
  {
    icon: Settings,
    label: 'Store settings',
    desc: 'Branding, tax rules, receipt footer, and notification preferences.',
    color: 'from-slate-500 to-slate-600',
    dot: '#64748b',
    category: 'Settings',
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function FeatureCard({ feature, index, inView }) {
  const Icon = feature.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.4) }}
      className="group relative glass rounded-2xl p-5 border border-white/5 hover:border-white/12
                 transition-all duration-300 hover:-translate-y-0.5 flex flex-col gap-3"
    >
      {/* Icon */}
      <div
        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feature.color}
                    flex items-center justify-center flex-shrink-0
                    group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon className="w-5 h-5 text-white" />
      </div>

      {/* Text */}
      <div>
        <h3 className="font-display font-semibold text-white text-sm mb-1 leading-tight">
          {feature.label}
        </h3>
        <p className="text-slate-500 text-xs leading-relaxed">{feature.desc}</p>
      </div>
    </motion.div>
  )
}

function FeaturedCard({ feature, index, inView }) {
  const Icon = feature.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="group relative glass rounded-2xl p-6 border border-white/8 hover:border-white/15
                 transition-all duration-300 hover:-translate-y-1 flex flex-col gap-4 overflow-hidden"
    >
      {/* Faint radial tint in corner */}
      <div
        className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-10 pointer-events-none"
        style={{ background: feature.dot }}
      />

      <div className="flex items-start justify-between">
        <div
          className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.color}
                      flex items-center justify-center flex-shrink-0
                      group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
        <span
          className="text-[10px] font-semibold px-2 py-0.5 rounded-full border"
          style={{
            color: feature.dot,
            borderColor: `${feature.dot}40`,
            background: `${feature.dot}12`,
          }}
        >
          featured
        </span>
      </div>

      <div>
        <h3 className="font-display font-bold text-white text-base mb-1.5">{feature.label}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
      </div>

      <div className="mt-auto pt-2 border-t border-white/5 flex items-center justify-between">
        <span className="text-xs text-slate-600">{feature.category}</span>
        <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400 group-hover:translate-x-0.5 transition-all duration-200" />
      </div>
    </motion.div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function VendorFeatures() {
  const [ref, inView] = useInView()
  const [active, setActive] = useState('All')

  const featured = features.filter((f) => f.featured)
  const filtered =
    active === 'All'
      ? features.filter((f) => !f.featured)
      : features.filter((f) => f.category === active && !f.featured)

  const showFeatured = active === 'All'

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-950 via-surface-900/30 to-surface-950 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-[300px] h-[300px] bg-brand-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-semibold text-violet-400 mb-5">
            Vendor Features
          </span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white mb-5">
            Everything a vendor{' '}
            <span className="text-gradient">ever needs</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Eleven powerful modules, one unified dashboard. No juggling between apps.
          </p>
        </motion.div>

        {/* ── Category filter pills ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200
                ${active === cat
                  ? 'bg-white text-slate-900 border-white shadow-lg shadow-white/10'
                  : 'text-slate-400 border-white/10 hover:border-white/20 hover:text-white glass'
                }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* ── Featured row (All only) ── */}
        <AnimatePresence>
          {showFeatured && (
            <motion.div
              key="featured-row"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35 }}
              className="overflow-hidden"
            >
              {/* Section label */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-semibold text-slate-600 uppercase tracking-widest">
                  Highlights
                </span>
                <div className="flex-1 h-px bg-white/5" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {featured.map((f, i) => (
                  <FeaturedCard key={f.label} feature={f} index={i} inView={inView} />
                ))}
              </div>

              {/* Divider before rest */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-semibold text-slate-600 uppercase tracking-widest">
                  All modules
                </span>
                <div className="flex-1 h-px bg-white/5" />
                <span className="text-xs text-slate-600">{features.length} total</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Main grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3"
          >
            {filtered.map((feature, i) => (
              <FeatureCard key={feature.label} feature={feature} index={i} inView={inView} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Bottom CTA strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 glass rounded-2xl border border-white/8 px-8 py-6
                     flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div>
            <p className="text-white font-display font-semibold text-lg mb-0.5">
              Ready to see it live?
            </p>
            <p className="text-slate-500 text-sm">
              Start free — upgrade when you need more.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href="#how-it-works"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-300
                         border border-white/10 hover:border-white/20 hover:text-white
                         glass transition-all duration-200"
            >
              See how it works
            </a>
            <a
              href="https://app.yourdomain.com/register"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white
                         bg-gradient-to-r from-brand-600 to-violet-600
                         hover:from-brand-500 hover:to-violet-500
                         shadow-lg shadow-brand-500/20 hover:-translate-y-0.5
                         transition-all duration-200 flex items-center gap-1.5"
            >
              Get started free
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  )
}