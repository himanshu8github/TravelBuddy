import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Destination from "./pages/Destination";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/explore" element={<Explore />} /> */}
        <Route path="/destination/:id" element={<Destination />} />
      </Routes>
    </Router>
  );
}

export default App;
