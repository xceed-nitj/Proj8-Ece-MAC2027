import { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import axios from "axios";
import getEnvironment from "../../getenvironment";

function RegistrationFee(props) {
    const confid = props.confid;
    const [data, setData] = useState(null);
    const [apiUrl, setApiUrl] = useState(null);

    useEffect(() => {
        getEnvironment().then(url => setApiUrl(url));
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (apiUrl) {
            axios.get(`${apiUrl}/conferencemodule/commontemplate/conference/${confid}`, {
                withCredentials: true
            })
                .then(res => {
                    setData(res.data);
                    console.log(res.data);
                })
                .catch(err => console.log(err));
        }
    }, [apiUrl, confid]);

    return (
        <div className="bg-white min-h-screen relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 pointer-events-none opacity-10">
                <div className="absolute w-[800px] h-[800px] border border-[#2563eb]/10 rounded-full -right-1/4 top-1/4 transform -translate-y-1/2"></div>
                <div className="absolute w-[500px] h-[500px] border border-[#2563eb]/15 rounded-full -left-1/4 bottom-1/4"></div>
                <div className="absolute w-3 h-3 bg-[#2563eb] rounded-full left-[10%] top-[20%] animate-pulse"></div>
                <div className="absolute w-2 h-2 bg-[#2563eb] rounded-full right-[15%] bottom-[30%] animate-pulse"></div>
            </div>

            <div className="top-0 w-screen z-40">
                <Navbar />
            </div>

            <div className="pt-[166px] container max-w-7xl mx-auto px-5 sm:px-10 lg:px-8 pt-[80px] lg:pt-[100px] pb-16 relative z-10">
                <div className="bg-white border border-[#2563eb]/30 rounded-xl p-6 md:p-8 shadow-lg shadow-[#2563eb]/10 backdrop-blur-sm">
                    <h1 className="text-4xl font-bold mb-4">
                        {data ? (
                            <div className="text-gray-700 prose max-w-none">
                                <div dangerouslySetInnerHTML={{ __html: data[0].pageTitle }} />
                            </div>
                        ) : (
                            <div className="animate-pulse">
                                <div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
                                <div className="h-4 bg-gray-700 rounded w-1/2 mb-4"></div>
                            </div>
                        )}
                    </h1>

                    <div className="w-40 h-1 bg-blue-600 mb-4"></div>

                    {data ? (
                        <div className="text-black-700 prose max-w-none">
                            <div className="overflow-x-auto">
                                <div dangerouslySetInnerHTML={{ __html: data[0].description }} />
                            </div>
                        </div>
                    ) : (
                        <div className="animate-pulse">
                            <div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
                            <div className="h-4 bg-gray-700 rounded w-1/2 mb-4"></div>
                            <div className="h-4 bg-gray-700 rounded w-5/6 mb-4"></div>
                            <div className="h-4 bg-gray-700 rounded w-2/3 mb-4"></div>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default RegistrationFee;