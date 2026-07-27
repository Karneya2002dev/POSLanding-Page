import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../../hooks/useInView'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const reviews = [
  {
    name: 'Rajesh Kumar',
    role: 'Owner, Shree Grocery Mart',
    location: 'Chennai',
    rating: 5,
    review: 'SmartPOS transformed how we run our grocery store. The barcode scanner integration is flawless, and the GST reports save us hours every month. Best decision we made for our business.',
    avatar: 'RK',
    color: 'from-brand-500 to-violet-600',
  },
  {
    name: 'Priya Nair',
    role: 'Manager, Café Bliss',
    location: 'Bangalore',
    rating: 5,
    review: "We run 3 cafe outlets and SmartPOS keeps everything in sync. The multi-cashier feature is a lifesaver during rush hours. The dashboard gives me a bird's eye view of all locations.",
    avatar: 'PN',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    name: 'Arun Mehta',
    role: 'Director, MediCare Pharmacy',
    location: 'Mumbai',
    rating: 5,
    review: 'Pharmacy billing with GST was always a pain. SmartPOS handles CGST/SGST automatically. The inventory alerts notify us before stock runs out. Truly a complete solution.',
    avatar: 'AM',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    name: 'Lakshmi Venkat',
    role: 'Owner, StyleHub Fashion',
    location: 'Hyderabad',
    rating: 5,
    review: 'Fashion retail is complex with all the variants and sizes. SmartPOS handles it beautifully. Our cashiers loved how fast the billing screen is. Customer receipts over WhatsApp is a big hit!',
    avatar: 'LV',
    color: 'from-rose-500 to-pink-600',
  },
  {
    name: 'Suresh Babu',
    role: 'CEO, FreshMart Supermarkets',
    location: 'Coimbatore',
    rating: 5,
    review: "We've tried 4 different POS systems before SmartPOS. Nothing comes close in terms of stability and features. The AI reports on the Business plan give us insights we never had before.",
    avatar: 'SB',
    color: 'from-amber-500 to-orange-600',
  },
  {
    name: 'Deepa Krishnan',
    role: 'Owner, Sweet Spot Bakery',
    location: 'Madurai',
    rating: 5,
    review: 'Even as a small bakery, SmartPOS gave us big business tools. The free trial was enough to convince us. Upgrading to Pro was the best ₹499 we ever spent monthly. Highly recommended!',
    avatar: 'DK',
    color: 'from-violet-500 to-purple-600',
  },
]

function StarRating({ rating }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`w-4 h-4 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}`} />
      ))}
    </div>
  )
}

export default function Reviews() {
  const [ref, inView] = useInView()
  const [current, setCurrent] = useState(0)
  const [auto, setAuto] = useState(true)

  useEffect(() => {
    if (!auto) return
    const t = setInterval(() => setCurrent((c) => (c + 1) % reviews.length), 4000)
    return () => clearInterval(t)
  }, [auto])

  const go = (dir) => {
    setAuto(false)
    setCurrent((c) => (c + dir + reviews.length) % reviews.length)
  }

  // Show 3 cards on desktop
  const visible = [
    reviews[(current) % reviews.length],
    reviews[(current + 1) % reviews.length],
    reviews[(current + 2) % reviews.length],
  ]

  return (
    <section id="reviews" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-surface-950 via-surface-900/20 to-surface-950 pointer-events-none" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-semibold text-amber-400 mb-5">
            Customer Reviews
          </span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white mb-5">
            Loved by <span className="text-gradient">10,000+ businesses</span>
          </h2>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <span className="text-white font-bold">4.9</span>
            <span className="text-slate-400">from 2,400+ reviews</span>
          </div>
        </motion.div>

        {/* Cards — 1 on mobile, 3 on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          <AnimatePresence mode="wait">
            {visible.map((review, i) => (
              <motion.div
                key={`${review.name}-${current}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, delay: i * 0.07 }}
                className={`glass rounded-3xl p-7 border border-white/8 card-hover ${i !== 0 ? 'hidden md:block' : ''}`}
              >
                <Quote className="w-8 h-8 text-brand-400/40 mb-5" />
                <p className="text-slate-300 leading-relaxed mb-7 text-sm">"{review.review}"</p>
                <div className="flex items-center gap-3 pt-5 border-t border-white/8">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${review.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                    {review.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">{review.name}</div>
                    <div className="text-slate-400 text-xs">{review.role}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <StarRating rating={review.rating} />
                      <span className="text-slate-500 text-xs">{review.location}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button onClick={() => go(-1)} className="w-10 h-10 rounded-full glass hover:bg-white/10 flex items-center justify-center transition-all text-slate-400 hover:text-white">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex gap-2">
            {reviews.map((_, i) => (
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
      </div>
    </section>
  )
}
