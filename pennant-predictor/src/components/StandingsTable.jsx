export default function StandingsTable({ teams }) {
    const rows = teams.map(team => {
      const winPct =
        team.wins / (team.wins + team.losses);
  
      const gamesRemaining =
        162 - (team.wins + team.losses);
  
      const projectedWins =
        team.wins + gamesRemaining * winPct;
  
      const projectedLosses =
        162 - projectedWins;
  
      return {
        ...team,
        winPct,
        projectedWins,
        projectedLosses
      };
    });
  
    return (
      <table>
        <thead>
          <tr>
            <th>Team</th>
            <th>Record</th>
            <th>Win %</th>
            <th>Projected</th>
          </tr>
        </thead>
  
        <tbody>
          {rows.map(team => (
            <tr key={team.name}>
              <td>{team.name}</td>
  
              <td>
                {team.wins}-{team.losses}
              </td>
  
              <td>
                {team.winPct.toFixed(3)}
              </td>
  
              <td>
                {Math.round(team.projectedWins)}-
                {Math.round(team.projectedLosses)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }