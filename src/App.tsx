import { useState } from "react";
import "./App.css";
import Sidebar from "./Components/Sidebar";
import MainPage from "./Main/MainPage";
import useMyStor from "./Main/Store/Mystore";
import LoginPage from "./Main/Login";

function App() {
  const [collapsed, _] = useState(false);
  const state = useMyStor();
  return (
    <div className="h-full">
      {state.accessToken ? (
        <div className="h-full">
          <nav className="flex justify-between  py-2 px-6 bg-[#001529]">
            <h2 className="text-3xl font-bold pt-1 text-white">Logo</h2>
            <div>
              <h2 className="text-xl font-semibold text-white">Abdulaziz</h2>
              <h2 className="text-xl font-semibold text-white">Akbarov</h2>
            </div>
          </nav>
          <div className="flex  justify-start screen w-[1500px]">
            <Sidebar collapsed={collapsed} />

            <MainPage/>
          </div>
        </div>
      ) : (
        <LoginPage />
      )}
    </div>
  );
}

export default App;
