import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../../hooks/useInView'
import { ChevronLeft, ChevronRight, BarChart3, Receipt, Package, ShoppingCart, TrendingUp, CreditCard, Users } from 'lucide-react'

const screens = [
  {
    title: 'Vendor Dashboard',
    desc: 'Complete business overview with revenue trends, top products, and real-time alerts.',
    icon: BarChart3,
    color: 'from-brand-500 to-violet-600',
    accent: '#6366f1',
    stats: [
      { label: 'Revenue', value: '₹2.4L' },
      { label: 'Orders', value: '1,284' },
      { label: 'Growth', value: '+18%' },
    ],
  },
  {
    title: 'Billing Screen',
    desc: 'Lightning-fast billing interface for cashiers. Search and cart in one view.',
    icon: Receipt,
    color: 'from-emerald-500 to-teal-600',
    accent: '#10b981',
    stats: [
      { label: 'Bill Time', value: '28s' },
      { label: 'Items', value: '6 avg' },
      { label: 'GST Auto', value: '✓' },
    ],
  },
  {
    title: 'Inventory',
    desc: 'Live stock levels, low-stock alerts, and batch updates across all product variants.',
    icon: Package,
    color: 'from-cyan-500 to-blue-600',
    accent: '#06b6d4',
    stats: [
      { label: 'SKUs', value: '2,481' },
      { label: 'Low Stock', value: '12' },
      { label: 'Value', value: '₹48L' },
    ],
  },
  {
    title: 'Products',
    desc: 'Add products with images, variants, and tax categories in seconds.',
    icon: ShoppingCart,
    color: 'from-violet-500 to-purple-600',
    accent: '#8b5cf6',
    stats: [
      { label: 'Products', value: '1,284' },
      { label: 'Active', value: '1,190' },
      { label: 'Categories', value: '24' },
    ],
  },
  {
    title: 'Reports',
    desc: 'Revenue, profit, GST summaries, and staff performance — export to PDF or Excel.',
    icon: TrendingUp,
    color: 'from-orange-500 to-amber-600',
    accent: '#f59e0b',
    stats: [
      { label: 'Reports', value: '12 types' },
      { label: 'GST Ready', value: '✓' },
      { label: 'Export', value: 'PDF/XLS' },
    ],
  },
  {
    title: 'Subscription',
    desc: 'Upgrade in one click. View plan limits, billing history, and manage auto-renewal.',
    icon: CreditCard,
    color: 'from-rose-500 to-pink-600',
    accent: '#f43f5e',
    stats: [
      { label: 'Plans', value: '4 tiers' },
      { label: 'Billing', value: 'Monthly' },
      { label: 'Cancel', value: 'Anytime' },
    ],
  },
  {
    title: 'Cashier Dashboard',
    desc: "Simplified view for cashiers — no clutter, just billing, today's summary, and sales.",
    icon: Users,
    color: 'from-teal-500 to-green-600',
    accent: '#14b8a6',
    stats: [
      { label: "Today's Sales", value: '₹18,240' },
      { label: 'Bills', value: '84' },
      { label: 'Avg Bill', value: '₹217' },
    ],
  },
]

