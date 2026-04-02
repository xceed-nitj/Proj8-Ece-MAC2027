import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import axios from 'axios';
import getEnvironment from '../getenvironment';

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

// Top‐level timer component
const CountdownTimer = ({ confid }) => {
  const [datesData, setDatesData] = useState([]);
  const [times, setTimes]     = useState({});
  const [apiUrl, setApiUrl]   = useState(null);
  const sectionRef = useRef(null);

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

  return (
    <section
      ref={sectionRef}
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
        {cardData.map(({ title, color, description, time, index }) => (
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
};

export default CountdownTimer;
