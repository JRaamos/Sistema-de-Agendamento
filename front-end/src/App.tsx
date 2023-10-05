import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Agendamentos from "./pages/Agendamentos";
import AgendamentosProvider from "./context/AgendamentosProvider";
import Calendar from "./components/Calendario";

function App() {
  return (
    <div>
      <AgendamentosProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/agendamentos" element={<Agendamentos />} />
          <Route path="/calendario" element={<Calendar />} />
        </Routes>
      </AgendamentosProvider>
    </div>
  );
}

export default App;
