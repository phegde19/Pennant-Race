export default function DivisionStandings({
    teams
  }) {
    const divisions = {};
  
    teams.forEach(team => {
      if (!divisions[team.division]) {
        divisions[team.division] = [];
      }
  
      divisions[team.division].push(team);
    });
  
    Object.keys(divisions).forEach(
      division => {
        divisions[division].sort(
          (a, b) =>
            b.projectedWins -
            a.projectedWins
        );
      }
    );
  
    return (
      <div className="division-grid">
        {Object.entries(divisions).map(
          ([division, teams]) => (
            <div
              key={division}
              className="division-card"
            >
              <h2>{division}</h2>
  
              {teams.map(team => (
                <div
                  key={team.id}
                  className="division-row"
                >
                  <div className="division-team">
                    <img
                      src={`https://www.mlbstatic.com/team-logos/${team.id}.svg`}
                      className="team-logo"
                      alt={team.name}
                    />
  
                    <button
                    className="team-link"
                    onClick={() =>
                      navigate(`/team/${team.id}`)
                    }
                  >
                    {team.name}
                  </button>
                  </div>
  
                  <span>
                    {Math.round(
                      team.projectedWins
                    )}
                    -
                    {Math.round(
                      team.projectedLosses
                    )}
                  </span>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    );
  }