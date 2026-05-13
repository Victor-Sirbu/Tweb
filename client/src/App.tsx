import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import MedicalServices from "./components/MedicalServices/MedicalServices";
import ActivityLog from "./components/ActivityLog/ActivityLog";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard.tsx";
import AppointmentsPage from "./components/AppointmentsPage/AppointmentsPage.tsx";
import NotificationsPage from "./components/NotificationsPage/NotificationsPage.tsx";
import HelpPage from "./components/HelpPage/HelpPage.tsx";
import LoginPage from "./components/LoginPage/LoginPage";
import NewsPage from "./components/NewsPage/NewsPage";
import ContactPage from "./components/ContactPage/ContactPage";
import { AuthProvider } from "./context/AuthContext";
import { LanguageProvider } from "./context/LanguageContext";
import { NotificationProvider } from "./context/NotificationContext";
import { AuditProvider } from "./context/AuditContext";
import PrivateRoute from "./shared/PrivateRoute";
import AdminRoute from "./shared/AdminRoute";

function App() {
    return (
        <AuditProvider>
            <LanguageProvider>
                <AuthProvider>
                    <NotificationProvider>
                        <Router>
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/services" element={<MedicalServices />} />
                                <Route path="/help" element={<HelpPage />} />
                                <Route path="/news" element={<NewsPage />} />
                                <Route path="/contact" element={<ContactPage />} />
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
                                <Route path="/appointments" element={<PrivateRoute><AppointmentsPage /></PrivateRoute>} />
                                <Route path="/notifications" element={<PrivateRoute><NotificationsPage /></PrivateRoute>} />
                                <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                                <Route path="/activity" element={<AdminRoute><ActivityLog /></AdminRoute>} />
                            </Routes>
                        </Router>
                    </NotificationProvider>
                </AuthProvider>
            </LanguageProvider>
        </AuditProvider>
    );
}

export default App;
