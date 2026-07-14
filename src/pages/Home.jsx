import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import AboutConf from "../components/Aboutconf.jsx";
import Timeline from "../components/Timeline";
import AboutNITJ from "../components/AboutNITJ";
import CountdownBox from "../components/timer.jsx";
import AboutDept from "../components/AboutDept.jsx";
import Footer from "../components/Footer";
import getEnvironment from "../getenvironment";

// Default layout — used while loading fails or before anything is configured.
// Matches the current hardcoded page exactly (speakers/sponsors hidden).
const DEFAULT_SECTIONS = [
  { key: "slider", visible: true },
  { key: "aboutConf", visible: true },
  { key: "timeline", visible: true },
  { key: "aboutInstitute", visible: true },
  { key: "countdown", visible: true },
  { key: "aboutDept", visible: true },
  { key: "speakers", visible: false },
  { key: "sponsors", visible: false },
  { key: "cmtNotice", visible: true },
];

function Home(props) {
  const confId = props.confId;
  const [sections, setSections] = useState(DEFAULT_SECTIONS);
  const [loadingLayout, setLoadingLayout] = useState(true);
  const [apiUrl, setApiUrl] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getEnvironment().then((url) => setApiUrl(url));
  }, []);

  // Fetch the section order/visibility configured in the admin panel.
  useEffect(() => {
    if (!apiUrl || !confId) return;
    let cancelled = false;
    setLoadingLayout(true);
    axios
      .get(`${apiUrl}/conferencemodule/homelayout/public/${confId}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (cancelled) return;
        const data = res.data;
        if (Array.isArray(data.sections) && data.sections.length > 0) {
          setSections(data.sections); // already sorted by order on the server
        }
      })
      .catch((err) => {
        console.error("Home layout fetch failed, using default layout:", err);
      })
      .finally(() => {
        if (!cancelled) setLoadingLayout(false);
      });
    return () => { cancelled = true; };
  }, [apiUrl, confId]);

  // Map each admin-panel section key to its component/block.
  const SECTION_RENDERERS = {
    slider: () => <Slider confid={confId} />,
    aboutConf: () => (
      <section className="py-0">
        <AboutConf confid={confId} />
      </section>
    ),
    timeline: () => <Timeline confid={confId} />,
    aboutInstitute: () => (
      <section className="bg-gradient-to-b from-blue-50/40 to-white">
        <AboutNITJ confid={confId} />
      </section>
    ),
    countdown: () => <CountdownBox confid={confId} />,
    aboutDept: () => (
      <section className="bg-white">
        <AboutDept confid={confId} />
      </section>
    ),
    cmtNotice: () => (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <p className="text-xs text-slate-400 text-center leading-relaxed">
          The Microsoft CMT service was used for managing the peer-reviewing process for this
          conference. This service was provided for free by Microsoft and they bore all expenses,
          including costs for Azure cloud services as well as for software development and support.
        </p>
      </div>
    ),
  };

  return (
    <div className="bg-white overflow-x-hidden">
      {/* Navigation — always shown */}
      <Navbar confid={confId} />

      {/* Home sections, in the order configured from the admin panel */}
      {loadingLayout ? (
        // Loading state — lightweight skeleton blocks while layout is fetched
        <div className="animate-pulse space-y-6 py-8" aria-hidden="true">
          <div className="h-[420px] bg-slate-100" />
          <div className="max-w-7xl mx-auto px-4 space-y-4">
            <div className="h-6 w-1/3 bg-slate-100 rounded" />
            <div className="h-4 w-full bg-slate-100 rounded" />
            <div className="h-4 w-5/6 bg-slate-100 rounded" />
            <div className="h-4 w-2/3 bg-slate-100 rounded" />
          </div>
        </div>
      ) : (
        sections
          .filter((s) => s.visible)
          .map((s) => {
            const render = SECTION_RENDERERS[s.key];
            return render ? <div key={s.key}>{render()}</div> : null;
          })
      )}

      {/* Footer — always shown */}
      <Footer />
    </div>
  );
}

export default Home;
