import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import CommonNews from "./pages/CommonNews";
import './App.css'

import CommonTemplate from "./pages/CommonTemplate";

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
        <Route path="/:templateid" element={<CommonTemplate confid={confid} />} />


      </Routes >
      </div>
    </>
  );
}

export default App;


