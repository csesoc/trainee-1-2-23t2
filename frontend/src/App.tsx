import { BrowserRouter, Route, Routes } from "react-router-dom";
import ExplorePage from "./pages/ExplorePage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ToiletDetails from "./pages/ToiletDetailsPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";

const App = () => {
return (
  <BrowserRouter>
  <Routes>
    <Route path="/explore" element={<ExplorePage />} />
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/toiletdeets/:id" element={<ToiletDetails />} />
    <Route path="/profile" element={<ProfilePage />} />
    <Route path="/settings" element={<SettingsPage />} />
  </Routes>
  </BrowserRouter>
)
}

export default App;
