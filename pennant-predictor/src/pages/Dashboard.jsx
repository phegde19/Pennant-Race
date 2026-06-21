import { useEffect, useState } from "react";
import { getStandings } from "../services/mlbApi";

import StandingsTable from "../components/StandingsTable";
import PredictionCard from "../components/PredictionCard";
import WinsChart from "../components/WinsChart";

export default function Dashboard() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    async function loadData() {
      const records = await getStandings();

      const allTeams = records.flatMap(record =>
        record.teamRecords.map(team => {
          const winPct =
            team.wins / (team.wins + team.losses);

          const gamesRemaining =
            162 - (team.wins + team.losses);

          const projectedWins =
            team.wins + gamesRemaining * winPct;

          return {
            name: team.team.name,
            wins: team.wins,
            losses: team.losses,
            winPct,
            projectedWins,
            projectedLosses:
              162 - projectedWins
          };
        })
      );

      setTeams(allTeams);
    }

    loadData();
  }, []);

  if (!teams.length) {
    return <h2>Loading...</h2>;
  }

  const sorted =
    [...teams].sort(
      (a, b) =>
        b.projectedWins - a.projectedWins
    );

  const best = sorted[0];
  const worst = sorted[sorted.length - 1];

  return (
    <div className="container">
      <header className="hero">
        <h1>⚾ Pennant Predictor</h1>

        <p>
          Forecasting MLB's race to October
        </p>
      </header>

      <div className="stats-grid">
        <PredictionCard
          title="Best Projection"
          value={`${best.name} ${Math.round(
            best.projectedWins
          )}-${Math.round(
            best.projectedLosses
          )}`}
        />

        <PredictionCard
          title="Worst Projection"
          value={`${worst.name} ${Math.round(
            worst.projectedWins
          )}-${Math.round(
            worst.projectedLosses
          )}`}
        />

        <PredictionCard
          title="Teams"
          value={teams.length}
        />

        <PredictionCard
          title="Season Length"
          value="162 Games"
        />
      </div>

      <WinsChart teams={teams} />

      <StandingsTable teams={teams} />
    </div>
  );
}