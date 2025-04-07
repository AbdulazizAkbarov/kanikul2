import { Route, Routes } from "react-router";
import HomePage from "./HomePage";
import MahsulotlarPage from "./MahsulotlarPage";
import KategoriaPage from "./KategoriaPage";
import Mijozlar from "./Mijozlar";
import Bannerlar from "./Bannerlar";
import Buyurtmalar from "./Buyurtmalar";

function MainPage() {
  return (
    <div className="w-[800px]">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mahsulotlar" element={<MahsulotlarPage />} />
        <Route path="/kategoria" element={<KategoriaPage />} />
        <Route path="/mijozlar" element={<Mijozlar />} />
        <Route path="/bannerlar" element={<Bannerlar />} />
        <Route path="/buyurtmalar" element={<Buyurtmalar/>} />

      </Routes>
    </div>
  );
}

export default MainPage;
