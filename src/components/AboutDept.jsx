import axios from "axios";
import getEnvironment from "../getenvironment";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const sliderData = [
  { image: "/ece1.jpeg", label: "ECE Department" },
  { image: "/ece3.png", label: "Innovation Center" },
  { image: "/ece4.jpg", label: "Academic Block" },
];

// ─── SLIDER ─────────────────────────────────────────

function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="relative h-full w-full overflow-hidden rounded-xl bg-white/5 backdrop-blur-md border border-white/10"
      whileHover={{ scale: 1.02 }}
    >
      {sliderData.map((slide, index) => (
        <motion.div
          key={index}
          animate={{
            opacity: index === currentSlide ? 1 : 0,
          }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt={slide.label}
            className="w-full h-full object-cover"
          />

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Caption */}
          {index === currentSlide && (
            <motion.div
              className="absolute bottom-4 left-4 bg-black/40 backdrop-blur px-3 py-1.5 rounded-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-white text-xs">{slide.label}</p>
            </motion.div>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}

// ─── MAIN COMPONENT ─────────────────────────────────

function AboutDept(props) {
  const confid = props.confid;
  const [apiUrl, setApiUrl] = useState(null);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getEnvironment().then((url) => setApiUrl(url));
  }, []);

  useEffect(() => {
    if (apiUrl) {
      axios
        .get(`${apiUrl}/conferencemodule/home/conf/${confid}`, {
          withCredentials: true,
        })
        .then((res) => {
          setData(res.data);
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    }
  }, [apiUrl, confid]);

  // Highlight keywords
  const highlightKeywords = (text) => {
    if (!text) return "";
    const keywords = [
      "Electronics",
      "Communication",
      "Technology",
      "Research",
      "Innovation",
      "Signal Processing",
      "VLSI",
    ];
    let output = text;
    keywords.forEach((word) => {
      const regex = new RegExp(word, "gi");
      output = output.replace(
        regex,
        `<span class="text-blue-300 font-semibold">${word}</span>`
      );
    });
    return output;
  };

  return (
    <section className="relative py-16 w-full bg-gradient-to-br from-[#0a0f1e] via-[#0f172a] to-[#1e3a8a] text-white overflow-hidden">

      {/* SIGNAL BACKGROUND */}
      <div className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, white 2px, transparent 2px),
            radial-gradient(circle at 80% 70%, white 2px, transparent 2px)
          `,
          backgroundSize: "120px 120px",
        }}
      />

      {/* ANTENNA SVG */}
      <div className="absolute top-10 right-10 opacity-10">
        <svg width="120" height="120" stroke="white" fill="none">
          <circle cx="60" cy="60" r="10" />
          <path d="M60 20 Q60 60 100 60" strokeWidth="2"/>
          <path d="M60 20 Q60 60 20 60" strokeWidth="2"/>
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold">
            Department of Electronics and Communication Engineering
          </h2>
          <p className="text-white/60 mt-3 text-sm">
            Pioneering research in communication, AI, and signal processing
          </p>
        </div>

        {/* CARD */}
        <motion.div
          className="max-w-7xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

            {/* SLIDER */}
            <div className="lg:col-span-2 h-[300px] lg:h-full">
              <Slider />
            </div>

            {/* CONTENT */}
            <div className="lg:col-span-3 p-6">

              {isLoading ? (
                <div className="animate-pulse space-y-3">
                  <div className="h-3 bg-white/20 rounded w-3/4"></div>
                  <div className="h-3 bg-white/20 rounded"></div>
                </div>
              ) : (
                <div
                  className="text-white/80 text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: highlightKeywords(
                      data?.about[2]?.description || ""
                    ),
                  }}
                />
              )}

              {/* HIGHLIGHTS */}
              <div className="mt-6 border-t border-white/10 pt-6">
                <h3 className="text-lg mb-4">Department Highlights</h3>

                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    "Advanced Signal Processing",
                    "VLSI Design",
                    "5G Communication",
                    "Industry Collaboration",
                    "Modern Labs",
                    "Global Research",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center bg-white/5 border border-white/10 rounded-lg px-3 py-2 hover:bg-white/10 transition"
                    >
                      <span className="text-blue-300 mr-2">✓</span>
                      <p className="text-sm">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-6">
                <a
                  href="https://departments.nitj.ac.in/dept/ece/home/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm transition shadow-lg"
                >
                  Visit Website →
                </a>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default AboutDept;

