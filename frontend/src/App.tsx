<<<<<<< HEAD
import './App.css'
import LandingPage from './pages/LandingPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>} />
      </Routes>
    </BrowserRouter>
  )
=======
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ExplorePage from "./pages/ExplorePage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ToiletDetails from "./pages/ToiletDetailsPage";

const App = () => {
return (
  <BrowserRouter>
  <Routes>
    <Route path="/explore" element={<ExplorePage />} />
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/toiletdeets" element={<ToiletDetails />} />
  </Routes>
</BrowserRouter>
)
>>>>>>> 1002551502a43dca0a473d8c82a9795ccb20030c
}

export default App;
