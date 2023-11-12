import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Agendamentos from "./pages/Agendamentos";
import AgendamentosProvider from "./context/AgendamentosProvider";
import MeusAgendamentos from "./pages/MeusAgendamentos";
import Login from "./pages/Login";
import BarberDashboard from "./pages/BarberDashboard";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    requestNotificationPermission();
  }, []);
function requestNotificationPermission() {
  Notification.requestPermission()
    .then(function (status) {
      console.log("Notification permission status:", status);
    })
    .catch(function (error) {
      console.error("Notification permission request error:", error);
    });
}
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
