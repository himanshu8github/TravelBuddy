import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from './pages/Signup'
import Login from './pages/Login'
import Explore from "./pages/Explore";
import Destination from "./pages/Destination";
import Dashboard from './pages/Dashboard';
import Itenary from "./pages/Itenary";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
               <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
        <Route path="/destination/:id" element={<Destination />} />
           <Route path="/dashboard" element={<Dashboard />} />
           <Route path="/itenary" element={<Itenary />} />
      </Routes>
    </Router>
  );
}

export default App;
