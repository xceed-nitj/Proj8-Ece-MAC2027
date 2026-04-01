import { useEffect } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

function Registration() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    function InfoTable() {
        function Th(props) {
            return (
                <th colSpan={props.colSpan} rowSpan={props.rowSpan} 
                className='p-2 text-center border-black border text-[2.3vw] sm:text-base bg-[rgba(129,255,192,0.25)]'>
                    {props.children}
                </th>
            )
        }
        function Td(props) {
            return (
                <td className='p-2 text-center border-black border text-[2.3vw] sm:text-base'>
                    {props.children}
                </td>
            )
        }
        return (
            <div className='overflow-auto w-full m-auto'>
            <table>
                <tr> 
                    {/* top row */}
                    <Th rowSpan='2'></Th>
                    <Th rowSpan='2'>
                        Category of Delegates/Authors
                    </Th>
                        <Th colSpan='2'>Early Bird on or before 30th April, 2025</Th>
                        <Th colSpan='2'>Till 10th May, 2025</Th>
                        <Th colSpan='2'>Spot Registration</Th>

                </tr>
                <tr>
                        <Th>IEEE/IET Members</Th><Th>General</Th>
                        <Th>IEEE/IET Members</Th><Th>General</Th>
                        <Th>IEEE/IET Members</Th><Th>General</Th>
                </tr>
                <tr>
                    <Th></Th>
                    <Th colSpan='7'>Indian Authors & Delegates (in INR)</Th>
                </tr>
                <tr>
                    <Th rowSpan='3'>Authors</Th>
                    <Th>Full Time Students (UG & PG)*</Th>
                    <Td>4,500.00</Td>
                    <Td>5,000.00</Td>
                    <Td>5,000.00</Td>
                    <Td>5,500.00</Td>
                    <Td>5,500.00</Td>
                    <Td>6,000.00</Td>
                </tr>
                <tr>
                    <Th>Teachers / Research Scholars</Th>
                    <Td>5,000.00</Td>
                    <Td>5,500.00</Td>
                    <Td>5,500.00</Td>
                    <Td>6,000.00</Td>
                    <Td>6,000.00</Td>
                    <Td>6,500.00</Td>
                </tr>
                <tr>
                    <Th>Industry</Th>
                    <Td>6,000.00</Td>
                    <Td>6,500.00</Td>
                    <Td>6,500.00</Td>
                    <Td>7,000.00</Td>
                    <Td>7,500.00</Td>
                    <Td>8,000.00</Td>
                </tr>
                <tr>
                    <Th rowSpan='2'>Delegate</Th>
                    <Th>Student / Research Scholar</Th>
                    <Td>4,000.00</Td>
                    <Td>4,500.00</Td>
                    <Td>4,500.00</Td>
                    <Td>5,000.00</Td>
                    <Td>5,000.00</Td>
                    <Td>5,500.00</Td>
                </tr>
                <tr>
                    <Th>Academician / Industry</Th>
                    <Td>4,500.00</Td>
                    <Td>5,000.00</Td>
                    <Td>5,000.00</Td>
                    <Td>5,500.00</Td>
                    <Td>5,500.00</Td>
                    <Td>6,000.00</Td>
                </tr>
                <tr>
                    <Th></Th>
                    <Th colSpan='7'>Foreign Authors & Delegates (in USD $)</Th>
                </tr>
                <tr>
                    <Th rowSpan='3'>Authors</Th>
                    <Th>Full Time Students (UG & PG)*</Th>
                    <Td>150.00</Td>
                    <Td>200.00</Td>
                    <Td>200.00</Td>
                    <Td>250.00</Td>
                    <Td>250.00</Td>
                    <Td>300.00</Td>
                </tr>
                <tr>
                    <Th>Teachers / Research Scholars</Th>
                    <Td>200.00</Td>
                    <Td>250.00</Td>
                    <Td>250.00</Td>
                    <Td>300.00</Td>
                    <Td>350.00</Td>
                    <Td>400.00</Td>
                </tr>
                <tr>
                    <Th>Industry</Th>
                    <Td>350.00</Td>
                    <Td>400.00</Td>
                    <Td>400.00</Td>
                    <Td>500.00</Td>
                    <Td>550.00</Td>
                    <Td>600.00</Td>
                </tr>
            </table>
            </div>
        )
    }

    return (
        <>
            <div className="fixed top-0 w-screen z-40">
                <Navbar />
            </div>
            <div className="container max-w-7xl mx-auto px-5 sm:px-10 lg:px-8 mt-[58px] lg:mt-[70px] min-h-[300px] mb-5 flex justify-center items-center">
                <div className="w-full mx-auto md:w-[700px] px-4 lg:w-full">
                    <p className="text-2xl font-sans font-bold mb-5 text-gray-950 underline">
                        Paper Registration Fee
                    </p>
                    {/* <p className="text-base text-left font-sans font-base text-gray-800">
                        <img src="/fee.png" alt="Registration Fee Table" style={{ width: '500px', height: '400px' }} />
                    </p> */}
                    <InfoTable/>

<p>Kindly note that extra 18% GST would be applicable on all categories of registration i.e. the above mentioned amount is without GST</p>

                    <p className="text-2xl mt-10 font-sans font-bold mb-5 text-gray-950 underline">
                        Poster Publication Registration Fee
                    </p>


                    <p>
                        Poster Publication Registration Fee IEEE members Rs. 2000/ and Non-IEEE members Rs. 2500/-. Accepted posters abstract will publish in EAIC2025 abstract book.
                    </p>
<p>Kindly note that extra 18% GST would be applicable on all categories of registration i.e. the above mentioned amount is without GST</p>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Registration;
