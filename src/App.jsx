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

        {/* Speaker page layout previews — pick one, then remove the rest */}
        <Route path="/speaker1" element={<Speaker1 confid={confid} />} />
        <Route path="/speaker2" element={<Speaker2 confid={confid} />} />
        <Route path="/speaker3" element={<Speaker3 confid={confid} />} />
        <Route path="/speaker4" element={<Speaker4 confid={confid} />} />
        <Route path="/speaker5" element={<Speaker5 confid={confid} />} />

        <Route path="/:templateid" element={<CommonTemplate confid={confid} />} />


      </Routes >
      </div>
    </>
  );
}

export default App;


