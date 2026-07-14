import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Timeline from "../components/Timeline";
import CountdownBox from "../components/timer.jsx";

// Preview page for the countdown / event-dates design variants. The live home
// page picks a design via the homelayout section's `design` field (1..3) set
// in the admin panel; this page just shows every variant so you can choose.
function DesignLabel({ children }) {
  return (
    <div className="bg-slate-900 text-white text-sm font-semibold px-4 sm:px-8 py-2.5 sticky top-0 z-30">
      {children}
    </div>
  );
}

function DateDesigns({ confid }) {
  return (
    <div className="bg-white min-h-screen">
      <Navbar confid={confid} />

      {[1, 2, 3].map((d) => (
        <div key={`countdown-${d}`}>
          <DesignLabel>Countdown — design {d}</DesignLabel>
          <CountdownBox confid={confid} design={d} />
        </div>
      ))}

      {[1, 2, 3].map((d) => (
        <div key={`timeline-${d}`}>
          <DesignLabel>Event dates (timeline) — design {d}</DesignLabel>
          <Timeline confid={confid} design={d} />
        </div>
      ))}

      <Footer />
    </div>
  );
}

export default DateDesigns;
