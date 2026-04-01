// import React from "react";
import { motion } from 'framer-motion';

const ProfileCard = ({ person, index }) => (
  <motion.div 
    className="bg-white border border-teal-100 rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl
                backdrop-blur-sm w-full max-w-[260px] sm:max-w-[280px] md:max-w-[300px] flex flex-col items-center transition-all duration-300"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.1 * index }}
    whileHover={{ y: -5 }}
  >
    <div className="relative mb-4 sm:mb-6 group">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-teal-300 rounded-full blur-md opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
      <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-teal-500 p-0.5 relative z-10 bg-white">
        <img
          src={person.image}
          alt={person.name}
          className="w-full h-full object-cover object-top rounded-full transform transition-transform duration-500 group-hover:scale-110"
        />
      </div>
    </div>
    <h3 className="text-base sm:text-lg md:text-xl font-medium text-teal-900 mb-1 sm:mb-2 text-center">
      {person.name}
    </h3>
    <p className="text-gray-600 text-center text-xs sm:text-sm">{person.position}</p>
  </motion.div>
);

const OrganizingHeads = () => {
  const patrons = [
    {
      name: "Prof. Binod Kumar Kanaujia",
      position: "Director, NIT Jalandhar & Faculty Advisor, IEEE Student Branch NIT Jalandhar",
      image: "director.jpg",
    },
  ];

  const coPatrons = [
    {
      name: "Prof. Ajay Bansal",
      position: "Registrar (I/C), NIT Jalandhar",
      image: "ajaybansal.jpg",
    },
    {
      name: "Prof. Subrata Mukhopadhyay",
      position: "Adjunct Professor, NSUT",
      image: "suba.png",
    },
    {
      name: "Prof. Rohit Mehra",
      position: "Dean (R&C), NIT Jalandhar",
      image: "rohitmehra.jpg",
    },
  ];

  // Modified renderSection to allow custom className for the card container
  const renderSection = (title, members, cardContainerClass = "") => (
    <motion.div 
      className="text-center mb-8 sm:mb-12 md:mb-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2 
        className="bg-gradient-to-r from-teal-700 to-teal-500 text-white text-sm sm:text-base md:text-xl font-medium tracking-wide rounded-full py-2 sm:py-3 px-4 sm:px-8 inline-block shadow-md"
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3 }}
      >
        {title}
      </motion.h2>
      <div className="flex flex-col items-center justify-center mt-6 sm:mt-8 md:mt-12">
        <div className={cardContainerClass}>
          {members.map((person, idx) => (
            <ProfileCard key={idx} person={person} index={idx} />
          ))}
        </div>
      </div>
    </motion.div>
  );

  return (
    <motion.section 
      className="w-full py-10 sm:py-14 md:py-20 bg-gradient-to-b from-teal-50/30 to-white relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large circles */}
        <div className="absolute w-[400px] sm:w-[600px] md:w-[800px] h-[400px] sm:h-[600px] md:h-[800px] border border-teal-200/20 rounded-full -top-1/4 -right-1/4"></div>
        <div className="absolute w-[300px] sm:w-[400px] md:w-[600px] h-[300px] sm:h-[400px] md:h-[600px] border border-teal-200/30 rounded-full -bottom-1/4 -left-1/4"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2314b8a6' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
        
        {/* Small Floating Elements - Hide on smallest screens */}
        <div className="hidden sm:block">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-teal-400/30"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -15, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-poppins text-teal-900 mb-2 sm:mb-3 relative inline-block">
            Organizing Committee
            <motion.div 
              className="absolute -bottom-1 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-teal-500 to-teal-300 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            ></motion.div>
          </h2>
          <p className="text-teal-700 mt-2 sm:mt-4 max-w-2xl mx-auto text-xs sm:text-sm">
            Meet the distinguished experts who are organizing EAIC 2026
          </p>
        </motion.div>

        {renderSection("Patron", patrons, "flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10")}
        {renderSection(
          "Co-Patrons",
          coPatrons,
          // Use grid with 3 columns on md+ screens, fallback to flex/column on mobile
          "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 justify-center"
        )}
        {/* {renderSection("Organising Chairmen", chairman)} */}
        {/* {renderSection("Organising Secretaries", secretary)} */}
      </div>
    </motion.section>
  );
};

export default OrganizingHeads;
