import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../../hooks/useInView'
import { Check, Zap, Star, Building2, Shield } from 'lucide-react'

const plans = [
  {
    name: 'Free',
    icon: Zap,
    monthlyPrice: 0,
    yearlyPrice: 0,
    color: 'from-slate-500 to-slate-600',
    description: 'Perfect to explore SmartPOS with zero risk.',
    features: [
      '10 Bills total',
      '25 Products',
      '1 Cashier',
      'Basic Dashboard',
      'GST Billing',
      'PDF Invoice',
    ],
    cta: 'Get Started Free',
    popular: false,
  },
  {
    name: 'Basic',
    icon: Shield,
    monthlyPrice: 199,
    yearlyPrice: 149,
    color: 'from-cyan-500 to-blue-600',
    description: 'For small shops ready to go fully digital.',
    features: [
      '50 Bills/day',
      '500 Products',
      '2 Cashiers',
      'GST Billing',
      'Inventory Management',
      'PDF Invoice',
      'Email Receipts',
      'Sales Reports',
    ],
    cta: 'Start Basic',
    popular: false,
  },
  {
    name: 'Pro',
    icon: Star,
    monthlyPrice: 499,
    yearlyPrice: 379,
    color: 'from-brand-500 to-violet-600',
    description: 'For growing businesses with serious volume.',
    features: [
      'Unlimited Bills',
      'Unlimited Products',
      '10 Cashiers',
      'WhatsApp Receipts',
      'Supplier Management',
      'Expense Tracking',
      'Purchase Orders',
      'Advanced Analytics',
      'Priority Email Support',
    ],
    cta: 'Start Pro',
    popular: true,
  },
  {
    name: 'Business',
    icon: Building2,
    monthlyPrice: 999,
    yearlyPrice: 749,
    color: 'from-amber-500 to-orange-600',
    description: 'Enterprise-grade for chains and large retailers.',
    features: [
      'Unlimited Everything',
      'Multi-Store Support',
      'AI-Powered Reports',
      'Unlimited Cashiers',
      'Dedicated Account Manager',
      'Priority Phone Support',
      'Custom Integrations',
      'SLA Guarantee',
      'API Access',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
]

export default function Pricing() {
  const [ref, inView] = useInView()
  const [yearly, setYearly] = useState(false)

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-surface-950 via-surface-900/30 to-surface-950 pointer-events-none" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-semibold text-amber-400 mb-5">
            Simple Pricing
          </span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white mb-5">
            Plans that <span className="text-gradient">grow with you</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto mb-10">
            Start free, upgrade when you're ready. No lock-ins, no surprises.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-4 glass rounded-2xl px-6 py-3">
            <span className={`text-sm font-medium ${!yearly ? 'text-white' : 'text-slate-400'}`}>Monthly</span>
            <button
              onClick={() => setYearly(!yearly)}
              className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${yearly ? 'bg-brand-500' : 'bg-white/20'}`}
            >
              <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-md transition-transform duration-200 ${yearly ? 'translate-x-6' : ''}`} />
            </button>
            <span className={`text-sm font-medium ${yearly ? 'text-white' : 'text-slate-400'}`}>
              Yearly
              <span className="ml-2 text-xs px-2 py-0.5 bg-accent-500/20 text-accent-400 rounded-full">Save 25%</span>
            </span>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`relative flex flex-col rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
                plan.popular
                  ? 'bg-gradient-to-b from-brand-900/60 to-surface-900 border-2 border-brand-500/60 shadow-2xl shadow-brand-500/20'
                  : 'glass border border-white/8 hover:border-white/15'
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 text-center py-2 bg-gradient-to-r from-brand-600 to-violet-600 text-white text-xs font-bold tracking-wide">
                  MOST POPULAR
                </div>
              )}

              <div className={`p-7 ${plan.popular ? 'pt-12' : ''} flex-1 flex flex-col`}>
                {/* Plan header */}
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-5 shadow-lg`}>
                  <plan.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display font-bold text-xl text-white mb-1">{plan.name}</h3>
                <p className="text-slate-400 text-sm mb-6">{plan.description}</p>

                {/* Price */}
                <div className="mb-7">
                  {plan.monthlyPrice === 0 ? (
                    <div className="font-display font-extrabold text-4xl text-white">Free</div>
                  ) : (
                    <div className="flex items-end gap-1">
                      <span className="text-slate-400 text-lg font-medium">₹</span>
                      <span className="font-display font-extrabold text-4xl text-white">
                        {yearly ? plan.yearlyPrice : plan.monthlyPrice}
                      </span>
                      <span className="text-slate-400 text-sm mb-1">/mo</span>
                    </div>
                  )}
                  {yearly && plan.monthlyPrice > 0 && (
                    <p className="text-accent-400 text-xs mt-1">Billed ₹{plan.yearlyPrice * 12}/year</p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-2.5 flex-1 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${plan.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <Check className="w-2.5 h-2.5 text-white" />
                      </div>
                      <span className="text-sm text-slate-300">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="https://app.yourdomain.com/register"
                  className={`block text-center py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-brand-600 to-violet-600 hover:from-brand-500 hover:to-violet-500 text-white shadow-lg shadow-brand-500/30 hover:shadow-brand-500/50 hover:-translate-y-0.5'
                      : 'glass hover:bg-white/10 text-white border border-white/10 hover:border-white/20'
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center text-slate-500 text-sm mt-10"
        >
          All plans include GST billing, cloud backup, and 24/7 uptime monitoring. Prices exclusive of GST.
        </motion.p>
      </div>
    </section>
  )
}
