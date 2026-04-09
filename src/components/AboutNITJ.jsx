import axios from "axios";
import getEnvironment from "../getenvironment";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const sliderData = [
  { image: "/img1.jpg", label: "NIT Campus" },
  { image: "/img2.jpg", label: "Innovation Hub" },
  { image: "/img3.jpg", label: "Research Center" },
  { image: "/ece2.jpg", label: "Academic Block" },
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
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-white/5 backdrop-blur-md border border-white/10">
      {sliderData.map((slide, index) => (
        <motion.div
          key={index}
          animate={{ opacity: index === currentSlide ? 1 : 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

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
    </div>
  );
}

// ─── MAIN COMPONENT ─────────────────────────────────

function AboutNITJ(props) {
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

  const highlightKeywords = (text) => {
    if (!text) return "";
    const keywords = ["NIT Jalandhar", "Technology", "Research", "Innovation", "Excellence"];
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
            Dr B R Ambedkar National Institute of Technology Jalandhar
          </h2>
          <p className="text-white/60 mt-3 text-sm">
            A premier institution committed to excellence in technical education and research
          </p>
        </div>

        {/* MAIN CARD */}
        <motion.div
          className="max-w-7xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

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
                    __html: highlightKeywords(data?.about[1]?.description || ""),
                  }}
                />
              )}

              {/* LOGO + STATS */}
           
            </div>

            {/* SLIDER */}
            <div className="lg:col-span-2 h-[300px] lg:h-full">
              <Slider />
            </div>

          </div>
        </motion.div>

        {/* FEATURES */}
      

      </div>
    </section>
  );
}

export default AboutNITJ;
