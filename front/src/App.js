import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./layout/footer/Footer";
import TravelHeader from "./layout/header/TravelHeader";
import CalendarPage from "./pages/CalendarPage";
import HomePage from "./pages/HomePage";
import LocalBoard from "./pages/LocalBoard";
import SignUpFormPage from "./pages/SignUpFormPage";
import PasswordResetPage from "./pages/PasswordResetPage";
import PersonalPage from "./pages/PersonalPage";
import EditProfilePage from "./pages/EditProfilePage";
import LoginFormPage from "./pages/LoginFormPage";
import PostPage from "./pages/PostPage";
import RankingPage from "./pages/RankingPage";
import ShopPage from "./pages/ShopPage";
import ShopPurchase from "./pages/ShopPurchase";
import TravelWritePage from "./pages/TravelWritePage";


function Header() {
  return <TravelHeader />;
}

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/localboard" element={<LocalBoard />} />
        <Route path="/SignUpFormPage" element={<SignUpFormPage />} />
        <Route path="/PasswordResetPage" element={<PasswordResetPage />} />
        <Route path="/personal" element={<PersonalPage />} />
        <Route path="/EditProfilePage" element={<EditProfilePage />} />
        <Route path="/LoginFormPage" element={<LoginFormPage />} />
        <Route path="/TravelWritePage" element={<TravelWritePage />} />
        <Route path="/ranking" element={<RankingPage />} /> 
        <Route path="/postpage" element={<PostPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/purchase" element={<ShopPurchase />} />
        
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
