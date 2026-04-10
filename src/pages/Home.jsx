import Timeline from "../components/Timeline";
// import OurEvents from "../components/OurEvents";
// import HeroSection from "../components/HeroSection";
// import Speakers from "../components/SpeakerSection/Speakers";
import Footer from "../components/Footer";
import AboutNITJ from "../components/AboutNITJ";
// import AboutNews from "../components/AboutNews";
import CountdownBox from "../components/timer.jsx";
import AboutDept from "../components/AboutDept.jsx";
// import SponsorShip from "../components/Sponsorship";
import { useEffect } from "react";
// import Hero2 from "../components/Hero2";
import Slider from "../components/Slider";
// import Hero2 from "../components/Hero2";
// import SecNavbar from "../components/SecNavbar";
import Navbar from "../components/Navbar";
// import Speaker from "../components/Speaker";
// import InvitedSpeaker from "../components/InvitedSpeaker";
// import VideoGallery from "../components/VideoGallery";
// import DriveLinks from "../components/Drivelink";
// import OrganizingHeads from "../components/OrganizingHeads";
import AboutConf from "../components/Aboutconf.jsx";
// import AboutNews from "./components/Dummy";

function Home(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // const ourspeakersRef = useRef(null);
  // const invitedspeakersRef = useRef(null);

  // Step 2: Define the scroll function
  // const scrollToSection = (section) => {
    
  //   if(section=='ourspeakers'){
  //     ourspeakersRef.current?.scrollIntoView({
  //       behavior: 'smooth',
  //       block: 'start',
  //     });
  //   }else if(section=='invitedspeakers'){
  //     invitedspeakersRef.current?.scrollIntoView({
  //       behavior: 'smooth',
  //       block: 'start',
  //     });
  //   }
    
  // };
  return (
    <div className="bg-white overflow-x-hidden">
      {/* Navigation — Navbar has its own sticky positioning */}
      <Navbar />

      {/* Hero Slider */}
      <Slider confid={props.confId} />

      {/* About Conference — white bg */}
      <section className="py-0">
        <AboutConf confid={props.confId} />
      </section>

      {/* Timeline — light blue tint bg handled inside component */}
      <Timeline confid={props.confId} />

     

      {/* About NITJ — subtle blue tint */}
      <section className="bg-gradient-to-b from-blue-50/40 to-white">
        <AboutNITJ confid={props.confId} />
      </section>

       {/* Countdown Timers — gradient bg handled inside component */}
      <CountdownBox confid={props.confId} />

      {/* About Department — white */}
      <section className="bg-white">
        <AboutDept confid={props.confId} />
      </section>

      {/* Organizing Committee — white */}
  

      {/* Microsoft CMT notice */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <p className="text-xs text-slate-400 text-center leading-relaxed">
          The Microsoft CMT service was used for managing the peer-reviewing process for this
          conference. This service was provided for free by Microsoft and they bore all expenses,
          including costs for Azure cloud services as well as for software development and support.
        </p>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
