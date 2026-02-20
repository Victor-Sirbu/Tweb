import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import ProfilePage from "./components/ProfilePage/ProfilePage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
        </Router>
    );
}

export default App;
