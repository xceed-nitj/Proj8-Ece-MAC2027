import PropTypes from "prop-types";
import { motion } from "framer-motion";

// Default text, used for any field the backend leaves empty.
const MAINTENANCE_DEFAULTS = {
  name: "MAC",
  subtitle: "International Conference",
  message:
    "We are currently performing scheduled maintenance to bring you an improved experience. Please check back soon. Thank you for your patience.",
};

// Full-screen "under maintenance" page, styled to match the XCEED footer theme
// (deep navy background, blue glow line, dot grid, soft glow blobs).
export default function Maintenance({ content = {} }) {
  const pick = (key) =>
    typeof content[key] === "string" && content[key].trim()
      ? content[key].trim()
      : MAINTENANCE_DEFAULTS[key];
  const name = pick("name");
  const subtitle = pick("subtitle");
  const message = pick("message");

  return (
    <div
      className="relative min-h-screen overflow-hidden flex flex-col"
      style={{ background: "#0a0f1e" }}
    >
      {/* Top blue glow line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, #2563eb 30%, #60a5fa 50%, #2563eb 70%, transparent)",
        }}
      />

      {/* Faint dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(circle, #3b82f6 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Glow blobs */}
      <motion.div
        className="absolute -top-40 -left-40 w-[28rem] h-[28rem] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-40 -right-40 w-[26rem] h-[26rem] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(96,165,250,0.12) 0%, transparent 70%)",
        }}
        animate={{ scale: [1.1, 1, 1.1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 py-16">
        <motion.div
          className="w-full max-w-2xl text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Brand */}
          <div className="flex items-center justify-center gap-3 mb-10">
            <img
              src="/nitjlogo.png"
              alt="NITJ Logo"
              className="h-12 w-auto object-contain"
            />
            <div className="text-left">
              <p
                className="text-xl font-bold font-poppins tracking-widest"
                style={{
                  background: "linear-gradient(90deg, #93c5fd, #60a5fa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {name}
              </p>
              <p className="text-[11px] text-slate-500 tracking-wide">{subtitle}</p>
            </div>
          </div>

          {/* Animated gear icon */}
          <div className="relative mx-auto mb-8 w-24 h-24">
            <div className="absolute inset-0 rounded-2xl bg-blue-900/30 border border-blue-800/40" />
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="absolute inset-0 m-auto h-12 w-12 text-blue-400"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.6}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.6}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </motion.svg>
          </div>

          {/* Status chip */}
          <span className="inline-flex items-center gap-2 text-xs text-blue-300 bg-blue-900/30 border border-blue-800/40 rounded-lg px-3 py-1.5 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400" />
            </span>
            Scheduled Maintenance
          </span>

          <h1 className="font-poppins text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
            We&apos;ll be back{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #93c5fd, #60a5fa, #2563eb)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              shortly
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-lg mx-auto mb-10 whitespace-pre-line">
            {message}
          </p>

          {/* Progress bar */}
          <div className="mx-auto max-w-xs h-1 rounded-full bg-slate-800 overflow-hidden">
            <motion.div
              className="h-full w-1/3 rounded-full"
              style={{ background: "linear-gradient(90deg, #2563eb, #60a5fa)" }}
              animate={{ x: ["-100%", "300%"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </main>

      {/* Bottom bar */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div
          className="pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-center"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <p className="text-xs text-slate-600">© {name} · All rights reserved.</p>
          <p className="text-xs text-slate-600">
            Developed &amp; maintained by{" "}
            <span className="text-blue-400">XCEED NITJ</span>
          </p>
        </div>
      </div>
    </div>
  );
}

Maintenance.propTypes = {
  content: PropTypes.shape({
    name: PropTypes.string,
    subtitle: PropTypes.string,
    message: PropTypes.string,
  }),
};
