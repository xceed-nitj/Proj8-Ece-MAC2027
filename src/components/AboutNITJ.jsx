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

function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg sm:rounded-xl transform perspective-[1000px]">
      {sliderData.map((slide, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: index === currentSlide ? 1 : 0,
            rotateY: index === currentSlide ? 0 : 15,
            scale: index === currentSlide ? 1 : 1.05,
          }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <div
            className="absolute inset-0 w-full h-full bg-center bg-cover transition-all duration-1000"
            style={{ 
              backgroundImage: `url(${slide.image})`
            }}
          />

          {/* Labels */}
          {index === currentSlide && (
            <motion.div
              className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 bg-teal-900/60 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <p className="text-white text-[10px] xs:text-xs font-medium">{slide.label}</p>
            </motion.div>
          )}
        </motion.div>
      ))}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-teal-900/50 to-transparent"></div>

      {/* Navigation dots */}
      <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 flex space-x-1 sm:space-x-1.5">
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
    </div>
  );
}

function AboutNITJ(props) {
  const confid = props.confid;
  const [apiUrl, setApiUrl] = useState(null);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // const [isHovered, setIsHovered] = useState(false);

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
    const keywords = ["NIT Jalandhar", "Technology", "Research", "Innovation", "Excellence"];
    let highlightedText = text;
    keywords.forEach(keyword => {
      const regex = new RegExp(keyword, 'gi');
      highlightedText = highlightedText.replace(regex, `<span class="font-medium text-teal-700">${keyword}</span>`);
    });
    return highlightedText;
  };

  return (
    <motion.section 
      className="relative py-10 sm:py-16 md:py-24 w-full bg-gradient-to-b from-teal-50/50 to-white overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Abstract background elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-1/2 right-0 w-[400px] sm:w-[600px] md:w-[800px] h-[400px] sm:h-[600px] md:h-[800px] rounded-full bg-gradient-to-br from-teal-100/10 to-transparent"></div>
        <div className="absolute -bottom-1/2 left-0 w-[300px] sm:w-[400px] md:w-[600px] h-[300px] sm:h-[400px] md:h-[600px] rounded-full bg-gradient-to-tr from-teal-100/10 to-transparent"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10" 
             style={{
               backgroundImage: 'radial-gradient(circle, #0d9488 1px, transparent 1px)',
               backgroundSize: '20px 20px'
             }}>
        </div>
        
        {/* Decorative elements - hide on small screens */}
        <div className="hidden sm:block absolute top-20 left-40 w-10 sm:w-20 h-10 sm:h-20 border border-teal-200/30 rounded-full"></div>
        <div className="hidden sm:block absolute bottom-40 right-60 w-16 sm:w-32 h-16 sm:h-32 border border-teal-200/20 rounded-full"></div>
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
          <h2 className="inline-block text-xl sm:text-2xl md:text-3xl font-medium font-poppins text-teal-900 mb-2 sm:mb-3 relative">
            Dr B R Ambedkar National Institute of Technology Jalandhar
            <motion.div 
              className="absolute -bottom-1 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-teal-500 to-teal-300 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            ></motion.div>
          </h2>
          <p className="text-teal-700 mt-2 sm:mt-4 max-w-2xl mx-auto text-xs sm:text-sm">
            A premier institution committed to excellence in technical education and research
          </p>
        </motion.div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="bg-white rounded-lg sm:rounded-xl shadow-md sm:shadow-xl border border-teal-50 overflow-hidden"
            whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(14, 116, 144, 0.15)" }}
            transition={{ duration: 0.3 }}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            // transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
              {/* Content Column */}
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
                        className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed font-light"
                        dangerouslySetInnerHTML={{
                          __html: highlightKeywords(data.about[1]?.description || ""),
                        }}
                      />
                    ) : null}
                  </div>
                )}
                
                {/* Logo and Stats */}
                <div className="mt-6 sm:mt-8 md:mt-10 flex flex-col md:flex-row items-center justify-between border-t border-teal-100 pt-4 sm:pt-6">
                  {/* Logo */}
                  <div className="flex-shrink-0 mb-4 md:mb-0">
                    <img 
                      src="/nitjlogo.png" 
                      alt="NITJ Logo" 
                      className="h-12 sm:h-16 object-contain"
                    />
                  </div>
                  
                  {/* Quick stats */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="text-center">
                      <p className="text-xl sm:text-2xl font-bold text-teal-700">1987</p>
                      <p className="text-[10px] sm:text-xs text-gray-500">ESTABLISHED</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl sm:text-2xl font-bold text-teal-700">A+</p>
                      <p className="text-[10px] sm:text-xs text-gray-500">NAAC GRADE</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image Column */}
              <div className="lg:col-span-2 h-[250px] sm:h-[300px] md:h-[350px] lg:h-auto relative">
                <Slider />
              </div>
            </div>
          </motion.div>
          
          {/* Key Features */}
          <div className="mt-8 sm:mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              { 
                icon: "🎓",
                title: "Academic Excellence", 
                description: "Committed to providing quality education through innovative teaching methods."
              },
              { 
                icon: "🔬",
                title: "Research Focus", 
                description: "Advancing knowledge through cutting-edge research in various technological domains."
              },
              { 
                icon: "🌐",
                title: "Global Vision", 
                description: "Creating global citizens equipped with skills for the international arena."
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm sm:shadow-md border border-teal-50 flex flex-col items-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * idx }}
                whileHover={{ y: -5, boxShadow: "0 15px 30px -10px rgba(14, 116, 144, 0.1)" }}
              >
                <span className="text-2xl sm:text-3xl mb-2 sm:mb-3">{feature.icon}</span>
                <h3 className="text-base sm:text-lg md:text-xl font-medium text-teal-900 mb-1 sm:mb-2">{feature.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default AboutNITJ;