export default function DashboardShowcase() {
  const [ref, inView] = useInView()
  const [current, setCurrent] = useState(0)
  const [auto, setAuto] = useState(true)

  useEffect(() => {
    if (!auto) return
    const t = setInterval(() => setCurrent((c) => (c + 1) % screens.length), 3500)
    return () => clearInterval(t)
  }, [auto])

  const go = (dir) => {
    setAuto(false)
    setCurrent((c) => (c + dir + screens.length) % screens.length)
  }

  const screen = screens[current]

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-surface-950 via-surface-900/40 to-surface-950 pointer-events-none" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-semibold text-cyan-400 mb-5">
            Platform Showcase
          </span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white mb-5">
            See every screen, <span className="text-gradient">built beautifully</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Every module is designed with clarity and speed in mind. Here's what your team will use every day.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ── Left: info panel ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {/* Tab pills */}
            <div className="flex flex-wrap gap-2 mb-10">
              {screens.map((s, i) => (
                <button
                  key={s.title}
                  onClick={() => { setCurrent(i); setAuto(false) }}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-200 ${
                    i === current
                      ? 'bg-gradient-to-r from-brand-600 to-violet-600 text-white shadow-lg shadow-brand-500/25'
                      : 'glass text-slate-400 hover:text-white'
                  }`}
                >
                  {s.title}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${screen.color} flex items-center justify-center shadow-xl`}>
                    <screen.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-display font-bold text-3xl text-white">{screen.title}</h3>
                </div>
                <p className="text-slate-400 text-lg leading-relaxed mb-8">{screen.desc}</p>

                <div className="flex gap-4">
                  {screen.stats.map((s) => (
                    <div key={s.label} className="glass rounded-2xl px-5 py-4 flex-1 text-center">
                      <div className="font-display font-bold text-xl text-white mb-1">{s.value}</div>
                      <div className="text-xs text-slate-400">{s.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center gap-4 mt-10">
              <button onClick={() => go(-1)} className="w-10 h-10 rounded-full glass hover:bg-white/10 flex items-center justify-center transition-all text-slate-400 hover:text-white">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex gap-2">
                {screens.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setCurrent(i); setAuto(false) }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-8 bg-brand-500' : 'w-1.5 bg-white/20'}`}
                  />
                ))}
              </div>
              <button onClick={() => go(1)} className="w-10 h-10 rounded-full glass hover:bg-white/10 flex items-center justify-center transition-all text-slate-400 hover:text-white">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* ── Right: phone mockup ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex justify-center"
          >
            {/* Ambient glow behind phone */}
            <div
              className="absolute inset-0 -z-10 rounded-[3rem] blur-3xl opacity-25 transition-all duration-700"
              style={{ background: `radial-gradient(circle, ${screen.accent}60, transparent 70%)` }}
            />

            {/* Phone shell */}
            <div
              className="relative w-[270px] rounded-[2.75rem] p-[3px] shadow-2xl shadow-black/60 transition-all duration-700"
              style={{ background: `linear-gradient(145deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.04) 100%)` }}
            >
              {/* Outer bezel */}
              <div className="w-full rounded-[2.65rem] bg-surface-900 border border-white/8 overflow-hidden">

                {/* Status bar */}
                <div className="flex items-center justify-between px-6 pt-3 pb-1">
                  <span className="text-[10px] font-semibold text-white/60">9:41</span>
                  {/* Dynamic island pill */}
                  <div className="w-20 h-4 bg-black rounded-full" />
                  <div className="flex items-center gap-1">
                    <div className="flex gap-0.5 items-end">
                      {[3, 5, 7, 9].map((h, i) => (
                        <div key={i} className="w-0.5 rounded-sm bg-white/60" style={{ height: h }} />
                      ))}
                    </div>
                    <div className="text-[9px] text-white/60 ml-0.5">WiFi</div>
                    <div className="ml-1 w-5 h-2.5 rounded-sm border border-white/40 flex items-center px-0.5">
                      <div className="h-1.5 w-3.5 rounded-sm bg-white/60" />
                    </div>
                  </div>
                </div>

                {/* Screen content */}
                <div className="relative overflow-hidden" style={{ minHeight: 480 }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={current}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -18 }}
                      transition={{ duration: 0.32 }}
                      className="absolute inset-0 px-4 pt-3 pb-5 flex flex-col gap-3"
                    >
                      {/* App header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${screen.color} flex items-center justify-center`}>
                            <screen.icon className="w-3.5 h-3.5 text-white" />
                          </div>
                          <span className="text-xs font-semibold text-white">{screen.title}</span>
                        </div>
                        <div className="w-6 h-6 rounded-full glass flex items-center justify-center">
                          <div className="w-3 h-0.5 bg-white/50 rounded-full" />
                        </div>
                      </div>

                      {/* Greeting */}
                      <div>
                        <p className="text-[9px] text-slate-500">Good morning 👋</p>
                        <p className="text-xs font-semibold text-white">SmartPOS</p>
                      </div>

                      {/* Stat cards row */}
                      <div className="grid grid-cols-3 gap-2">
                        {screen.stats.map((s) => (
                          <div
                            key={s.label}
                            className="rounded-xl p-2.5 text-center"
                            style={{ background: `${screen.accent}18`, border: `0.5px solid ${screen.accent}30` }}
                          >
                            <div className="font-bold text-white text-[11px] leading-tight">{s.value}</div>
                            <div className="text-[8px] mt-0.5" style={{ color: `${screen.accent}cc` }}>{s.label}</div>
                          </div>
                        ))}
                      </div>

                      {/* Chart area */}
                      <div className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.07)' }}>
                        <div className="text-[8px] text-slate-500 mb-2">Performance overview</div>
                        <div className="flex items-end gap-1.5 h-16">
                          {[55, 70, 45, 88, 63, 92, 78, 85].map((h, i) => (
                            <div
                              key={i}
                              className="flex-1 rounded-sm transition-all duration-500"
                              style={{
                                height: `${h}%`,
                                background: i === 7
                                  ? `linear-gradient(to top, ${screen.accent}, ${screen.accent}99)`
                                  : `${screen.accent}22`,
                              }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* List */}
                      <div className="rounded-xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.07)' }}>
                        <div className="text-[8px] text-slate-500 px-3 pt-2.5 pb-1.5">Recent activity</div>
                        {['Item A', 'Item B', 'Item C'].map((item, i) => (
                          <div
                            key={item}
                            className="flex items-center justify-between px-3 py-2"
                            style={{ borderTop: i === 0 ? 'none' : '0.5px solid rgba(255,255,255,0.05)' }}
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className="w-4 h-4 rounded-md"
                                style={{ background: `linear-gradient(135deg, ${screen.accent}90, ${screen.accent}40)` }}
                              />
                              <span className="text-[9px] text-slate-300">{item}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <div className="h-1 w-10 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                                <div
                                  className="h-full rounded-full"
                                  style={{ width: `${70 - i * 15}%`, background: screen.accent }}
                                />
                              </div>
                              <span className="text-[8px] text-slate-500">{70 - i * 15}%</span>
                            </div>
                          </div>
                        ))}
                      </div>

                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Home indicator */}
                <div className="flex justify-center pb-2 pt-1">
                  <div className="w-24 h-1 rounded-full bg-white/20" />
                </div>

              </div>
            </div>

            {/* Side button details (volume / power) */}
            <div className="absolute left-[-4px] top-24 w-[3px] h-8 rounded-l-full bg-white/10" />
            <div className="absolute left-[-4px] top-36 w-[3px] h-8 rounded-l-full bg-white/10" />
            <div className="absolute right-[-4px] top-28 w-[3px] h-12 rounded-r-full bg-white/10" />

          </motion.div>
        </div>
      </div>
    </section>
  )
}