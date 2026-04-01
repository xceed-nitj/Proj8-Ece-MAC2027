import axios from "axios";
import getEnvironment from "../getenvironment";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const sliderData = [
  { image: "/ece1.jpeg", label: "ECE Department" },
  // { image: "/ece2.png", label: "Research Lab" },
  { image: "/ece3.png", label: "Innovation Center" },
  { image: "/ece4.jpg", label: "Academic Block" },

  // { image: "/slider2.jpg", label: " " },
];

function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="relative h-full w-full overflow-hidden rounded-lg sm:rounded-xl bg-teal-50"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Slides */}
      {sliderData.map((slide, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 20 }}
          animate={{ 
            opacity: index === currentSlide ? 1 : 0,
            x: index === currentSlide ? 0 : 20,
            scale: index === currentSlide ? 1 : 1.1,
          }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={`absolute inset-0 w-full h-full ${isHovered ? 'scale-105' : 'scale-100'} transition-transform duration-700`}
        >
          <img
            src={slide.image}
            alt={slide.label}
            className="w-full h-full object-cover object-center transition-all duration-700"
          />
          
          {/* Caption */}
          {index === currentSlide && (
            <motion.div
              className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 bg-teal-900/60 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <p className="text-white text-[10px] xs:text-xs font-medium">{slide.label}</p>
            </motion.div>
          )}
        </motion.div>
      ))}
      
      {/* Elegant Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-teal-900/40 to-transparent"></div>
      
      {/* Image navigation dots */}
      <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 flex space-x-1 sm:space-x-1.5 z-10">
        {sliderData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white w-4 sm:w-6" : "bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Decorative Corner Elements (subtle) */}
      <div className="absolute top-0 left-0 w-8 sm:w-12 h-8 sm:h-12 border-l border-t border-white/20 rounded-tl-lg"></div>
      <div className="absolute top-0 right-0 w-8 sm:w-12 h-8 sm:h-12 border-r border-t border-white/20 rounded-tr-lg"></div>
      <div className="absolute bottom-0 left-0 w-8 sm:w-12 h-8 sm:h-12 border-l border-b border-white/20 rounded-bl-lg"></div>
      <div className="absolute bottom-0 right-0 w-8 sm:w-12 h-8 sm:h-12 border-r border-b border-white/20 rounded-br-lg"></div>
    </motion.div>
  );
}

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
    const keywords = ["Electronics", "Communication", "Technology", "Research", "Innovation", "Signal Processing", "VLSI"];
    let highlightedText = text;
    keywords.forEach(keyword => {
      const regex = new RegExp(keyword, 'gi');
      highlightedText = highlightedText.replace(regex, `<span class="font-medium text-teal-700">${keyword}</span>`);
    });
    return highlightedText;
  };

  return (
    <motion.section 
      className="relative py-10 sm:py-14 md:py-20 w-full bg-gradient-to-b from-white via-teal-50/10 to-white overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Abstract background patterns */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Circuit board pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2314b8a6' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
        
        {/* Floating elements */}
        <div className="absolute -top-10 right-20 w-20 sm:w-30 md:w-40 h-20 sm:h-30 md:h-40 bg-teal-200/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 -left-10 w-30 sm:w-40 md:w-60 h-30 sm:h-40 md:h-60 bg-teal-100/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section heading */}
        <motion.div 
          className="text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="inline-block text-xl sm:text-2xl md:text-3xl font-poppins text-teal-900 mb-2 sm:mb-3 relative">
            Department of Electronics and Communication Engineering
            <motion.div 
              className="absolute -bottom-1 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-teal-500 to-teal-300 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            ></motion.div>
          </h2>
          <p className="text-teal-700 mt-2 sm:mt-4 max-w-2xl mx-auto text-xs sm:text-sm">
            Pioneering research and education in electronics, AI, communications, and signal processing
          </p>
        </motion.div>

        {/* Main Content Card */}
        <motion.div 
          className="max-w-7xl mx-auto bg-white rounded-lg sm:rounded-xl shadow-md sm:shadow-xl border border-teal-50 overflow-hidden"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(14, 116, 144, 0.15)" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
            {/* Image Slider Section */}
            <div className="lg:col-span-2 h-[250px] sm:h-[300px] md:h-[350px] lg:h-full">
              <Slider />
            </div>

            {/* Content Section */}
            <div className="lg:col-span-3 p-4 sm:p-6 md:p-8">
              {isLoading ? (
                <div className="animate-pulse space-y-3 sm:space-y-4">
                  <div className="h-3 sm:h-4 bg-teal-100 rounded w-3/4"></div>
                  <div className="h-3 sm:h-4 bg-teal-100 rounded"></div>
                  <div className="h-3 sm:h-4 bg-teal-100 rounded w-5/6"></div>
                  <div className="h-3 sm:h-4 bg-teal-100 rounded w-2/3"></div>
                </div>
              ) : (
                <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none">
                  {data ? (
                    <div
                      className="text-xs sm:text-sm text-justify md:text-base text-gray-700 leading-relaxed font-light"
                      dangerouslySetInnerHTML={{
                        __html: highlightKeywords(data.about[2]?.description || ""),
                      }}
                    />
                  ) : null}
                </div>
              )}
              
              {/* Department highlights */}
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-teal-100">
                <h3 className="text-base sm:text-lg font-medium text-teal-900 mb-3 sm:mb-4">Department Highlights</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {[
                    "Advanced Signal Processing Research",
                    "VLSI Design & Verification",
                    "5G & Next-Gen Communication",
                    "Industry Collaborations",
                    "State-of-the-art Laboratories",
                    "International Publications"
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      className="flex items-center"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.1 * i }}
                    >
                      <div className="mr-2 sm:mr-3 text-teal-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-700">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Call to action */}
              <div className="mt-6 sm:mt-8">
                <a 
                  href="https://departments.nitj.ac.in/dept/ece/home/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-teal-600 hover:text-teal-800 transition-colors duration-300 text-xs sm:text-sm"
                >
                  <span>Visit department website</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default AboutDept;