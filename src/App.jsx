import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import CommonNews from "./pages/CommonNews";
import './App.css'

import CommonTemplate from "./pages/CommonTemplate";
import Speaker1 from "./pages/Speaker1";
import Speaker2 from "./pages/Speaker2";
import Speaker3 from "./pages/Speaker3";
import Speaker4 from "./pages/Speaker4";
import Speaker5 from "./pages/Speaker5";
import DateDesigns from "./pages/DateDesigns";

function App() {
   const confid="69cc7e04993a5edc16baf0a3";
  return (
    <>

<div id="content ">
      < Routes >
      {/* https://xceed.nitj.ac.in/conferencemodule/commontemplate/671fb502dbcf15e8ac081476 */}
      
        <Route path="/" element={<Home confId={confid} />} />
        {/* <Route path="localcommittee" element={<CommontemplateCommittee pageid="682c2dbe4f0ddcc436b90e88" />} /> */}
        <Route path="news/:newsid" element={<CommonNews /> } />
        {/* <Route path="commontemplate" element={<IntCommittee />} /> */}

        {/* Speaker page designs — admin panel picks which one is "live" by
            pointing the nav link's URL at /speakers1 .. /speakers5 */}
        <Route path="/speakers1" element={<Speaker1 confid={confid} />} />
        <Route path="/speakers2" element={<Speaker2 confid={confid} />} />
        <Route path="/speakers3" element={<Speaker3 confid={confid} />} />
        <Route path="/speakers4" element={<Speaker4 confid={confid} />} />
        <Route path="/speakers5" element={<Speaker5 confid={confid} />} />

        {/* Preview of countdown / event-dates design variants (1-3 each) */}
        <Route path="/datedesigns" element={<DateDesigns confid={confid} />} />

        <Route path="/:templateid" element={<CommonTemplate confid={confid} />} />


      </Routes >
      </div>
    </>
  );
}

export default App;


