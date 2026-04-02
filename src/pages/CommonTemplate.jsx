import { useState, useEffect } from "react";
import getEnvironment from "../getenvironment";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

const CommonTemplate = ({ confid }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { templateid } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [templateid]);

  useEffect(() => {
    setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    })();
  }, [confid, templateid]);

  const pageTitle = data?.pageTitle || "";

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar — sticky via its own component */}
      <Navbar />

      {/* ── Blue hero header ── */}
      <div className="relative w-full overflow-hidden" style={{ minHeight: "200px" }}>
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #0a0f1e 0%, #0f172a 35%, #1e3a8a 75%, #1d4ed8 100%)",
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

        {/* Decorative right glow */}
        <div
          className="absolute top-0 right-0 w-72 h-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at right center, rgba(96,165,250,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-white to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 text-blue-700/50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-blue-200/80 text-xs font-medium truncate max-w-[200px]">
              {isLoading ? "Loading…" : pageTitle}
            </span>
          </motion.div>

          {/* Title */}
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
              <span dangerouslySetInnerHTML={{ __html: pageTitle }} />
            )}
          </motion.h1>

          {/* Accent underline */}
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

      {/* ── Content ── */}
      <main className="min-h-[40vh] bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          {isLoading ? (
            <div className="space-y-4 animate-pulse">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="h-4 bg-blue-50 rounded"
                  style={{ width: `${65 + Math.random() * 35}%` }}
                />
              ))}
            </div>
          ) : data ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="prose prose-sm sm:prose-base lg:prose-lg max-w-none
                         prose-headings:text-slate-800 prose-headings:font-poppins
                         prose-p:text-slate-600 prose-p:leading-relaxed
                         prose-a:text-blue-600 prose-a:no-underline hover:prose-a:text-blue-700
                         prose-strong:text-slate-800
                         prose-li:text-slate-600
                         prose-table:border-blue-100
                         prose-th:bg-blue-50 prose-th:text-blue-800
                         prose-td:border-blue-50"
              dangerouslySetInnerHTML={{ __html: data.description }}
            />
          ) : (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <p className="text-slate-400 text-sm">Content not available.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CommonTemplate;
