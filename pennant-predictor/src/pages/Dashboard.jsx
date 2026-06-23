import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStandings } from "../services/mlbApi";

import PredictionCard from "../components/PredictionCard";
import WinsChart from "../components/WinsChart";
import StandingsView from "../components/StandingsView";

const divisionNames = {
  201: "AL East",
  202: "AL Central",
  200: "AL West",
  204: "NL East",
  205: "NL Central",
  203: "NL West"
};

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
            team.wins +
            gamesRemaining * winPct;

          return {
            id: team.team.id,
            name: team.team.name,

            wins: team.wins,
            losses: team.losses,

            pct: (
              team.wins /
              (team.wins + team.losses)
            ).toFixed(3),

            projectedWins:
              Math.round(projectedWins),

            projectedLosses:
              Math.round(
                162 - projectedWins
              ),

            winPct,

            division:
              divisionNames[
                record.division.id
              ],

            league:
              record.league.id === 103
                ? "AL"
                : "NL"
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

  const sorted = [...teams].sort(
    (a, b) =>
      b.projectedWins - a.projectedWins
  );

  const best = sorted[0];
  const worst =
    sorted[sorted.length - 1];

  return (
    <div className="container">
      <header className="hero">
        <h1>⚾ Pennant Predictor</h1>

        <p>
          Forecasting MLB's race to October
        </p>

        <Link
          to="/playoffs"
          className="playoff-button"
        >
          View Projected Playoffs
        </Link>
      </header>

      <div className="stats-grid">
        <PredictionCard
          title="Best Projection"
          value={`${best.name} ${best.projectedWins}-${best.projectedLosses}`}
        />

        <PredictionCard
          title="Worst Projection"
          value={`${worst.name} ${worst.projectedWins}-${worst.projectedLosses}`}
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

      <StandingsView teams={teams} />
    </div>
  );
}