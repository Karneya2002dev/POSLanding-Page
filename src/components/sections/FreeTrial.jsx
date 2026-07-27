import { motion } from 'framer-motion'
import { useInView } from '../../hooks/useInView'
import { Check, ArrowRight, Zap, Sparkles } from 'lucide-react'

const freeFeatures = [
  { label: '10 Bills per account', note: 'to get started' },
  { label: '1 Cashier account', note: 'role-scoped login' },
  { label: '25 Products', note: 'full catalogue tools' },
  { label: 'Basic Dashboard', note: 'live KPIs' },
  { label: 'GST Billing', note: 'CGST / SGST / IGST' },
  { label: 'PDF Invoice', note: 'branded & printable' },
  { label: 'Printable bills', note: 'thermal & A4' },
  { label: 'No credit card required', note: 'free forever' },
]

const plans = [
  { name: 'Basic', price: '₹99', period: '/mo' },
  { name: 'Pro', price: '₹199', period: '/mo' },
  { name: 'Business', price: '₹499', period: '/mo' },
]

export default function FreeTrial() {
  const [ref, inView] = useInView()

  const fade = (delay = 0) => ({
    initial: { opacity: 0, y: 18 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.45, delay },
  })

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-900/30 via-surface-950 to-violet-900/20 pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.04)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-brand-500/6 rounded-full blur-[100px] pointer-events-none" />

      <div ref={ref} className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <motion.div {...fade(0)} className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-500/15 text-accent-400 text-sm font-semibold mb-5">
            <span className="w-2 h-2 bg-accent-400 rounded-full animate-pulse" />
            Free Forever Plan
          </span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white mb-4">
            Start free,{' '}
            <span className="text-gradient">scale when ready</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Full SmartPOS access with no credit card. Upgrade only when your business grows into it.
          </p>
        </motion.div>

        {/* ── Two-column card ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

          {/* Left: Free plan hero — 2 cols */}
          <motion.div
            {...fade(0.1)}
            className="lg:col-span-2 glass rounded-3xl p-8 border border-brand-500/25
                       flex flex-col justify-between relative overflow-hidden"
          >
            {/* Corner glow */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-500/15 rounded-full blur-2xl pointer-events-none" />

            <div className="relative">
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-violet-600 flex items-center justify-center mb-6 shadow-xl shadow-brand-500/30">
                <Zap className="w-7 h-7 text-white fill-white" />
              </div>

              <div className="mb-2">
                <span className="text-xs font-bold text-brand-400 uppercase tracking-widest">Free plan</span>
              </div>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="font-display font-extrabold text-6xl text-white">₹0</span>
                <span className="text-slate-400 text-sm font-medium">/ forever</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                Everything you need to run your first counter and learn the platform — no timer, no trial ending.
              </p>

              {/* Upgrade path hint */}
              <div className="rounded-2xl bg-white/4 border border-white/6 p-4 mb-6">
                <p className="text-xs text-slate-500 mb-3 font-medium">Ready to grow?</p>
                <div className="flex items-center gap-2">
                  {plans.map((p, i) => (
                    <div
                      key={p.name}
                      className="flex-1 rounded-xl px-2 py-2 text-center"
                      style={{
                        background: `rgba(99,102,241,${0.06 + i * 0.04})`,
                        border: '0.5px solid rgba(99,102,241,0.18)',
                      }}
                    >
                      <div className="text-[10px] text-slate-400 font-medium">{p.name}</div>
                      <div className="text-xs font-bold text-white mt-0.5">
                        {p.price}<span className="text-slate-500 font-normal text-[9px]">{p.period}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA */}
            <div>
              <a
                href="https://app.yourdomain.com/register"
                className="group flex items-center justify-center gap-2 w-full px-6 py-4 rounded-2xl
                           bg-gradient-to-r from-brand-600 to-violet-600
                           hover:from-brand-500 hover:to-violet-500
                           text-white font-bold text-base
                           shadow-xl shadow-brand-500/25 hover:shadow-brand-500/40
                           hover:-translate-y-0.5 transition-all duration-200"
              >
                Get started free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <p className="text-slate-600 text-xs text-center mt-3">No setup fees · Cancel anytime</p>
            </div>
          </motion.div>

          {/* Right: Feature list — 3 cols */}
          <motion.div
            {...fade(0.18)}
            className="lg:col-span-3 glass rounded-3xl p-8 border border-white/6 flex flex-col"
          >
            <div className="flex items-center gap-2 mb-7">
              <Sparkles className="w-4 h-4 text-accent-400" />
              <span className="text-sm font-semibold text-white">What's included</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
              {freeFeatures.map((feature, i) => (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.25 + i * 0.055 }}
                  className="flex items-start gap-3 p-4 rounded-2xl bg-white/3
                             border border-white/5 hover:border-white/10
                             hover:bg-white/5 transition-all duration-200 group"
                >
                  <div className="w-5 h-5 rounded-full bg-accent-500/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-accent-500/30 transition-colors">
                    <Check className="w-3 h-3 text-accent-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-200 leading-tight">{feature.label}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{feature.note}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom strip */}
            <div className="mt-6 pt-5 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-slate-500 text-xs text-center sm:text-left">
                Need more? All features above carry over to paid plans.
              </p>
              <a
                href="#pricing"
                className="flex items-center gap-1.5 text-xs font-semibold text-brand-400
                           hover:text-brand-300 transition-colors whitespace-nowrap"
              >
                Compare plans
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}