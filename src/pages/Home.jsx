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
import OrganizingHeads from "../components/OrganizingHeads";
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
      {/* Fixed Navigation */}
      <div className="sticky top-0 w-full z-50">
        <Navbar />
      </div>
      
      {/* Main Hero Slider - Keeping as is per user request */}
      <section className="relative">
        <Slider confid={props.confId} />
      </section>
      
      {/* About Conference */}
      <section className="px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <AboutConf confid={props.confId} />
        </div>
      </section>
      
      {/* Timeline */}
      <section className="px-3 md:px-6 lg:px-8 py-6 md:py-10 lg:py-14">
        <div className="max-w-7xl mx-auto">
          <Timeline confid={props.confId} />
        </div>
      </section>

      {/* Countdown Timers */}
      <section className="px-3 md:px-6 lg:px-8 py-6 md:py-10 lg:py-14">
        <div className="max-w-7xl mx-auto">
          <CountdownBox confid={props.confId}/>
        </div>
      </section>
      
      {/* About NITJ */}
      <section className="px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <AboutNITJ confid={props.confId} />
        </div>
      </section>
      
      
      
      {/* About Department */}
      <section className="px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <AboutDept confid={props.confId} />
        </div>
      </section>
      
      {/* Organizing Committee */}
      <section className="px-3 md:px-6 lg:px-8 py-6 md:py-10 lg:py-14">
        <div className="max-w-7xl mx-auto">
          <OrganizingHeads />
        </div>
      </section>
      <p> The Microsoft CMT service was used for managing the peer-reviewing process for this conference. This service was provided for free by Microsoft and they bore all expenses, including costs for Azure cloud services as well as for software development and support.</p>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
