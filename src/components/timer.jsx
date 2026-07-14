import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import axios from 'axios';
import getEnvironment from '../getenvironment';
import useComponentDesign from '../useComponentDesign';

// Utility to compute time left
const getTimeLeft = (targetDate) => {
  const diff = +targetDate - +new Date();
  return {
    days:   Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24))),
    hours:  Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24)),
    minutes:Math.max(0, Math.floor((diff / 1000 / 60) % 60)),
    seconds:Math.max(0, Math.floor((diff / 1000) % 60)),
  };
};

// ═══════════════════════════════════════════════════════════════════════════
// Design 1 — 3D flip cards with coloured headers (default / original design)
// ═══════════════════════════════════════════════════════════════════════════

// 3D flip animation for each digit
const CountdownDigit = ({ value, label, color, animate }) => {
  const prevValue = useRef(value);
  const controls = useAnimation();

  useEffect(() => {
    if (prevValue.current !== value && animate) {
      controls.start({
        rotateX: [0, -90, 0],
        transition: { duration: 0.6, ease: 'easeInOut' },
      });
    }
    prevValue.current = value;
  }, [value, animate, controls]);

  return (
    <div className="flex flex-col items-center">
      <motion.div
        className="h-8 w-8 xs:h-10 xs:w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16
                   rounded-lg sm:rounded-xl perspective-[1000px] relative shadow-lg"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white to-blue-50
                     rounded-lg sm:rounded-xl border border-blue-100
                     flex items-center justify-center"
          animate={controls}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <span
            className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-xl font-mono font-bold"
            style={{ color }}
          >
            {String(value).padStart(2, '0')}
          </span>
        </motion.div>
      </motion.div>

      <span className="text-[8px] xs:text-[10px] sm:text-xs lg:text-sm
                       uppercase mt-1 sm:mt-2 font-medium tracking-wider text-blue-800">
        {label}
      </span>
    </div>
  );
};

