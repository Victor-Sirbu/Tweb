import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard.tsx";
import AppointmentsPage from "./components/AppointmentsPage/AppointmentsPage.tsx";
import NotificationsPage from "./components/NotificationsPage/NotificationsPage.tsx";
import HelpPage from "./components/HelpPage/HelpPage.tsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/appointments" element={<AppointmentsPage />} />
                <Route path="/notifications" element={<NotificationsPage />} />
                <Route path="/help" element={<HelpPage />} />
            </Routes>
        </Router>
    );
}

export default App;