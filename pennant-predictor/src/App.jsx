import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import TeamPage from "./pages/TeamPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/team/:teamId"
          element={<TeamPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;