// Card component wrapping three digits + seconds
const CountdownCard = ({ title, time, mainColor, delay, description }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="group w-full"
      initial={{ opacity: 0, y: 50, rotateY: 25 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: delay * 0.2, type: 'spring' }}
    >
      <motion.div
        className="rounded-xl sm:rounded-2xl overflow-hidden transform-gpu h-full"
        whileHover={{ scale: 1.03, rotateY: 5, z: 20 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <div
          className="py-2 sm:py-3 px-3 sm:px-4 md:px-5 text-white relative overflow-hidden"
          style={{ backgroundColor: mainColor }}
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/20"
              style={{
                width: 2 + Math.random() * 4,
                height: 2 + Math.random() * 4,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{ y: [0, -10, 0], opacity: [0, 0.8, 0] }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
          <h3 className="text-sm xs:text-base sm:text-lg font-medium relative">
            {title}
            <motion.span
              className="absolute -bottom-1 left-0 h-0.5 bg-white"
              initial={{ width: '0%' }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ delay: delay * 0.3 + 0.5, duration: 0.8 }}
            />
          </h3>
        </div>

        {/* Body */}
        <div className="bg-white/80 backdrop-blur-md border border-blue-100 p-2 xs:p-3 sm:p-4 md:p-6">
          <p className="text-[8px] xs:text-[10px] sm:text-xs md:text-sm text-gray-600
                        mb-2 sm:mb-3 md:mb-4 min-h-[24px] xs:min-h-[28px]
                        sm:min-h-[32px] md:min-h-[40px]">
            {description}
          </p>

          {/* Digits */}
          <div className="flex justify-center gap-1 xs:gap-1.5 sm:gap-2 md:gap-3">
            <CountdownDigit value={time.days}    label="days"    color={mainColor} animate={animate} />
            <CountdownDigit value={time.hours}   label="hours"   color={mainColor} animate={animate} />
            <CountdownDigit value={time.minutes} label="minutes" color={mainColor} animate={animate} />
          </div>

          {/* Separator */}
          <div className="mt-2 xs:mt-3 sm:mt-4 h-0.5 sm:h-1 w-full
                         bg-gradient-to-r from-transparent via-teal-200/50 to-transparent" />

          {/* Seconds */}
          <div className="mt-1 sm:mt-2 flex justify-center">
            <motion.div
              className="px-1.5 xs:px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-blue-50 text-[8px] xs:text-[10px] sm:text-xs"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <span className="text-blue-700 font-mono">
                {String(time.seconds || 0).padStart(2, '0')}
              </span>
              <span className="text-blue-600 ml-1">seconds</span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* 3D shadow */}
      <motion.div
        className="h-1.5 xs:h-2 sm:h-3 md:h-4 mx-3 xs:mx-4 sm:mx-6 md:mx-8
                   rounded-full bg-blue-900/10 blur-md -mt-1 sm:-mt-2"
        initial={{ opacity: 0.4 }}
        whileHover={{ opacity: 0.7, scale: 1.1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

const CountdownDesign1 = ({ cards }) => (
  <section
    className="relative py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8
               overflow-hidden bg-gradient-to-b from-blue-50/40 to-white"
  >
    {/* Background */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute w-full h-full bg-grid-pattern opacity-5" />
    </div>

    {/* Title */}
    <div className="relative mb-8 sm:mb-12 text-center">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-blue-900">
        Important Dates
      </h2>
      <div className="mt-2 sm:mt-3">
        <p className="text-xs sm:text-sm md:text-base text-blue-600 max-w-2xl mx-auto">
          Mark your calendar for these key deadlines and events
        </p>
      </div>
    </div>

    {/* Cards */}
    <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
                    gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto">
      {cards.map(({ title, color, description, time, index }) => (
        time && (
          <CountdownCard
            key={title}
            title={title}
            time={time}
            mainColor={color}
            delay={index}
            description={description}
          />
        )
      ))}
    </div>
  </section>
);

// ═══════════════════════════════════════════════════════════════════════════
// Design 2 — dark navy band with glassmorphism cards (matches the site's
// hero-header gradient), big mono digits including live seconds
// ═══════════════════════════════════════════════════════════════════════════

const GlassUnit = ({ value, label }) => (
  <div className="flex flex-col items-center min-w-[42px]">
    <span className="font-mono font-bold text-white text-2xl sm:text-3xl tabular-nums leading-none">
      {String(value ?? 0).padStart(2, '0')}
    </span>
    <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.15em] text-blue-200/80 mt-1.5">
      {label}
    </span>
  </div>
);

const GlassColon = () => (
  <span className="text-white/30 font-mono text-xl sm:text-2xl leading-none pb-4 select-none">:</span>
);

const CountdownDesign2 = ({ cards }) => (
  <section
    className="relative py-12 sm:py-16 px-4 sm:px-6 md:px-8 overflow-hidden"
    style={{
      background:
        'linear-gradient(135deg, #0a0f1e 0%, #0f172a 35%, #1e3a8a 75%, #1d4ed8 100%)',
    }}
  >
    {/* Dot grid */}
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.055]"
      style={{
        backgroundImage:
          'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }}
    />

    <div className="relative max-w-7xl mx-auto">
      {/* Title */}
      <div className="text-center mb-10 sm:mb-12">
        <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-blue-300 mb-3">
          Countdown
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-poppins font-bold text-white">
          Important Dates
        </h2>
        <div
          className="mx-auto mt-4 h-1 w-14 rounded-full"
          style={{ background: 'linear-gradient(90deg, #60a5fa, #93c5fd)' }}
        />
      </div>

      {/* Glass cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map(({ title, description, time }, i) => (
          time && (
            <motion.div
              key={title}
              className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-5 hover:bg-white/[0.14] transition-colors duration-200"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <h3 className="text-sm sm:text-[15px] font-poppins font-semibold text-white">
                {title}
              </h3>
              <p className="text-[11px] text-blue-100/70 mt-1 mb-5 min-h-[28px] leading-relaxed">
                {description}
              </p>
              <div className="flex items-end justify-center gap-1.5 sm:gap-2">
                <GlassUnit value={time.days} label="days" />
                <GlassColon />
                <GlassUnit value={time.hours} label="hrs" />
                <GlassColon />
                <GlassUnit value={time.minutes} label="min" />
                <GlassColon />
                <GlassUnit value={time.seconds} label="sec" />
              </div>
            </motion.div>
          )
        ))}
      </div>
    </div>
  </section>
);

// ═══════════════════════════════════════════════════════════════════════════
// Design 3 — minimal light list: one row per deadline with an accent bar on
// the left and inline digits on the right
// ═══════════════════════════════════════════════════════════════════════════

const InlineUnit = ({ value, label }) => (
  <div className="flex flex-col items-center min-w-[46px]">
    <span className="font-mono font-bold text-blue-900 text-xl sm:text-2xl tabular-nums leading-none">
      {String(value ?? 0).padStart(2, '0')}
    </span>
    <span className="text-[9px] uppercase tracking-wider text-slate-400 mt-1">
      {label}
    </span>
  </div>
);

const CountdownDesign3 = ({ cards }) => (
  <section className="relative py-12 sm:py-16 px-4 sm:px-6 md:px-8 bg-white">
    <div className="max-w-4xl mx-auto">
      {/* Title */}
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-poppins font-bold text-slate-900">
          Important Dates
        </h2>
        <div
          className="mx-auto mt-4 h-1 w-14 rounded-full"
          style={{ background: 'linear-gradient(90deg, #2563eb, #60a5fa)' }}
        />
        <p className="mt-3 text-xs sm:text-sm text-slate-500">
          Mark your calendar for these key deadlines and events
        </p>
      </div>

      {/* Rows */}
      <div className="bg-white border border-blue-100 rounded-2xl divide-y divide-blue-50 shadow-sm overflow-hidden">
        {cards.map(({ title, color, description, time }, i) => (
          time && (
            <motion.div
              key={title}
              className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 px-5 sm:px-7 py-5"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              {/* Accent bar + text */}
              <div className="flex items-start gap-4 flex-1 min-w-0">
                <span
                  className="w-1 self-stretch rounded-full flex-shrink-0"
                  style={{ background: `linear-gradient(180deg, ${color}, #60a5fa)` }}
                />
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-poppins font-semibold text-slate-800">
                    {title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>

              {/* Inline digits */}
              <div className="flex items-start gap-2 sm:gap-3 md:flex-shrink-0 pl-5 md:pl-0">
                <InlineUnit value={time.days} label="days" />
                <InlineUnit value={time.hours} label="hrs" />
                <InlineUnit value={time.minutes} label="min" />
                <InlineUnit value={time.seconds} label="sec" />
              </div>
            </motion.div>
          )
        ))}
      </div>
    </div>
  </section>
);

// ═══════════════════════════════════════════════════════════════════════════
// Top-level component — fetches dates once, then renders the design chosen
// from the admin panel (homecustomisation's "countdown" component). An
// explicit `design` prop (used by the /datedesigns preview page) overrides
// the fetch; any missing or unknown value falls back to design 1.
// ═══════════════════════════════════════════════════════════════════════════

const COUNTDOWN_DESIGNS = {
  1: CountdownDesign1,
  2: CountdownDesign2,
  3: CountdownDesign3,
};

const CountdownTimer = ({ confid, design }) => {
  const designNo = useComponentDesign(confid, "countdown", design);
  const [datesData, setDatesData] = useState([]);
  const [times, setTimes]     = useState({});
  const [apiUrl, setApiUrl]   = useState(null);

  // 1. get base URL
  useEffect(() => {
    getEnvironment().then(setApiUrl);
  }, []);

  // 2. fetch datesData
  useEffect(() => {
    if (!apiUrl) return;
    axios.get(`${apiUrl}/conferencemodule/eventDates/conference/${confid}`, {
      withCredentials: true,
    })
    .then(res => setDatesData(res.data))
    .catch(console.error);
  }, [apiUrl, confid]);

  // 3. compute & update times
  useEffect(() => {
    if (!datesData || datesData.length < 4) return;

    const targets = {
      submission: new Date(datesData[0].date),
      acceptance: new Date(datesData[1].date),
      registration: new Date(datesData[3].date),
      conference: new Date('2026-10-15T09:00:00'),
    };

    const tick = () => {
      setTimes({
        submission:  getTimeLeft(targets.submission),
        acceptance:  getTimeLeft(targets.acceptance),
        registration:getTimeLeft(targets.registration),
        conference:  getTimeLeft(targets.conference),
      });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [datesData]);

  // color + data mapping
  const cardData = [
    {
      title: "Paper Submission",
      color: "#2563eb",
      description: "Deadline for submitting your research paper for review",
      time: times.submission,
      index: 0,
    },
    {
      title: "Acceptance Notification",
      color: "#1d4ed8",
      description: "When authors will be notified of acceptance decisions",
      time: times.acceptance,
      index: 1,
    },
    {
      title: "Registration Deadline",
      color: "#1e40af",
      description: "Final date to register for the conference",
      time: times.registration,
      index: 2,
    },
    {
      title: "Conference Start",
      color: "#1e3a8a",
      description: "Official opening of the conference",
      time: times.conference,
      index: 3,
    },
  ];

  const Design = COUNTDOWN_DESIGNS[designNo] || CountdownDesign1;
  return <Design cards={cardData} />;
};

export default CountdownTimer;
