import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Agendamentos from "./pages/Agendamentos";
import AgendamentosProvider from "./context/AgendamentosProvider";
import Calendar from "./components/Calendario";
import { useEffect } from "react";
import AppointmentTimes from "./components/AppointmentTimes";

function App() {
  useEffect(() => {
    document.title = "Stylu's!";
  }, []);
  return (
    <div>
      <AgendamentosProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/agendamentos" element={<Agendamentos />} />
        </Routes>
      </AgendamentosProvider>
    </div>
  );
}

export default App;
