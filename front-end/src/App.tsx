import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Agendamentos from "./pages/Agendamentos";
import AgendamentosProvider from "./context/AgendamentosProvider";
import MeusAgendamentos from "./pages/MeusAgendamentos";
import Login from "./pages/Login";
import BarberDashboard from "./pages/BarberDashboard";
import { useContext, useEffect } from "react";
import OneSignal from "react-onesignal";
import AgendamentosContext from "./context/AgendamentosContext";

function App() {
  const { setValues, values } = useContext(AgendamentosContext);
  useEffect(() => {
    OneSignal.init({
      appId: "2f865a87-c988-43e8-a60c-2138cc52199b",
    });
    OneSignal.User.PushSubscription.addEventListener(
      "change",
      (changeEvent) => {
        setValues({ ...values, deviceId: changeEvent.current.id });
      }
    );
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
