import { Zap, Mail, Phone, Twitter, Linkedin, Instagram, Github } from 'lucide-react'

const footerLinks = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Dashboard', href: '#' },
    { label: 'Changelog', href: '#' },
  ],
  Resources: [
    { label: 'Help Center', href: '#' },
    { label: 'Documentation', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'API Reference', href: '#' },
    { label: 'Status', href: '#' },
  ],
  Company: [
    { label: 'About Us', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: '#contact' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ],
}

const socials = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Github, href: '#', label: 'GitHub' },
]

export default function Footer() {
  return (
    <footer id="contact" className="relative border-t border-white/8 bg-surface-950">
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#home" className="flex items-center gap-2.5 mb-5 group w-fit">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-violet-600 flex items-center justify-center shadow-lg shadow-brand-500/30">
                <Zap className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="font-display font-extrabold text-xl text-white tracking-tight">
                Smart<span className="text-gradient">POS</span>
              </span>
            </a>
            <p className="text-slate-400 leading-relaxed mb-7 max-w-sm text-sm">
              Cloud-based Multi-Vendor POS platform for modern Indian businesses. GST billing, inventory, analytics — all in one place.
            </p>

            {/* Contact */}
            <div className="space-y-3">
              <a href="mailto:support@smartpos.in" className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors text-sm">
                <div className="w-8 h-8 rounded-lg glass flex items-center justify-center">
                  <Mail className="w-3.5 h-3.5 text-brand-400" />
                </div>
                support@smartpos.in
              </a>
              <a href="tel:+918888888888" className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors text-sm">
                <div className="w-8 h-8 rounded-lg glass flex items-center justify-center">
                  <Phone className="w-3.5 h-3.5 text-brand-400" />
                </div>
                +91 88888 88888
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="font-display font-semibold text-white text-sm mb-5">{group}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-5">
          <p className="text-slate-500 text-sm">
            © 2024 SmartPOS. All rights reserved. Made with ♥ in India.
          </p>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-9 h-9 rounded-xl glass hover:bg-brand-500/20 hover:border-brand-500/30 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
