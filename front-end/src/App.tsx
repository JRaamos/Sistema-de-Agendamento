import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Schedule from "./pages/Schedules";
import AgendamentosProvider from "./context/AgendamentosProvider";
import MiSchedules from "./pages/MySchedules";
import Login from "./pages/Login";
import BarberDashboard from "./pages/BarberDashboard";

function App() {
  

  return (
    <div>
      <AgendamentosProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/schedules" element={<Schedule />} />
          <Route path="/mi-schedules" element={<MiSchedules />} />
          <Route path="/login" element={<Login />} />
          <Route path="/barber-dashboard" element={<BarberDashboard />} />
        </Routes>
      </AgendamentosProvider>
    </div>
  );
}

export default App;
