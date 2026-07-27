import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../../hooks/useInView'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    question: 'Is there a free trial available?',
    answer: 'Yes! SmartPOS offers a forever-free plan that includes 10 bills, 1 cashier, 25 products, and GST billing — no credit card required. You can explore the platform at your own pace and upgrade only when you\'re ready to grow.',
  },
  {
    question: 'Can I upgrade or downgrade my plan anytime?',
    answer: 'Absolutely. You can upgrade instantly from within your vendor dashboard. Downgrades take effect at the end of your current billing cycle. There are no lock-in periods and no cancellation fees.',
  },
  {
    question: 'Does SmartPOS support GST billing?',
    answer: 'Yes. SmartPOS has built-in GST support with automatic CGST, SGST, and IGST calculation based on the product HSN code and customer location. You can generate GST-compliant PDF invoices and export monthly GST summary reports.',
  },
  {
    question: 'Can I add multiple cashiers under one account?',
    answer: 'Yes. The Basic plan supports 2 cashiers, Pro supports 10, and Business supports unlimited cashiers. Each cashier gets a separate login with restricted access — they can bill customers but cannot access vendor-level settings or reports.',
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes. You can cancel anytime from your subscription settings. After cancellation, you\'ll retain access to your paid features until the end of your billing period. Your data remains intact and you can re-subscribe whenever you want.',
  },
  {
    question: 'Is my data safe with SmartPOS?',
    answer: 'All data is encrypted at rest and in transit using AES-256 and TLS 1.3. We perform automatic daily backups and maintain 30-day backup history. SmartPOS is hosted on AWS infrastructure with 99.9% SLA uptime guarantee.',
  },
  {
    question: 'Does SmartPOS work on mobile devices?',
    answer: 'Yes. SmartPOS is fully responsive and works on any modern browser on desktop, tablet, or smartphone. The cashier billing screen is especially optimized for tablet use at the counter.',
  },
]

function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="glass rounded-2xl overflow-hidden border border-white/8 hover:border-white/15 transition-colors"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-6 text-left group"
      >
        <span className="font-display font-semibold text-white text-base group-hover:text-brand-300 transition-colors">
          {faq.question}
        </span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 ${open ? 'bg-brand-500 text-white' : 'bg-white/8 text-slate-400 group-hover:bg-white/12 group-hover:text-white'}`}>
          {open ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-slate-400 leading-relaxed border-t border-white/8 pt-4">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const [ref, inView] = useInView()

  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      <div ref={ref} className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-semibold text-brand-400 mb-5">
            Frequently Asked
          </span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white mb-5">
            Got <span className="text-gradient">questions?</span>
          </h2>
          <p className="text-slate-400 text-lg">Everything you need to know before getting started.</p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center text-slate-500 mt-10"
        >
          Still have questions?{' '}
          <a href="#contact" className="text-brand-400 hover:text-brand-300 font-medium transition-colors">
            Contact our support team →
          </a>
        </motion.p>
      </div>
    </section>
  )
}
