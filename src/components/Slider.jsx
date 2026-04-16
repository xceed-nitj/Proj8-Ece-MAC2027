import { useEffect, useState, useRef } from "react";
import axios from "axios";
import getEnvironment from "../getenvironment";
import { motion, AnimatePresence } from "framer-motion";

// ─── Static Data ────────────────────────────────────────────────────────────

const heroImages = [
  "/heroImages/hero1.png",
  "/heroImages/hero2.png",
  "/heroImages/hero3.png",
  "/heroImages/hero4.png",

];

// ─── Animation variants ──────────────────────────────────────────────────────

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.35 } },
};

const item = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Component ───────────────────────────────────────────────────────────────

const Slider = (props) => {
  const confid = props.confid;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [apiUrl, setApiUrl] = useState(null);
  const [newsData, setNewsData] = useState([]);
  const scrollRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Auto-rotate images
  useEffect(() => {
    const id = setInterval(
      () => setCurrentImageIndex((p) => (p === heroImages.length - 1 ? 0 : p + 1)),
      5000
    );
    return () => clearInterval(id);
  }, []);

  // API URL
  useEffect(() => {
    getEnvironment().then((url) => setApiUrl(url));
  }, []);

  // Fetch news
  useEffect(() => {
    if (!confid || !apiUrl) return;
    axios
      .get(`${apiUrl}/conferencemodule/announcements/conf/${confid}`, {
        withCredentials: true,
      })
      .then((res) =>
        setNewsData(res.data.sort((a, b) => a.sequence - b.sequence))
      )
      .catch(() => setNewsData([]));
  }, [apiUrl, confid]);

  // Auto-scroll news ticker
  useEffect(() => {
    if (!newsData.length) return;
    const el = scrollRef.current;
    let raf;
    const tick = () => {
      if (el) {
        el.scrollLeft += 0.6;
        if (el.scrollLeft + el.offsetWidth >= el.scrollWidth) el.scrollLeft = 0;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [newsData]);

  // Preload images
  useEffect(() => {
    Promise.all(
      heroImages.map(
        (src) =>
          new Promise((res, rej) => {
            const img = new Image();
            img.src = src;
            img.onload = res;
            img.onerror = rej;
          })
      )
    )
      .then(() => setImagesLoaded(true))
      .catch(console.error);
  }, []);

  const next = () =>
    setCurrentImageIndex((p) => (p === heroImages.length - 1 ? 0 : p + 1));
  const prev = () =>
    setCurrentImageIndex((p) => (p === 0 ? heroImages.length - 1 : p - 1));

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="w-full">
      {/* ════════════════════════════════════════════
          HERO SECTION
      ════════════════════════════════════════════ */}
      <section
        className="relative w-full overflow-hidden"
        style={{ height: "100svh", minHeight: "620px" }}
      >
        {/* ── Background Image Carousel ── */}
        <div className="absolute inset-0 z-0">
          {!imagesLoaded && <div className="absolute inset-0 bg-blue-950" />}
          {imagesLoaded && (
            <AnimatePresence>
              <motion.img
                key={currentImageIndex}
                src={heroImages[currentImageIndex]}
                alt={`Conference image ${currentImageIndex + 1}`}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.3, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
          )}
        </div>

        {/* ── Blue Cinematic Gradient Overlay ── */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "linear-gradient(108deg, rgba(10,18,50,0.97) 0%, rgba(20,40,100,0.91) 28%, rgba(29,78,216,0.68) 55%, rgba(37,99,235,0.22) 78%, rgba(0,0,0,0.08) 100%)",
          }}
        />

        {/* ── Dot Grid Pattern ── */}
        <div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />

        {/* ── Decorative Rotating Rings (desktop only) ── */}
        <div className="absolute right-[6%] top-1/2 -translate-y-1/2 z-[2] hidden lg:block pointer-events-none select-none">
          <motion.div
            className="w-[340px] h-[340px] rounded-full"
            style={{ border: "1px solid rgba(96,165,250,0.12)" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 44, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-[48px] rounded-full"
            style={{ border: "1px solid rgba(147,197,253,0.18)" }}
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-[96px] rounded-full"
            style={{ border: "2px solid rgba(59,130,246,0.22)" }}
            animate={{ rotate: 360, scale: [1, 1.04, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          {/* Centre pulse */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-5 h-5 rounded-full bg-blue-400/35"
              animate={{ scale: [1, 1.7, 1], opacity: [0.35, 0.7, 0.35] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Floating tech labels */}
          {["AI", "ECE", "IoT", "VLSI"].map((label, i) => {
            const angles = [30, 120, 210, 300];
            const r = 150;
            const rad = ((angles[i] - 90) * Math.PI) / 180;
            const x = r * Math.cos(rad);
            const y = r * Math.sin(rad);
            return (
              <motion.div
                key={label}
                className="absolute text-[10px] font-mono text-blue-300/50 select-none"
                style={{
                  left: `calc(50% + ${x}px - 14px)`,
                  top: `calc(50% + ${y}px - 9px)`,
                }}
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{
                  duration: 3,
                  delay: i * 0.7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {label}
              </motion.div>
            );
          })}
        </div>

        {/* ── NITJ Logo ── */}
       <motion.div
  className="absolute w-full top-10 -translate-x-1/2 
             z-[15] flex items-center justify-center gap-6"
  initial={{ opacity: 0, y: -18 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
>
 <div className="w-full items-center flex justify-center gap-4 sm:gap-6">
  <img
    src="/logo.png"
    className="h-10 sm:h-14 object-contain"
  />
  <img
    src="/MNIT_logo.png"
    className="h-10 sm:h-14 object-contain"
  />
</div>
</motion.div>



        {/* ── Slide Counter (top-right) ── */}
        <motion.div
          className="absolute top-6 right-6 z-[15] hidden sm:flex items-center gap-2.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <span className="text-white/45 text-xs font-mono tabular-nums tracking-widest">
            {String(currentImageIndex + 1).padStart(2, "0")} /{" "}
            {String(heroImages.length).padStart(2, "0")}
          </span>
          <div
            className="w-16 h-px rounded-full overflow-hidden"
            style={{ background: "rgba(255,255,255,0.15)" }}
          >
            <motion.div
              className="h-full bg-blue-400 rounded-full"
              animate={{
                width: `${((currentImageIndex + 1) / heroImages.length) * 100}%`,
              }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            />
          </div>
        </motion.div>

        {/* ══════════════════════════════════
            MAIN CONTENT
        ══════════════════════════════════ */}
        <div className="relative z-[10] h-full flex items-center">
          <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-14">
            <motion.div
              className="max-w-[640px]"
              variants={container}
              initial="hidden"
              animate="visible"
            >
              {/* Badge */}
              <motion.div variants={item} className="mb-5 sm:mb-7">
                <span
                  className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase rounded-full px-4 py-1.5"
                  style={{
                    background: "rgba(59,130,246,0.16)",
                    border: "1px solid rgba(147,197,253,0.32)",
                    color: "#93c5fd",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                  4th International Conference on
                </span>
              </motion.div>

              {/* Main title */}
              <motion.h1
                variants={item}
                className="font-poppins font-bold text-white leading-[1.08] mb-3 sm:mb-4"
                style={{ fontSize: "clamp(2.1rem, 5.5vw, 3.9rem)" }}
              >
                Microwave ,
                <br />
                <span
                  style={{
                    background:
                      "linear-gradient(90deg, #60a5fa 0%, #93c5fd 60%, #bfdbfe 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Antenna  and Communication
                </span>
              </motion.h1>

              {/* Divider + label */}
              <motion.div
                variants={item}
                className="flex items-center gap-3 mb-6 sm:mb-9"
              >
                <div className="h-px w-10 bg-blue-400 rounded-full" />
                <span
                  className="font-poppins text-sm sm:text-[15px] font-semibold tracking-[0.3em] uppercase"
                  style={{ color: "#93c5fd" }}
                >
                  MAC 2027
                </span>
                <div
                  className="h-px w-10 rounded-full"
                  style={{ background: "rgba(147,197,253,0.2)" }}
                />
              </motion.div>

              {/* Info chips */}
              <motion.div
                variants={item}
                className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-10"
              >
                {/* Date */}
                <div
                  className="flex items-center gap-2 rounded-xl px-3 sm:px-4 py-2 text-white text-xs sm:text-sm font-medium backdrop-blur-md"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.11)",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5 text-blue-300 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  April 16–18, 2027
                </div>

                {/* Location */}
                <div
                  className="flex items-center gap-2 rounded-xl px-3 sm:px-4 py-2 text-white text-xs sm:text-sm font-medium backdrop-blur-md"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.11)",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5 text-blue-300 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  NIT Jalandhar, Punjab, India
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                variants={item}
                className="flex flex-wrap gap-3"
              >
                {/* Primary */}
                <a
                  href="/69cc7ebb993a5edc16baf397"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-blue-600 px-6 sm:px-7 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-blue-500 hover:shadow-blue-600/40 hover:-translate-y-0.5 active:translate-y-0"
                  style={{ boxShadow: "0 4px 24px rgba(37,99,235,0.35)" }}
                >
                  Register Now
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>

                {/* Secondary */}
                <a
                  href="/69cc7eb5993a5edc16baf30e"
                  className="inline-flex items-center gap-2 rounded-xl px-6 sm:px-7 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:-translate-y-0.5"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.22)",
                  }}
                >
                  Submit Paper
                </a>

                {/* Tertiary */}
                <a
                  href="/69cc7eaf993a5edc16baf2ca"
                  className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-blue-200 backdrop-blur-sm transition-all duration-300 hover:text-white hover:-translate-y-0.5"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  Contact Us
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* ── Slide Dots (bottom center) ── */}
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-[10] flex items-center gap-2">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentImageIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === currentImageIndex
                  ? "w-7 h-2 bg-blue-400"
                  : "w-2 h-2 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        {/* ── Arrow Controls (bottom-right) ── */}
        <div className="absolute bottom-5 right-5 z-[10] flex gap-2">
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-white/20"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.18)",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-white/20"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.18)",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* ── Animated Scroll Indicator ── */}
        <motion.div
          className="absolute bottom-7 right-[72px] z-[10] hidden sm:flex flex-col items-center gap-1"
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            className="w-px h-8 rounded-full"
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(255,255,255,0.32))",
            }}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            style={{ color: "rgba(255,255,255,0.32)" }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════
          NEWS TICKER
      ════════════════════════════════════════════ */}
      {newsData.length > 0 && (
        <div className="w-full overflow-hidden" style={{ background: "#0f172a" }}>
          <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center gap-3">
            <span className="flex-shrink-0 bg-blue-600 text-white text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
              Latest
            </span>
            <div
              ref={scrollRef}
              id="news"
              className="flex gap-10 overflow-x-hidden whitespace-nowrap"
            >
              {[...newsData, ...newsData].map((n, i) => (
                <span
                  key={i}
                  className="text-xs sm:text-sm inline-flex items-center gap-2 flex-shrink-0"
                  style={{ color: "rgba(147,197,253,0.8)" }}
                >
                  <span className="w-1 h-1 rounded-full bg-blue-400 inline-block flex-shrink-0" />
                  {n.title || n.text || n.description || ""}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════
          ORGANIZED BY BAR
      ════════════════════════════════════════════ */}
      <div className="w-full bg-white border-b border-blue-100 py-4 sm:py-5 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-gray-400 text-[11px] sm:text-xs font-medium tracking-[0.18em] uppercase text-center sm:text-left">
            Organized by Dept. of Electronics &amp; Communication Engineering,
            NIT Jalandhar
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <a
              href="/69cc7eb5993a5edc16baf30e"
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-md hover:shadow-blue-200 hover:-translate-y-0.5"
            >
              Call for Papers
            </a>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
