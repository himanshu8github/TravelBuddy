import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Signup from './pages/Signup'
import Login from './pages/Login'
import Explore from "./pages/Explore";
import Destination from "./pages/Destination";
import Dashboard from './pages/Dashboard';
import Itenary from "./pages/Itenary";
import AiPlanner from "./pages/AiPlanner";
import History from './pages/History';
import PaidPlans from "./components/PaidPlans";
import ExpenseTracker from "./pages/ExpenseTracker";
import Payment from "./pages/Payment"
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import useSyncAuth from './hooks/auth.hook.js';


function App() {
  useSyncAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
       
        <Route path="/explore" element={<Explore />} />
               <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
        <Route path="/destination/:id" element={<Destination />} />
           <Route path="/dashboard" element={<Dashboard />} />
                   <Route path="/paidplans" element={<PaidPlans />} />
           <Route path="/itenary" element={<Itenary />} />
            <Route path="/aiplanner" element={<AiPlanner />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/history" element={<History />}/>
               <Route path="/expense" element={<ExpenseTracker />}/>
                 <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
<Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
