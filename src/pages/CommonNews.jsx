import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import getEnvironment from '../getenvironment';
import axios from 'axios';

function CommonNews() {
  const [apiUrl, setApiUrl] = useState(null);
  const [data, setData] = useState(null);        
  const { newsid } = useParams();

  // load base URL
  useEffect(() => {
    getEnvironment().then(url => setApiUrl(url));
  }, []);

  // fetch once we have apiUrl
  useEffect(() => {
    if (!apiUrl) return;
    window.scrollTo(0, 0);
    axios
      .get(`${apiUrl}/conferencemodule/announcements/${newsid}`, { withCredentials: true })
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, [apiUrl, newsid]);

  // while loading...
  if (data === null) {
    return (
      <>
        <Navbar />
        <div className="bg-white min-h-screen flex items-center justify-center mt-[58px]">
          <div className="text-[#2563eb] text-xl flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-[#2563eb]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading announcement...
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="top-0 w-screen z-40">
        <Navbar />
      </div>

      <div className="bg-white min-h-screen pt-24 pb-16 pt-[166px]">
        <div className="container max-w-7xl mx-auto px-5 sm:px-10 lg:px-8 relative">
          {/* Background decorative elements */}
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <div className="absolute w-[800px] h-[800px] border border-[#2563eb]/10 rounded-full -right-1/4 top-1/4 transform -translate-y-1/2"></div>
            <div className="absolute w-[500px] h-[500px] border border-[#2563eb]/15 rounded-full -left-1/4 bottom-1/4"></div>
            <div className="absolute w-3 h-3 bg-[#2563eb] rounded-full left-[10%] top-[20%] animate-pulse"></div>
            <div className="absolute w-2 h-2 bg-[#2563eb] rounded-full right-[15%] bottom-[30%] animate-pulse"></div>
          </div>
          
          <div className="bg-[white] border border-[#2563eb]/30 rounded-xl p-6 md:p-8 shadow-lg shadow-[#2563eb]/10 backdrop-blur-sm relative z-10">
            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-[#2563eb]">
              {data.title}
            </h1>
            {/* <div className="w-32 h-1 bg-gradient-to-r from-[#2563eb] to-transparent mb-8"></div> */}
          <div className="w-40 h-1 bg-blue-600 mb-4"></div>
            
            <div
              className="text-base text-gray-700 prose prose-invert prose-headings:text-[#2563eb] prose-a:text-[#2563eb] prose-strong:text-black max-w-none"
              dangerouslySetInnerHTML={{ __html: data.description || '' }}
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default CommonNews;
