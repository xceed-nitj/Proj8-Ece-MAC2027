import { useState, useEffect } from "react";
import getEnvironment from "../getenvironment";
import { useParams } from "react-router-dom";
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const CommonTemplate = ({ confid }) => {
  const [data, setData] = useState(null);
  const { templateid } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const apiUrl = await getEnvironment();
        const res = await fetch(
          `${apiUrl}/conferencemodule/commontemplate/${confid}/${templateid}`,
          { method: "GET", credentials: "include", headers: { "Content-Type": "application/json" } }
        );
        if (!res.ok) throw new Error("Network response was not ok");
        setData(await res.json());
      } catch (err) {
        console.error(err);
      }
    })();
  }, [confid, templateid]);

  return (
    <div className="min-h-screen bg-white relative">
      {/* Minimal dotted background pattern with increased intensity */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.15]" 
           style={{
             backgroundImage: `radial-gradient(circle, #0d9488 1.5px, transparent 1.5px)`,
             backgroundSize: '20px 20px'
           }} 
      />

      <Navbar />

      <div className="pt-20 container mx-auto px-4 sm:px-6 lg:px-8 pb-16 relative z-10">
        {/* Card with gradient border */}
        <div className="relative p-[2px] rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 shadow-lg">
          <div className="bg-white rounded-xl p-6 sm:p-8">
            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-medium text-teal-800 mb-6">
              {data ? (
                <span dangerouslySetInnerHTML={{ __html: data.pageTitle }} />
              ) : (
                <div className="animate-pulse space-y-2">
                  <div className="h-6 bg-teal-50 rounded w-3/4" />
                  <div className="h-6 bg-teal-50 rounded w-1/2" />
                </div>
              )}
            </h1>

            {/* Simple teal divider */}
            <div className="w-16 h-0.5 bg-teal-500 mb-6" />

            {/* Content */}
            {data ? (
              <div className="prose max-w-none">
                <div 
                  dangerouslySetInnerHTML={{ __html: data.description }}
                  className="text-gray-600 leading-relaxed text-base"
                />
              </div>
            ) : (
              <div className="animate-pulse space-y-3">
                <div className="h-4 bg-teal-50 rounded w-full" />
                <div className="h-4 bg-teal-50 rounded w-5/6" />
                <div className="h-4 bg-teal-50 rounded w-4/5" />
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CommonTemplate;





