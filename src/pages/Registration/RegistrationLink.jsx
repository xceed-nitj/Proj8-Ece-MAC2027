import { useEffect } from 'react';
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'

function RegistrationLink() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-white min-h-screen relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 pointer-events-none opacity-10">
                <div className="absolute w-[800px] h-[800px] border border-[#2563eb]/10 rounded-full -right-1/4 top-1/4 transform -translate-y-1/2"></div>
                <div className="absolute w-[500px] h-[500px] border border-[#2563eb]/15 rounded-full -left-1/4 bottom-1/4"></div>
                <div className="absolute w-3 h-3 bg-[#2563eb] rounded-full left-[10%] top-[20%] animate-pulse"></div>
                <div className="absolute w-2 h-2 bg-[#2563eb] rounded-full right-[15%] bottom-[30%] animate-pulse"></div>
            </div>

            <div className="sticky top-0 w-screen z-40">
                <Navbar />
            </div>

            <div className="pt-[166px] container max-w-7xl mx-auto px-5 sm:px-10 lg:px-8 pt-[80px] lg:pt-[100px] pb-16 relative z-10">
                <div className="bg-[white] border border-[#2563eb]/30 rounded-xl p-6 md:p-8 shadow-lg shadow-[#2563eb]/10 backdrop-blur-sm">
                    <h1 className="text-4xl font-bold text-[#2563eb] mb-4">
                        Registration
                    </h1>
                    {/* <div className="w-32 h-1 bg-gradient-to-r from-[#2563eb] to-transparent mb-8"></div> */}
                    <div className="w-40 h-1 bg-blue-600 mb-4"></div>

                    <div className="text-gray-700 prose prose-invert max-w-none">

                        <div className="flex flex-col items-center justify-center my-10">
                            <div className="relative group">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#2563eb] to-[#2563eb]/50 rounded-lg blur opacity-50  text-blue-900 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                                <a
                                    href="https://www.nitj.ac.in/events_registration/ic_amsdt_2025/login"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="relative flex text-blue-900 items-center justify-center px-8 py-4 bg-white border border-blue-900 shadow-lg rounded-lg leading-none font-medium hover:bg-blue-100 hover:text-white transition-colors duration-300"
                                >
                               
                                 
                                    Register for AMSDT-2025
                                </a>
                            </div>


                        </div>

                        {/* <div className="mt-8 p-4 bg-[#2563eb]/5 border-l-4 border-[#2563eb] rounded">
                            <p className="font-medium text-[#2563eb]">Important Note:</p>
                            <p className="mt-2">An additional late registration fee of Rs. 1000/- applies to all categories after registration deadline.</p>
                        </div> */}

                        {/* <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-5 bg-white border border-[#2563eb]/30 rounded-lg"> */}
                        <h3 className="text-xl font-bold text-[#2563eb] mb-3">Guidelines for Registration</h3>
                        <ul className="space-y-2 list-disc pl-5">
                            <ul className="space-y-2 list-disc pl-5">
                                <li>Selected abstract will be accepted for presentation. After the acceptance of the abstract, the authors are required to register for the conference by paying the registration fees.</li>
                                <li>Please pay the registration fee only through the payment portal provided on the conference website. No other means of fee payment will be accepted.</li>
                                <li>After the acceptance of the abstract for presentation, at least one of the authors of an accepted abstract must register for the conference in order to present it.</li>
                                <li>If more than one author of an accepted abstract wishes to attend the conference, they need to register separately.</li>
                                <li>Students are requested to upload their valid student ID cards (front and back sides) during the online registration process.</li>
                                <li>The registration fee includes the conference kit, access/admission to technical sessions, and all conference meals. Any gateway charges incurred will be borne by the registrant.</li>
                                <li>The registration fee is non-refundable and non-transferable.</li>
                                <li>Please keep a copy of the transaction receipt.</li>
                                <li>Please note that AMSDT-2025 will not be responsible for any loss, financial or otherwise, caused by improper transactions conducted online. While the organizers have taken all reasonable precautions to ensure a safe online transaction, it is the registrant’s responsibility to secure their user IDs, passwords, Paper ID, transaction ID, etc., when paying the registration fee.</li>
                            </ul>

                        </ul>
                    </div>
                </div>
                {/* </div>
                </div> */}

            </div>

            <Footer />
        </div>
    )
}

export default RegistrationLink
