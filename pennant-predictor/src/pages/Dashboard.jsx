import { useEffect, useState } from "react";
import { getStandings } from "../services/mlbApi";
import StandingsTable from "../components/StandingsTable";

export default function Dashboard() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    async function loadData() {
      const records = await getStandings();

      const allTeams = records.flatMap(record =>
        record.teamRecords.map(team => ({
          name: team.team.name,
          wins: team.wins,
          losses: team.losses
        }))
      );

      setTeams(allTeams);
    }

    loadData();
  }, []);

  return (
    <div>
      <h1>Pennant Predictor</h1>

      <StandingsTable teams={teams} />
    </div>
  );
}