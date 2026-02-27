import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import MedicalServices from "./components/MedicalServices/MedicalServices";
import ActivityLog from "./components/ActivityLog/ActivityLog";
import DoctorProfilePage from "./components/DoctorProfilePage/DoctorProfilePage";
import LoginPage from "./components/LoginPage/LoginPage";
import NewsPage from "./components/NewsPage/NewsPage";
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/services" element={<MedicalServices />} />
                <Route path="/activity" element={<ActivityLog />} />
                <Route path="/DoctorProfilePage" element={<DoctorProfilePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/news" element={<NewsPage />} />
            </Routes>
        </Router>
    );
}

export default App;
