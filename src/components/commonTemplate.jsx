import { useEffect,useState } from 'react';
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import SecNavbar from '../components/SecNavbar';
import axios from "axios";
import getEnvironment from "../getenvironment";

function IntCommittee(props) {
    const confid = props.confid;
  const [data, setData] = useState(null)

  const [apiUrl, setApiUrl] = useState(null);
    useEffect(() => {
        // Fetch the environment URL
        getEnvironment().then(url => setApiUrl(url));
    }, []);
    useEffect(() => {
      if (apiUrl) {

    window.scrollTo(0, 0);

  axios.get(`${apiUrl}/conferencemodule/commontemplate/conference/${confid}`, {
    withCredentials: true
  })
    .then(res => {
      setData(res.data[1]);
      console.log(res.data[1]);

    })
    .catch(err => console.log(err))
  }
}, [apiUrl, confid]);
   
    return (
        <><div className="fixed top-0 w-screen z-40 "> 
        <Navbar />      
        </div>
        <SecNavbar />
        <div className="container max-w-7xl mx-auto px-5 sm:px-10  lg:px-8 mt-[58px] min-h-[300px] lg:mt-[70px] mb-5">
                <div className="w-full mx-auto  md:w-[700px] px-4 lg:w-full" >
                    <p className="text-2xl font-sans font-bold mb-5  text-gray-950 underline ">
                        {data? data.pageTitle: "Loading.."}
                    </p>
                    <p className="text-base  text-justify font-sans font-base text-gray-800">
                      

                        {data? <div dangerouslySetInnerHTML={{__html:data.description}}/>: " "}
                    </p>

                </div>
            </div>
            <Footer />

        </>
    );
}

export default IntCommittee