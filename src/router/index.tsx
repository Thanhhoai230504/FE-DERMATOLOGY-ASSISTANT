import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ScrollToTop from "../components/loading/scollTop";
import PredictImage from "../page/uiPredictImage";
import MedicalChatbot from "../page/uiChatBot";
import DetectAnce from "../page/uiDetect_acne";
import HomePage from "../page/Home/HomePage";

const Routers = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/predictdisease" element={<PredictImage />} />
        <Route path="/chatBot" element={<MedicalChatbot />} />
        <Route path="/detectAnce" element={<DetectAnce />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default Routers;
