import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard.tsx";
import AppointmentsPage from "./components/AppointmentsPage/AppointmentsPage.tsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/appointments" element={<AppointmentsPage />} />
            </Routes>
        </Router>
    );
}

export default App;