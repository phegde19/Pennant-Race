export default function StandingsTable({
    teams,
  }) {
    const sorted =
      [...teams].sort(
        (a, b) =>
          b.projectedWins - a.projectedWins
      );
  
    return (
      <div className="table-container">
        <h2>Projected Standings</h2>
  
        <table>
          <thead>
            <tr>
              <th>Team</th>
              <th>Current</th>
              <th>Win %</th>
              <th>Projected</th>
            </tr>
          </thead>
  
          <tbody>
            {sorted.map(team => (
              <tr key={team.name}>
                <td>{team.name}</td>
  
                <td>
                  {team.wins}-{team.losses}
                </td>
  
                <td>
                  {team.winPct.toFixed(3)}
                </td>
  
                <td>
                  {Math.round(
                    team.projectedWins
                  )}
                  -
                  {Math.round(
                    team.projectedLosses
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }