import { BrowserRouter, Routes, Route } from "react-router-dom";
import PlayoffsPage from "./pages/PlayoffsPage";
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

        <Route
          path="/playoffs"
          element={<PlayoffsPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;