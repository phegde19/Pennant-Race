import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStandings } from "../services/mlbApi";
import PlayoffTree from "../components/PlayoffTree";

const divisionNames = {
  201: "AL East",
  202: "AL Central",
  200: "AL West",
  204: "NL East",
  205: "NL Central",
  203: "NL West"
};

export default function PlayoffsPage() {
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

            projectedWins:
              Math.round(projectedWins),

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

  const buildLeague = league => {
    const filtered =
      teams.filter(
        team => team.league === league
      );

    const divisions =
      league === "AL"
        ? [
            "AL East",
            "AL Central",
            "AL West"
          ]
        : [
            "NL East",
            "NL Central",
            "NL West"
          ];

    const divisionWinners =
      divisions
        .map(division =>
          [...filtered]
            .filter(
              team =>
                team.division === division
            )
            .sort(
              (a, b) =>
                b.projectedWins -
                a.projectedWins
            )[0]
        )
        .sort(
          (a, b) =>
            b.projectedWins -
            a.projectedWins
        );

    const wildCards =
      filtered
        .filter(
          team =>
            !divisionWinners.some(
              winner =>
                winner.id === team.id
            )
        )
        .sort(
          (a, b) =>
            b.projectedWins -
            a.projectedWins
        )
        .slice(0, 3);

    return {
      seed1: divisionWinners[0],
      seed2: divisionWinners[1],
      seed3: divisionWinners[2],

      wc1: wildCards[0],
      wc2: wildCards[1],
      wc3: wildCards[2]
    };
  };

  const al = buildLeague("AL");
  const nl = buildLeague("NL");

  return (
    <div className="container">

      <Link
        to="/"
        className="back-link"
      >
        ← Back to Standings
      </Link>

      <h1>
        Projected Playoff Bracket
      </h1>

      <PlayoffTree
        al={al}
        nl={nl}
      />

    </div>
  );
}