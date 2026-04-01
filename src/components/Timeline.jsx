// src/components/Timeline.jsx

import axios from "axios";
import getEnvironment from "../getenvironment";
import { useState, useEffect, forwardRef } from "react";
import formatDate from "../utility/formatDate";
import { motion } from "framer-motion";

// Use getTittleDescription as the description for timeline
const getTittleDescription = (title) => {
  const descMap = {
    'Paper submission deadline': "This is the last date to submit your papers for review. Ensure your work is submitted before the deadline.",
    'Starting of Registration ': "Registration for the conference opens on this date. Secure your spot by registering early.",
    'Early Bird Registration ': "Take advantage of discounted rates by registering during the early bird period.",
    "Conference Starting Date": "The conference officially begins on this date. Join us for insightful sessions and networking.",
  };
  return descMap[title] || "An important milestone for the conference - mark your calendar.";
};

const Timeline = forwardRef((props, ref) => {
  const { confid } = props;
  const [datesData, setDatesData] = useState([]);
  const [apiUrl, setApiUrl] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getEnvironment().then((url) => setApiUrl(url));
  }, []);

  useEffect(() => {
    if (!apiUrl) return;

    setIsLoading(true);
    axios
      .get(`${apiUrl}/conferencemodule/eventDates/conference/${confid}`, {
        withCredentials: true,
      })
      .then((res) => {
        setDatesData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, [apiUrl, confid]);

  return (
    <motion.div
      ref={ref}
      className="relative py-8 sm:py-12 w-full bg-gradient-to-b from-white via-blue-50/30 to-white overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      {/* Subtle background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-48 sm:w-64 h-48 sm:h-64 bg-blue-100/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 sm:w-60 h-40 sm:h-60 bg-blue-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Title Section - Simplified */}
        <motion.div 
          className="text-center mb-8 sm:mb-10"
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-poppins font-medium sm:text-4xl text-blue-900 mb-3 relative inline-block ">
            Timeline
            <motion.div 
              className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            ></motion.div>
          </h2>
          <p className="text-sm sm:text-base text-blue-700 mt-2 max-w-2xl mx-auto">
            {getTittleDescription("Paper Submission Deadline")}
          </p>
        </motion.div>

        {/* Loading State - Simplified */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-teal-600 rounded-full animate-spin"></div>
            <p className="mt-3 text-blue-600 text-sm">Loading...</p>
          </div>
        )}

        {/* No Data State - Simplified */}
        {!isLoading && datesData.length === 0 && (
          <div className="text-center py-10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-blue-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="text-lg font-medium text-blue-700 mb-1">No dates available yet</h3>
            <p className="text-blue-600 text-sm">Conference dates will be announced soon</p>
          </div>
        )}

        {/* Timeline Container - Simplified */}
        {!isLoading && datesData.length > 0 && (
          <div className="relative max-w-5xl mx-auto">
            {/* Central Line */}
            <motion.div 
              className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 sm:w-1 bg-gradient-to-b from-blue-400 via-blue-600 to-blue-400 transform sm:-translate-x-1/2 z-0 rounded-full"
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
            ></motion.div>

            {/* Timeline Items - Simplified */}
            {datesData.map((item, idx) => (
              <motion.div
                key={idx}
                className={`relative flex items-start sm:items-center mb-8 sm:mb-12 group ${
                  idx % 2 === 0 ? "justify-start" : "sm:justify-end justify-start"
                }`}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >

                {/* Timeline Node */}
                <motion.div
                  className="absolute left-4 sm:left-1/2 top-6 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-20"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 15,
                    delay: 0.3 + idx * 0.1 
                  }}
                >
                  <div 
                    className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-white bg-blue-500 shadow-md flex items-center justify-center transition-all duration-300 ${
                      hoveredIndex === idx ? "scale-125" : "scale-100"
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full bg-white transition-all duration-300`}></div>
                  </div>
                </motion.div>

                {/* Content Card - Simplified */}
                <motion.div
                  className={`ml-12 sm:ml-0 w-[calc(100%-48px)] sm:w-[calc(50%-40px)] ${
                    idx % 2 === 0 ? "sm:pr-6" : "sm:pl-6"
                  }`}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-md border border-blue-100 hover:shadow-lg transition-all duration-300">
                    {/* Card Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-500 py-2 px-3 sm:px-4">
                      <h3 className="text-white font-medium text-sm sm:text-base">
                        {item.title}
                      </h3>
                    </div>
                    
                    {/* Card Body - Simplified */}
                    <div className="p-3 sm:p-4 bg-gradient-to-b from-blue-50 to-white">
                      {!item.extended ? (
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <div className="mr-2 text-blue-500">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <p className="text-blue-800 font-medium text-xs sm:text-sm">
                              {formatDate(item.date)}
                            </p>
                          </div>
                          {/* Use getTittleDescription for description */}
                          <p className="text-blue-700 text-xs pl-6 border-l border-blue-200">
                            {getTittleDescription(item.title)}
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <div className="mr-2 text-blue-500">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <p className="text-blue-800 font-medium text-xs sm:text-sm">
                              {formatDate(item.newDate)}
                            </p>
                          </div>
                          <div className="flex items-center pl-6">
                            <p className="text-blue-400 text-xs line-through mr-2">
                              {formatDate(item.date)}
                            </p>
                            <span className="bg-blue-100 text-blue-800 text-[10px] px-1 py-0.5 rounded">
                              Extended
                            </span>
                          </div>
                          {/* Use getTittleDescription for description */}
                          {/* <p className="text-blue-700 text-xs pl-6 border-l border-blue-200">
                            {getTittleDescription(item.title)}
                          </p> */}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Animation keyframes */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </motion.div>
  );
});

Timeline.displayName = "Timeline";
export default Timeline;
