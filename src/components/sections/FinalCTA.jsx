import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useInView } from "../../hooks/useInView";
import googlePlayBadge from "../../../assests/google-play-svgrepo-com.svg"; // Change to "assests" only if that's your actual folder name

const perks = [
  "Free Trial Available",
  "Setup in 5 Minutes",
  "Cloud-Based POS",
  "Upgrade Anytime",
];

const stats = [
  { value: "10K+", label: "Businesses" },
  { value: "99.9%", label: "Uptime" },
  { value: "4.8★", label: "Play Store" },
];

export default function FinalCTA() {
  const [ref, inView] = useInView();

  return (
    <section className="relative overflow-hidden py-28 bg-slate-950">
      {/* Animated Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.07)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-600/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Floating Stats */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-6 py-4"
          >
            <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
            <p className="text-sm text-slate-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div
        ref={ref}
        className="relative z-10 max-w-3xl mx-auto px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {/* Badge */}
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm font-medium text-indigo-300 mb-8">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            Trusted by Growing Businesses
          </span>

          {/* Heading */}
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
            Transform
            <br />
            <span className="bg-gradient-to-r from-indigo-400 to-sky-400 bg-clip-text text-transparent">
              Your Business
            </span>
          </h2>

          {/* Description */}
          <p className="max-w-2xl mx-auto text-lg text-slate-400 mb-10">
            Billing, inventory, GST invoicing, cashier management, customer
            records, and reports—all in one powerful cloud-based POS platform.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-10">
            <button className="rounded-2xl bg-indigo-600 px-8 py-4 font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all duration-300 hover:bg-indigo-500 hover:-translate-y-1">
              Request Demo
            </button>

            <a
              href="https://play.google.com/store/apps/details?id=com.yourapp"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform duration-300 hover:-translate-y-1"
            >
              <img
                src={googlePlayBadge}
                alt="Get it on Google Play"
                className="h-14 w-auto"
              />
            </a>
          </div>

          {/* Perks */}
          <div className="flex flex-wrap justify-center gap-4">
            {perks.map((perk) => (
              <div
                key={perk}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md"
              >
                <Check className="h-4 w-4 text-green-400" />
                <span className="text-sm text-slate-300">{perk}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}