import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import './App.css';
import Kanbas from "./Kanbas";
import { Provider } from "react-redux";
import store from "./Kanbas/store";

export default function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="Kanbas" />} />
            <Route path="/Kanbas/*" element={<Kanbas />} />
          </Routes>
        </div>
      </HashRouter>
    </Provider>
  );
}
