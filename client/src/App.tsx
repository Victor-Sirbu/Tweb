import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
import DoctorProfilePage from "./components/DoctorProfilePage/DoctorProfilePage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/doctor-profile" element={<DoctorProfilePage />} />
            </Routes>
        </Router>
    );
}

export default App;
