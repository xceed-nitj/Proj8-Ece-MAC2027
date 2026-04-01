import { useState, useEffect, useRef } from "react";
// import Separator from "./common/Separator";
// import Slider from "../components/Slider";
import { Link } from "react-router-dom";
import axios from "axios";
import getEnvironment from "../getenvironment";

// Theme color variables
const COLOR_BG_MAIN = "#fff";
const COLOR_BG_NEWS = "#fff";
const COLOR_BORDER_NEWS = "#bfa77a";
const COLOR_BORDER_R = "#713F12";
const COLOR_CARD_BG = "#fff"; // changed to white
const COLOR_CARD_BORDER = "#bfa77a";
const COLOR_CARD_TITLE = "#6b4f2c";
const COLOR_CARD_ACCENT = "#bfa77a";
const COLOR_CARD_NEW_BG = "#f6e7c1";
const COLOR_CARD_NEW_TEXT = "#bfa77a";
const COLOR_CARD_DESC = "#6b4f2c";
const COLOR_CARD_LINK = "#bfa77a";
const COLOR_CARD_LINK_HOVER = "#6b4f2c";
const COLOR_LOGO_BG = "#1a1307"; // yellow-950

function AboutNews(props) {
  const [apiUrl, setApiUrl] = useState(null);
  useEffect(() => {
    // Fetch the environment URL
    getEnvironment().then(url => setApiUrl(url));
  }, []);
  const confid = props.confid;
  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   if (apiUrl) {
  //     axios.get(`${apiUrl}/conferencemodule/home/conf/${confid}`, {
  //       withCredentials: true
  //     })
  //       .then(res => {
  //         setData(res.data);
  //         console.log(res.data);
  //       })
  //       .catch(err => console.log(err));
  //   }
  // }, [apiUrl,confid]);

  const [newsData, setNewsData] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (apiUrl) {
      axios.get(`${apiUrl}/conferencemodule/announcements/conf/${confid}`, {
        withCredentials: true
      })
        .then(res => {
          const sortedData = res.data.sort((a, b) => a.sequence - b.sequence);
          setNewsData(sortedData);
          console.log(sortedData);
        })
        .catch(err => console.log(err));
    }
  }, [apiUrl, confid]);

  // Continuous horizontal scroll effect
  useEffect(() => {
    if (!newsData.length) return;
    const container = scrollRef.current;
    let reqId;
    let scrollAmount = 0.5; // Adjust speed here

    function animate() {
      if (container) {
        container.scrollLeft += scrollAmount;
        // If reached end, reset to start for infinite loop
        if (container.scrollLeft + container.offsetWidth >= container.scrollWidth) {
          container.scrollLeft = 0;
        }
      }
      reqId = requestAnimationFrame(animate);
    }
    reqId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(reqId);
  }, [newsData]);

  return (
    <div className="bg-white relative overflow-hidden min-h-screen w-full" style={{ background: COLOR_BG_MAIN }}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute w-[800px] h-[100px] border border-[#2563eb]/10 -right-1/4 top-1/4 transform -translate-y-1/2"></div>
        <div className="absolute w-[500px] h-[200px] border border-[#2563eb]/15 -left-1/4 bottom-1/4"></div>
        <div className="absolute w-3 h-3 bg-[#2563eb] left-[10%] top-[20%] animate-pulse"></div>
        <div className="absolute w-2 h-2 bg-[#2563eb] right-[15%] bottom-[30%] animate-pulse"></div>
      </div>

      <div className="w-full h-screen relative z-10">
        {/* Complete section with news and actions */}
        <div className="bg-white relative overflow-hidden min-h-screen w-full font-serif" style={{ background: COLOR_BG_MAIN }}>
          <div className="grid grid-cols-1 lg:grid-cols-5 h-full">
            
            {/* News Section - Takes 3/5 of the grid [#6b4f2c]*/}
            <div
              className="lg:col-span-3 p-8 border-r"
              style={{
                background: COLOR_BG_NEWS,
                borderRightColor: COLOR_BORDER_R,
                borderRightWidth: "1px",
                borderBottom: `1px solid ${COLOR_BORDER_NEWS}`,
                height: "30vh",
                overflow: "hidden"
              }}
            >
              {/* Horizontal scrollable news cards */}
              <div
                id="news"
                ref={scrollRef}
                className="overflow-x-auto overflow-y-hidden whitespace-nowrap flex flex-row gap-4 h-full pb-2 no-scrollbar"
                style={{ height: "calc(30vh - 48px)" }}
              >
                {/* Duplicate newsData for seamless infinite scroll */}
                {[...newsData, ...newsData].map((item, idx) =>
                  !item.hidden && (
                    <div
                      key={item._id + "_" + idx}
                      className="inline-block align-top rounded-xl shadow-md hover:shadow-lg transition-all duration-200 w-48 h-56 flex flex-col justify-between mr-2"
                      style={{
                        background: COLOR_CARD_BG,
                        border: `2px solid ${COLOR_CARD_BORDER}`,
                        minWidth: "12rem",
                        maxWidth: "12rem"
                      }}
                    >
                      {/* News image if available */}
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-24 object-cover rounded-t-xl"
                        />
                      )}
                      <div className="p-3 flex-1 flex flex-col">
                        <div className="text-xs font-semibold mb-1 uppercase"
                          style={{ color: COLOR_CARD_ACCENT }}>
                          {item.date || ""}
                        </div>
                        <div className="flex flex-row justify-between items-start">
                          <span
                            className="text-base font-bold mb-1 line-clamp-2"
                            style={{ color: COLOR_CARD_TITLE }}
                          >
                            {item.title}
                          </span>
                          {item.new && (
                            <span
                              className="ml-2 px-2 py-0.5 rounded text-xs font-semibold align-middle"
                              style={{
                                background: COLOR_CARD_NEW_BG,
                                color: COLOR_CARD_NEW_TEXT
                              }}
                            >
                              NEW
                            </span>
                          )}
                        </div>
                        <div
                          className="text-xs mt-1 flex-1 line-clamp-3"
                          style={{ color: COLOR_CARD_DESC }}
                        >
                          {item.metaDescription}
                        </div>
                      </div>
                      <div className="p-3 pt-0 flex items-end">
                        <Link
                          target="_blank"
                          rel="noopener noreferrer"
                          to={item.link !== "" ? item.link : `/news/${item._id}`}
                          className="font-semibold text-xs flex items-center gap-1"
                          style={{
                            color: COLOR_CARD_LINK
                          }}
                          onMouseOver={e => (e.currentTarget.style.color = COLOR_CARD_LINK_HOVER)}
                          onMouseOut={e => (e.currentTarget.style.color = COLOR_CARD_LINK)}
                        >
                          Read More <span aria-hidden="true">→</span>
                        </Link>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* logo Section - Takes 2/5 of the grid */}
          <div className="lg:col-span-2 p-8 flex items-center justify-center"
                 style={{ height: "30vh", background: COLOR_LOGO_BG }}>
              {/* Logo Container */}
              <div className="flex items-center">
                {/* Replace this with your actual logo */}
                {/* <div className="text-white text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center mb-4 shadow-xl">
                    <span className="text-4xl font-bold text-white">LOGO</span>
                  </div>
                </div> */}
                
                 {/* If you have an actual logo image, use this instead: */}
                <img 
                  src="/nitjlogo.png" 
                  alt="Company Logo" 
                  className="max-w-48 max-h-32 object-contain"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutNews;
