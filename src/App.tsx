import { useState } from "react";
import "./App.css";
import Sidebar from "./Components/Sidebar";
import MainPage from "./Main/MainPage";
import useMyStor from "./Main/Store/Mystore";
import LoginPage from "./Main/Login";

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const state = useMyStor();
  return (
    <div>
      {state.accessToken ? (
        <div className="h-full">
          <nav className="flex justify-between  py-2 px-6 bg-[#324861]">
            <h2 className="text-3xl font-bold pt-1">Logo</h2>
            <div>
              <h2 className="text-xl font-semibold">Abdulaziz</h2>
              <h2 className="text-xl font-semibold">Akbarov</h2>
            </div>
          </nav>
          <div className="flex justify-start h-full w-[1500px]">
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

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
