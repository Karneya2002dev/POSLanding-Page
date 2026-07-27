import { motion } from 'framer-motion'
import { useInView } from '../../hooks/useInView'
import { Zap, Search, Printer, Wallet, Calendar, Users } from 'lucide-react'

// ─── Data ─────────────────────────────────────────────────────────────────────

const hero = {
  icon: Zap,
  label: 'Fast billing',
  desc: 'Create a complete GST bill in under 30 seconds. Optimised for high-volume counters during peak hours — every tap counts.',
  color: 'from-amber-500 to-orange-600',
  dot: '#f59e0b',
}

const primary = [
  {
    icon: Search,
    label: 'Product search',
    desc: 'Search 1000+ products by name, SKU, or category in milliseconds — without leaving the billing screen.',
    color: 'from-cyan-500 to-blue-600',
    dot: '#06b6d4',
  },
  {
    icon: Wallet,
    label: 'Payment collection',
    desc: 'Accept cash, UPI, card, and split payments. Change calculation is automatic.',
    color: 'from-rose-500 to-pink-600',
    dot: '#f43f5e',
  },
]

const secondary = [
  {
    icon: Printer,
    label: 'Print receipt',
    desc: 'Thermal print on any 80 mm or 58 mm printer via USB, Bluetooth, or network.',
    color: 'from-violet-500 to-purple-600',
    dot: '#8b5cf6',
  },
  {
    icon: Calendar,
    label: 'Daily sales',
    desc: 'End-of-day summary: total bills, revenue, and top-selling products.',
    color: 'from-teal-500 to-green-600',
    dot: '#14b8a6',
  },
  {
    icon: Users,
    label: 'Customer billing',
    desc: 'Link bills to customer profiles for purchase history and personalised receipts.',
    color: 'from-fuchsia-500 to-pink-600',
    dot: '#ec4899',
  },
]

// ─── Shared card primitives ───────────────────────────────────────────────────

function IconBadge({ icon: Icon, color, size = 'md' }) {
  const sz = size === 'lg'
    ? 'w-16 h-16 rounded-2xl'
    : size === 'md'
    ? 'w-12 h-12 rounded-xl'
    : 'w-10 h-10 rounded-xl'
  const iconSz = size === 'lg' ? 'w-8 h-8' : size === 'md' ? 'w-6 h-6' : 'w-5 h-5'
  return (
    <div className={`${sz} bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
      <Icon className={`${iconSz} text-white`} />
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function CashierFeatures() {
  const [ref, inView] = useInView()

  const fade = (delay = 0) => ({
    initial: { opacity: 0, y: 22 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.45, delay },
  })

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-brand-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div ref={ref} className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <motion.div
          {...fade(0)}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-semibold text-emerald-400 mb-5">
            Cashier Features
          </span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white mb-5">
            Built for speed at the{' '}
            <span className="text-gradient">billing counter</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Distraction-free, mobile-ready, and blazing fast. Your cashiers will never slow down a queue again.
          </p>
        </motion.div>

        {/* ── Bento grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

          {/* Hero card — spans 5 cols, full height */}
          <motion.div
            {...fade(0.1)}
            className="lg:col-span-5 group relative glass rounded-3xl p-8 border border-white/8
                       hover:border-white/14 transition-all duration-300 hover:-translate-y-0.5
                       flex flex-col justify-between overflow-hidden min-h-[280px]"
          >
            {/* Corner tint */}
            <div
              className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full opacity-10 pointer-events-none"
              style={{ background: hero.dot }}
            />

            <div>
              <div className="flex items-center justify-between mb-8">
                <IconBadge icon={hero.icon} color={hero.color} size="lg" />
                <span
                  className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border"
                  style={{
                    color: hero.dot,
                    borderColor: `${hero.dot}40`,
                    background: `${hero.dot}15`,
                  }}
                >
                  core
                </span>
              </div>
              <h3 className="font-display font-extrabold text-white text-2xl mb-3">
                {hero.label}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">{hero.desc}</p>
            </div>

            <div className="mt-8 pt-5 border-t border-white/6 grid grid-cols-3 gap-4">
              {[['< 30s', 'per bill'], ['100%', 'GST ready'], ['∞', 'products']].map(([val, lbl]) => (
                <div key={lbl}>
                  <div className="text-white font-display font-bold text-lg">{val}</div>
                  <div className="text-slate-600 text-xs mt-0.5">{lbl}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right column — stacks two primary cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {primary.map((feat, i) => (
              <motion.div
                key={feat.label}
                {...fade(0.18 + i * 0.08)}
                className="group relative glass rounded-3xl p-6 border border-white/6
                           hover:border-white/12 transition-all duration-300 hover:-translate-y-0.5
                           flex flex-col gap-5 overflow-hidden"
              >
                <div
                  className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-8 pointer-events-none"
                  style={{ background: feat.dot }}
                />
                <IconBadge icon={feat.icon} color={feat.color} size="md" />
                <div>
                  <h3 className="font-display font-bold text-white text-base mb-2">{feat.label}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{feat.desc}</p>
                </div>
              </motion.div>
            ))}

            {/* Third secondary card fills the remaining space */}
            <motion.div
              key={secondary[0].label}
              {...fade(0.34)}
              className="group relative glass rounded-3xl p-6 border border-white/6
                         hover:border-white/12 transition-all duration-300 hover:-translate-y-0.5
                         sm:col-span-2 flex flex-row items-center gap-6 overflow-hidden"
            >
              <div
                className="absolute -top-8 -right-8 w-28 h-28 rounded-full opacity-8 pointer-events-none"
                style={{ background: secondary[0].dot }}
              />
              <IconBadge icon={secondary[0].icon} color={secondary[0].color} size="md" />
              <div>
                <h3 className="font-display font-bold text-white text-base mb-1">{secondary[0].label}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{secondary[0].desc}</p>
              </div>
            </motion.div>
          </div>

          {/* Bottom strip — remaining secondary cards side by side */}
          {secondary.slice(1).map((feat, i) => (
            <motion.div
              key={feat.label}
              {...fade(0.42 + i * 0.08)}
              className="lg:col-span-6 group relative glass rounded-3xl p-6 border border-white/6
                         hover:border-white/12 transition-all duration-300 hover:-translate-y-0.5
                         flex flex-row items-start gap-5 overflow-hidden"
            >
              <div
                className="absolute -bottom-8 -right-8 w-28 h-28 rounded-full opacity-8 pointer-events-none"
                style={{ background: feat.dot }}
              />
              <IconBadge icon={feat.icon} color={feat.color} size="sm" />
              <div>
                <h3 className="font-display font-bold text-white text-sm mb-1.5">{feat.label}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{feat.desc}</p>
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  )
}