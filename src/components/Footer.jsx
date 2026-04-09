import { useState } from "react";
import { motion } from "framer-motion";
import FlagCounter from "./FlagCounter";

// const quickLinks = [
//   { name: "Home", href: "/" },
//   { name: "Tracks", href: "/6885973a959ec9c788f10545" },
//   { name: "Organising Heads", href: "/688594be959ec9c788f1011b" },
//   { name: "Registration", href: "/68859b12959ec9c788f10d16" },
//   { name: "Location", href: "/6885b8ff959ec9c788f17673" },
//   { name: "Accommodation", href: "/6885b92d959ec9c788f17730" },
//   { name: "Keynote Speakers", href: "/68859782959ec9c788f1056d" },
//   { name: "Contact Us", href: "/6885989c959ec9c788f1084b" },
// ];

const contactInfo = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "Email",
    value: "mac2027@nitj.ac.in",
    href: "mailto:mac2027@nitj.ac.in",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: "Phone",
    value: "Dr. Kundan Kumar: 0181-5037855",
    href: "tel:+911815037855",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "Address",
    value: "NIT Jalandhar, Punjab, India — 144011",
    href: null,
  },
];

export default function Footer() {
  const [xceedHovered, setXceedHovered] = useState(false);

  return (
    <footer className="relative overflow-hidden" style={{ background: "#0a0f1e" }}>
      {/* Top blue glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, #2563eb 30%, #60a5fa 50%, #2563eb 70%, transparent)",
        }}
      />

      {/* Faint dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #3b82f6 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Blue glow blobs */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(96,165,250,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-18 pb-8">
        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14 mb-12">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <img src="/nitjlogo.png" alt="NITJ Logo" className="h-10 w-auto object-contain brightness-0 invert opacity-90" />
              <div>
                <p
                  className="text-lg font-bold font-poppins tracking-widest"
                  style={{
                    background: "linear-gradient(90deg, #93c5fd, #60a5fa)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  MAC 2027
                </p>
                <p className="text-[11px] text-slate-500 tracking-wide">International Conference</p>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-sm">
              The 4th International Conference on Electronics, AI and Computing brings
              together leading researchers and industry experts to explore advances in recent technologies.
            </p>

            {/* Event detail chips */}
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs text-blue-300 bg-blue-900/30 border border-blue-800/40 rounded-lg px-3 py-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                April 16–18, 2027
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-blue-300 bg-blue-900/30 border border-blue-800/40 rounded-lg px-3 py-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                NIT Jalandhar
              </span>
            </div>
          </div>

          {/* Quick links */}
          {/* <div>
            <h4 className="text-xs font-bold tracking-[0.18em] uppercase text-slate-500 mb-5">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-slate-400 hover:text-blue-300 transition-colors duration-200"
                  >
                    <span
                      className="w-1 h-1 rounded-full bg-blue-700 group-hover:bg-blue-400 transition-colors duration-200 flex-shrink-0"
                    />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.18em] uppercase text-slate-500 mb-5">
              Contact Us
            </h4>
            <ul className="space-y-4">
              {contactInfo.map((c, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-900/40 border border-blue-800/30 flex items-center justify-center text-blue-400 mt-0.5">
                    {c.icon}
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-600 uppercase tracking-wider mb-0.5">{c.label}</p>
                    {c.href ? (
                      <a href={c.href} className="text-sm text-slate-400 hover:text-blue-300 transition-colors duration-200">
                        {c.value}
                      </a>
                    ) : (
                      <p className="text-sm text-slate-400">{c.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            {/* Register CTA */}
            <a
              href="/68859b12959ec9c788f10d16"
              className="mt-6 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-600/25 hover:-translate-y-0.5"
            >
              Register Now
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
           <div className="mb-8 flex justify-start">
          <FlagCounter />
        </div>
        </div>

        {/* Flag counter */}
       

        {/* ── Bottom bar ── */}
        <div
          className="pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-center"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <p className="text-xs text-slate-600">
            © 2026 MAC 2027 · All rights reserved.
          </p>
          <p className="text-xs text-slate-600">
            Developed &amp; maintained by{" "}
            <a
              href="https://xceed.nitj.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-block text-blue-400 hover:text-blue-300 transition-colors duration-200"
              onMouseEnter={() => setXceedHovered(true)}
              onMouseLeave={() => setXceedHovered(false)}
            >
              XCEED NITJ
              <motion.span
                className="absolute bottom-0 left-0 h-px bg-blue-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: xceedHovered ? "100%" : 0 }}
                transition={{ duration: 0.25 }}
              />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
