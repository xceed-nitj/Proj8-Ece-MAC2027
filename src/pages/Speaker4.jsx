import { useState, useEffect } from "react";
import axios from "axios";
import getEnvironment from "../getenvironment";
import { PageShell } from "./CommonTemplate";

// Resolve image links: uploads from the admin panel are absolute URLs, but
// hand-pasted relative paths (/uploads/...) must point at the API server,
// not this site's origin.
function resolveImgSrc(link, apiUrl) {
  if (!link) return "";
  if (/^https?:\/\//i.test(link)) return link;
  return `${apiUrl}${link.startsWith("/") ? "" : "/"}${link}`;
}

// Design 4 — minimal card with a small accent underline (same gradient
// stops as the hero header's accent underline, for visual consistency).
function SpeakerCard({ speaker, apiUrl }) {
  const [imgFailed, setImgFailed] = useState(false);
  const imgSrc = resolveImgSrc(speaker.ImgLink, apiUrl);

  const card = (
    <div className="w-full h-full bg-white border border-blue-100 hover:border-blue-300 rounded-xl p-5 flex flex-col items-center justify-center text-center min-h-[287px] transition-colors duration-200">
      {imgSrc && !imgFailed ? (
        <img
          src={imgSrc}
          alt={speaker.Name}
          className="w-24 h-24 rounded-lg object-cover mb-3"
          onError={() => setImgFailed(true)}
        />
      ) : (
        <div className="w-24 h-24 rounded-lg bg-blue-50 text-blue-400 flex items-center justify-center mb-3 text-3xl font-bold font-poppins">
          {(speaker.Name || "?").trim().charAt(0).toUpperCase()}
        </div>
      )}
      <p className="font-poppins text-[15px] font-bold text-slate-800">{speaker.Name}</p>
      {speaker.Designation && <p className="font-sans text-[11px] text-slate-500 mt-0.5">{speaker.Designation}</p>}
      <div className="mt-3 h-1 w-10 rounded-full" style={{ background: "linear-gradient(90deg, #60a5fa, #93c5fd)" }} />
      <p className="font-sans text-[11px] font-semibold text-blue-600 mt-3">{speaker.Institute}</p>
    </div>
  );

  return speaker.ProfileLink ? (
    <a href={speaker.ProfileLink} target="_blank" rel="noopener noreferrer" className="block h-full">
      {card}
    </a>
  ) : (
    card
  );
}

function Speaker4(props) {
  const confid = props.confid;
  const [speakers, setSpeakers] = useState([]);
  const [invitedSpeakers, setInvitedSpeakers] = useState([]);
  const [apiUrl, setApiUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showInvited, setShowInvited] = useState(false);

  useEffect(() => {
    getEnvironment()
      .then((url) => setApiUrl(url))
      .catch((err) => console.error("Error fetching environment:", err));
  }, []);

  useEffect(() => {
    if (!apiUrl || !confid) return;
    setLoading(true);
    axios
      .get(`${apiUrl}/conferencemodule/speakers/conference/${confid}`, {
        withCredentials: true,
      })
      .then((res) => {
        const all = Array.isArray(res.data) ? res.data : [];
        const visible = all.filter((s) => s.feature !== false);
        const bySequence = (a, b) => (a.sequence ?? 999) - (b.sequence ?? 999);
        const isInvited = (s) => String(s.TalkType ?? "").trim() === "1";

        setSpeakers(visible.filter((s) => !isInvited(s)).sort(bySequence));
        setInvitedSpeakers(visible.filter(isInvited).sort(bySequence));
      })
      .catch((err) => console.error("Error fetching speakers:", err))
      .finally(() => setLoading(false));
  }, [apiUrl, confid]);

  const activeList = showInvited ? invitedSpeakers : speakers;
  const pageTitle = showInvited ? "Invited Speakers" : "Our Speakers";

  return (
    <PageShell confid={confid} title={pageTitle} breadcrumbLabel="Speakers" maxWidth="max-w-7xl">
      {invitedSpeakers.length > 0 && (
        <div className="flex justify-center gap-3 mb-8">
          <button
            onClick={() => setShowInvited(false)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
              !showInvited ? "bg-blue-600 text-white shadow-sm" : "bg-blue-50 text-blue-700 hover:bg-blue-100"
            }`}
          >
            Our Speakers
          </button>
          <button
            onClick={() => setShowInvited(true)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
              showInvited ? "bg-blue-600 text-white shadow-sm" : "bg-blue-50 text-blue-700 hover:bg-blue-100"
            }`}
          >
            Invited Speakers
          </button>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="w-full bg-white rounded-xl border border-blue-100 flex flex-col items-center justify-center p-5 min-h-[287px]"
            >
              <div className="w-24 h-24 rounded-lg bg-blue-50 mb-3" />
              <div className="h-4 w-24 bg-blue-50 rounded mb-2" />
              <div className="h-3 w-16 bg-blue-50 rounded" />
            </div>
          ))}
        </div>
      ) : activeList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {activeList.map((speaker) => (
            <SpeakerCard key={speaker._id} speaker={speaker} apiUrl={apiUrl} />
          ))}
        </div>
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
          <p className="text-slate-400 text-sm">Speaker details will be announced soon.</p>
        </div>
      )}
    </PageShell>
  );
}

export default Speaker4;
