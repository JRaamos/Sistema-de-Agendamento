import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Agendamentos from "./pages/Agendamentos";
import AgendamentosProvider from "./context/AgendamentosProvider";
import { useEffect } from "react";
import DateRenderer from "./components/testenado";

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
          <Route path="/test" element={<DateRenderer />} />
        </Routes>
      </AgendamentosProvider>
    </div>
  );
}

export default App;
