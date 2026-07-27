import { useState, useEffect } from 'react'
import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import TrustedBy from './components/sections/TrustedBy'
import HowItWorks from './components/sections/HowItWorks'
import VendorFeatures from './components/sections/VendorFeatures'
import CashierFeatures from './components/sections/CashierFeatures'
import DashboardShowcase from './components/sections/DashboardShowcase'
import FreeTrial from './components/sections/FreeTrial'
import Pricing from './components/sections/Pricing'
import Reviews from './components/sections/Reviews'
import FAQ from './components/sections/FAQ'
import FinalCTA from './components/sections/FinalCTA'
import Footer from './components/layout/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-surface-950 font-body overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <TrustedBy />
        <HowItWorks />
        <VendorFeatures />
        <CashierFeatures />
        <DashboardShowcase />
        <FreeTrial />
        <Pricing />
        <Reviews />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
