import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from "axios";
import getEnvironment from "../getenvironment";
import { motion } from "framer-motion";

function CommonTemplate(props) {
  const confid = props.confid;
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apiUrl, setApiUrl] = useState(null);

  useEffect(() => {
    getEnvironment().then((url) => setApiUrl(url));
  }, []);

  useEffect(() => {
    if (!apiUrl) return;
    window.scrollTo(0, 0);
    setIsLoading(true);
    axios
      .get(
        `${apiUrl}/conferencemodule/commontemplate/conference/${confid}`,
        { withCredentials: true }
      )
      .then((res) => {
        setData(res.data[1]);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, [apiUrl, confid]);

  const pageTitle = data?.pageTitle || "";

  return (
    <>
      <div className="fixed top-0 w-screen z-50">
        <Navbar />
      </div>

      {/* ── Hero Header ── */}
      <div
        className="relative w-full pt-[52px] overflow-hidden"
        style={{ minHeight: "200px" }}
      >
        {/* Dark navy bg */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #0a0f1e 0%, #0f172a 40%, #1e3a8a 80%, #1d4ed8 100%)",
          }}
        />

        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.055]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Bottom fade to white */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
          {/* Breadcrumb */}
          <motion.div
            className="flex items-center gap-2 mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <a
              href="/"
              className="text-blue-300/70 hover:text-blue-200 text-xs font-medium transition-colors duration-200"
            >
              Home
            </a>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-blue-700/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-blue-200/80 text-xs font-medium">
              {isLoading ? "Loading…" : pageTitle}
            </span>
          </motion.div>

          {/* Page title */}
          <motion.h1
            className="font-poppins font-bold text-white leading-tight"
            style={{ fontSize: "clamp(1.6rem, 4vw, 2.8rem)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {isLoading ? (
              <span className="inline-block w-64 h-9 bg-white/10 rounded-lg animate-pulse" />
            ) : (
              pageTitle
            )}
          </motion.h1>

          {/* Accent line */}
          <motion.div
            className="mt-4 h-1 rounded-full"
            style={{
              background: "linear-gradient(90deg, #60a5fa, #93c5fd)",
              width: 0,
            }}
            animate={{ width: isLoading ? 0 : "56px" }}
            transition={{ duration: 0.7, delay: 0.4 }}
          />
        </div>
      </div>

      {/* ── Content Area ── */}
      <main className="min-h-[40vh] bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          {isLoading ? (
            <div className="space-y-4 animate-pulse">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-4 bg-blue-50 rounded"
                  style={{ width: `${75 + Math.random() * 25}%` }}
                />
              ))}
            </div>
          ) : data ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="prose prose-sm sm:prose-base lg:prose-lg max-w-none
                         prose-headings:text-slate-800 prose-headings:font-poppins
                         prose-p:text-slate-600 prose-p:leading-relaxed
                         prose-a:text-blue-600 prose-a:no-underline hover:prose-a:text-blue-700
                         prose-strong:text-slate-800
                         prose-table:border-blue-200
                         prose-th:bg-blue-50 prose-th:text-slate-700
                         prose-td:border-blue-100"
              dangerouslySetInnerHTML={{ __html: data.description }}
            />
          ) : (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-slate-400 text-sm">Content not available.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default CommonTemplate;
