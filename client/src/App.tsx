import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import MedicalServices from "./components/MedicalServices/MedicalServices";
import ActivityLog from "./components/ActivityLog/ActivityLog";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard.tsx";
import AppointmentsPage from "./components/AppointmentsPage/AppointmentsPage.tsx";
import NotificationsPage from "./components/NotificationsPage/NotificationsPage.tsx";
import HelpPage from "./components/HelpPage/HelpPage.tsx";
import DoctorProfilePage from "./components/DoctorProfilePage/DoctorProfilePage";
import LoginPage from "./components/LoginPage/LoginPage";
import NewsPage from "./components/NewsPage/NewsPage";
import ContactPage from "./components/ContactPage/ContactPage";
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/services" element={<MedicalServices />} />
                <Route path="/activity" element={<ActivityLog />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/appointments" element={<AppointmentsPage />} />
                <Route path="/notifications" element={<NotificationsPage />} />
                <Route path="/help" element={<HelpPage />} />
                <Route path="/DoctorProfilePage" element={<DoctorProfilePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/news" element={<NewsPage />} />
                <Route path="/contact" element={<ContactPage />} />
            </Routes>
        </Router>
    );
}

export default App;