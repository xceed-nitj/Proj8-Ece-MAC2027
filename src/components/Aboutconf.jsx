import axios from "axios";
import getEnvironment from "../getenvironment";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const sliderData = [
  { image: "/ece3.png", label: "Innovation at NITJ" },
  // { image: "/ece1.jpeg", label: "Research Excellence" },
  { image: "/ece2.png", label: "Collaborative Learning" },
  { image: "/ece4.jpg", label: "Future Technology" },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      when: "beforeChildren",
      staggerChildren: 0.15,
      duration: 0.6
    }
  }
};

const itemVariants = {
  hidden: { y: 15, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4 } }
};

function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {sliderData.map((slide, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: index === currentSlide ? 1 : 0,
            scale: index === currentSlide ? 1 : 1.05
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <div 
            className="w-full h-full bg-center bg-cover transition-transform duration-[2s] hover:scale-105"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          {/* Dark overlay with gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          
          {/* Label */}
          <motion.div 
            className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6"
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <div className="bg-black/60 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg inline-block">
              <p className="text-white text-xs sm:text-sm font-medium tracking-wide font-sans">{slide.label}</p>
            </div>
          </motion.div>
        </motion.div>
      ))}
      
      {/* Slider indicators */}
      <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 flex justify-end space-x-1.5 sm:space-x-2 z-20">
        {sliderData.map((_, index) => (
          <motion.button
            key={index}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentSlide(index)}
            className={`w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full transition-all ${
              index === currentSlide ? "bg-white w-4 sm:w-6" : "bg-white/60 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

const AboutConf = (props) => {
  const confid = props.confid;
  const [apiUrl, setApiUrl] = useState(null);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getEnvironment().then((url) => setApiUrl(url));
  }, []);

  useEffect(() => {
    if (apiUrl) {
      setIsLoading(true);
      axios
        .get(`${apiUrl}/conferencemodule/home/conf/${confid}`, {
          withCredentials: true,
        })
        .then((res) => {
          setData(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  }, [apiUrl, confid]);

  // Function to highlight keywords in the text
  const highlightKeywords = (text) => {
    if (!text) return "";
    const keywords = ["Communication", "VLSI", "Signal Processing", "NIT Jalandhar", "Research", "Technology"];
    let highlightedText = text;
    keywords.forEach(keyword => {
      const regex = new RegExp(keyword, 'gi');
      highlightedText = highlightedText.replace(regex, `<span class="font-semibold text-teal-800">${keyword}</span>`);
    });
    return highlightedText;
  };

  return (
    <motion.section 
      className="w-full bg-gradient-to-b from-gray-50 to-white px-4 sm:px-6 md:px-10 relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="container mx-auto py-8 sm:py-10 md:py-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {/* Left side - Image */}
          <motion.div 
  className="h-full rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl flex"
  variants={itemVariants}
>
  <Slider />
</motion.div>
          
          {/* Right side - Content */}
          <motion.div 
            className="flex flex-col justify-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div 
              className="bg-white/80 backdrop-blur-md rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 shadow-lg sm:shadow-xl border border-white/20"
              variants={itemVariants}
            >
              <motion.div className="space-y-4 sm:space-y-6">
                {/* Title */}
                <div>
                  <h2 className="text-2xl font-poppins sm:text-3xl md:text-4xl  text-teal-900 font-medium mb-3 sm:mb-6 text-left w-full block">
                    About the Conference
                  </h2>
                  <div className="h-0.5 sm:h-1 w-16 sm:w-24 bg-gradient-to-r from-teal-600 to-teal-400 rounded-full"></div>
                </div>

                {/* Subtitle */}
                {/* <p className="text-teal-700 text-xs sm:text-sm font-medium tracking-wider uppercase">
                  International Conference on Innovative Practices in High-End Research
                </p> */}

                {/* Content */}
                {isLoading ? (
                  <div className="space-y-3 sm:space-y-4 animate-pulse">
                    <div className="h-3 sm:h-4 bg-teal-100/50 rounded w-3/4"></div>
                    <div className="h-3 sm:h-4 bg-teal-100/50 rounded"></div>
                    <div className="h-3 sm:h-4 bg-teal-100/50 rounded w-5/6"></div>
                    <div className="h-3 sm:h-4 bg-teal-100/50 rounded w-2/3"></div>
                  </div>
                ) : (
                  <motion.div 
                    className="prose prose-sm sm:prose-base md:prose-lg max-w-none"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    {data ? (
                      <div
                        className="text-xs sm:text-sm md:text-[15px] text-[#4a4a4a] leading-relaxed text-justify font-sans"
                        dangerouslySetInnerHTML={{
                          __html: highlightKeywords(data.about[0]?.description || ""),
                        }}
                      />
                    ) : (
                      <p className="italic text-gray-500 text-xs sm:text-sm">No information available at the moment.</p>
                    )}
                  </motion.div>
                )}

                {/* Decorative element */}
                {/* <motion.div 
                  className="flex items-center pt-3 sm:pt-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <div className="flex-grow h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent"></div>
                  <motion.div 
                    className="px-3 sm:px-4" 
                    whileHover={{ rotate: 180, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </motion.div>
                  <div className="flex-grow h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent"></div>
                </motion.div> */}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutConf;