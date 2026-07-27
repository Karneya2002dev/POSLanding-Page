import { motion } from 'framer-motion'
import { useInView } from '../../hooks/useInView'
import { ShoppingBag, Coffee, Pill, Cpu, Shirt, ShoppingCart, Cake, Store } from 'lucide-react'

const businesses = [
  { icon: ShoppingCart, label: 'Grocery', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { icon: Coffee, label: 'Restaurant', color: 'text-orange-400', bg: 'bg-orange-500/10' },
  { icon: Pill, label: 'Pharmacy', color: 'text-rose-400', bg: 'bg-rose-500/10' },
  { icon: Cpu, label: 'Electronics', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { icon: Shirt, label: 'Fashion', color: 'text-violet-400', bg: 'bg-violet-500/10' },
  { icon: ShoppingBag, label: 'Supermarket', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  { icon: Cake, label: 'Bakery', color: 'text-amber-400', bg: 'bg-amber-500/10' },
  { icon: Store, label: 'Retail Store', color: 'text-pink-400', bg: 'bg-pink-500/10' },
]

export default function TrustedBy() {
  const [ref, inView] = useInView()

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-surface-950 via-surface-900/50 to-surface-950" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-slate-500 mb-3">Trusted By</p>
          <h2 className="font-display font-bold text-3xl text-white">
            Trusted by Growing Businesses
          </h2>
          <p className="text-slate-400 mt-3">From small shops to enterprise chains — SmartPOS powers every kind of retail.</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {businesses.map((biz, i) => (
            <motion.div
              key={biz.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="glass rounded-2xl p-5 flex flex-col items-center gap-3 card-hover cursor-default group"
            >
              <div className={`w-12 h-12 rounded-xl ${biz.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <biz.icon className={`w-6 h-6 ${biz.color}`} />
              </div>
              <span className="text-xs font-medium text-slate-400 group-hover:text-white transition-colors text-center">{biz.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Divider gradient */}
        <div className="mt-16 h-px bg-gradient-to-r from-transparent via-brand-500/30 to-transparent" />
      </div>
    </section>
  )
}
