import { useState } from "react";

export default function StandingsView({ teams }) {
  const [league, setLeague] = useState("AL");
  const [view, setView] = useState("regular");

  const filtered = teams.filter(
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

  const sortByRecord = (a, b) =>
    b.winPct - a.winPct;

  const divisionWinners =
    divisions.map(division =>
      [...filtered]
        .filter(
          team =>
            team.division === division
        )
        .sort(sortByRecord)[0]
    );

  const wildCardTeams =
    filtered
      .filter(
        team =>
          !divisionWinners.some(
            winner =>
              winner.id === team.id
          )
      )
      .sort(sortByRecord);

  const thirdWildCard =
    wildCardTeams[2];

  return (
    <div className="standings-view">

      <div className="tab-row">
        <button
          className={
            league === "AL"
              ? "active"
              : ""
          }
          onClick={() =>
            setLeague("AL")
          }
        >
          American League
        </button>

        <button
          className={
            league === "NL"
              ? "active"
              : ""
          }
          onClick={() =>
            setLeague("NL")
          }
        >
          National League
        </button>
      </div>

      <div className="tab-row">
        <button
          className={
            view === "regular"
              ? "active"
              : ""
          }
          onClick={() =>
            setView("regular")
          }
        >
          Regular Season
        </button>

        <button
          className={
            view === "wildcard"
              ? "active"
              : ""
          }
          onClick={() =>
            setView("wildcard")
          }
        >
          Wild Card
        </button>
      </div>

      {view === "regular" && (
        <div className="division-grid">
          {divisions.map(
            division => {
              const teamsInDivision =
                filtered
                  .filter(
                    team =>
                      team.division ===
                      division
                  )
                  .sort(
                    sortByRecord
                  );

              const leader =
                teamsInDivision[0];

              return (
                <div
                  key={division}
                  className="division-card"
                >
                  <h2>{division}</h2>

                  <div className="division-header">
                    <span>Team</span>

                    <div className="stats-header">
                      <span>W</span>
                      <span>L</span>
                      <span>PCT</span>
                      <span>GB</span>
                      <span>PROJ</span>
                    </div>
                  </div>

                  {teamsInDivision.map(
                    team => {
                      const gb =
                        team.id ===
                        leader.id
                          ? "-"
                          : (
                              (
                                leader.wins -
                                team.wins +
                                team.losses -
                                leader.losses
                              ) /
                              2
                            ).toFixed(1);

                      return (
                        <div
                          key={team.id}
                          className="division-row"
                        >
                          <div className="division-team">
                            <img
                              src={`https://www.mlbstatic.com/team-logos/${team.id}.svg`}
                              alt={team.name}
                              className="team-logo"
                            />

                            <span>
                              {team.name}
                            </span>
                          </div>

                          <div className="team-stats">
                            <span>
                              {team.wins}
                            </span>

                            <span>
                              {team.losses}
                            </span>

                            <span>
                              {team.pct}
                            </span>

                            <span>
                              {gb}
                            </span>

                            <span className="proj">
                              {
                                team.projectedWins
                              }
                            </span>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              );
            }
          )}
        </div>
      )}

      {view === "wildcard" && (
        <div className="wildcard-grid">

          <div className="division-card">
            <h2>
              Division Leaders
            </h2>

            <div className="division-header">
              <span>Team</span>

              <div className="stats-header">
                <span>W</span>
                <span>L</span>
                <span>PCT</span>
                <span></span>
                <span>PROJ</span>
              </div>
            </div>

            {divisionWinners.map(
              team => (
                <div
                  key={team.id}
                  className="division-row"
                >
                  <div className="division-team">
                    <img
                      src={`https://www.mlbstatic.com/team-logos/${team.id}.svg`}
                      alt={team.name}
                      className="team-logo"
                    />

                    <span>
                      {team.name}
                    </span>
                  </div>

                  <div className="team-stats">
                    <span>
                      {team.wins}
                    </span>

                    <span>
                      {team.losses}
                    </span>

                    <span>
                      {team.pct}
                    </span>

                    <span></span>

                    <span className="proj">
                      {
                        team.projectedWins
                      }
                    </span>
                  </div>
                </div>
              )
            )}
          </div>

          <div className="division-card">
            <h2>
              Wild Card Race
            </h2>

            <div className="division-header">
              <span>Team</span>

              <div className="stats-header">
                <span>W</span>
                <span>L</span>
                <span>PCT</span>
                <span>WCGB</span>
                <span>PROJ</span>
              </div>
            </div>

            {wildCardTeams.map(
              (team, index) => {
                const wcgb =
                  team.id ===
                  thirdWildCard.id
                    ? "-"
                    : (() => {
                        const gb =
                          (
                            (
                              thirdWildCard.wins -
                              team.wins +
                              team.losses -
                              thirdWildCard.losses
                            ) /
                            2
                          );

                        if (gb < 0) {
                          return `+${Math.abs(
                            gb
                          ).toFixed(1)}`;
                        }

                        return gb.toFixed(1);
                      })();

                return (
                  <div
                    key={team.id}
                  >
                    {index === 3 && (
                      <div className="wildcard-cutoff" />
                    )}

                    <div className="division-row">
                      <div className="division-team">
                        <img
                          src={`https://www.mlbstatic.com/team-logos/${team.id}.svg`}
                          alt={team.name}
                          className="team-logo"
                        />

                        <span>
                          {team.name}
                        </span>
                      </div>

                      <div className="team-stats">
                        <span>
                          {team.wins}
                        </span>

                        <span>
                          {team.losses}
                        </span>

                        <span>
                          {team.pct}
                        </span>

                        <span>
                          {wcgb}
                        </span>

                        <span className="proj">
                          {
                            team.projectedWins
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>

        </div>
      )}
    </div>
  );
}