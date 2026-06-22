export default function StandingsTable({ teams }) {
  const sorted = [...teams].sort(
    (a, b) => b.projectedWins - a.projectedWins
  );

  return (
    <div className="table-container">
      <h2>Projected Standings</h2>

      <table className="standings-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Team</th>
            <th>Current</th>
            <th>Win %</th>
            <th>Projected</th>
          </tr>
        </thead>

        <tbody>
          {sorted.map((team, index) => {
            const projectedWins =
              Math.round(team.projectedWins);

            const projectedLosses =
              Math.round(team.projectedLosses);

            return (
              <tr key={team.id}>
                <td>{index + 1}</td>

                <td>
                  <div className="team-cell">
                    <img
                      src={`https://www.mlbstatic.com/team-logos/${team.id}.svg`}
                      alt={team.name}
                      className="team-logo"
                    />

                    <span>{team.name}</span>
                  </div>
                </td>

                <td>
                  {team.wins}-{team.losses}
                </td>

                <td>
                  {team.winPct.toFixed(3)}
                </td>

                <td
                  className={
                    projectedWins >= 90
                      ? "good"
                      : projectedWins <= 70
                      ? "bad"
                      : ""
                  }
                >
                  {projectedWins}-{projectedLosses}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}