import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import './App.css';
import Labs from "./Labs";
import Kanbas from "./Kanbas";

export default function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="Labs" />} />
          <Route path="/Labs/*" element={<Labs />} />
          <Route path="/Kanbas/*" element={<Kanbas />} />
        </Routes>
      </div>
    </HashRouter>
  );
}
