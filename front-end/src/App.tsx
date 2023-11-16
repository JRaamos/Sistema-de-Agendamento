import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Agendamentos from "./pages/Agendamentos";
import AgendamentosProvider from "./context/AgendamentosProvider";
import MeusAgendamentos from "./pages/MeusAgendamentos";
import Login from "./pages/Login";
import BarberDashboard from "./pages/BarberDashboard";
import OneSignal from "react-onesignal";
import { useEffect } from "react";

function App() {

  useEffect(() => {
    OneSignal.init({
      appId: "0e7089e8-60f2-480b-bafa-1173e57cac11",
      notifyButton: {
        enable: true,
      },
    });
  }, []);

  return (
    <div>
      <AgendamentosProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/agendamentos" element={<Agendamentos />} />
          <Route path="/meus-agendamentos" element={<MeusAgendamentos />} />
          <Route path="/login" element={<Login />} />
          <Route path="/barber-dashboard" element={<BarberDashboard />} />
        </Routes>
      </AgendamentosProvider>
    </div>
  );
}

export default App;
