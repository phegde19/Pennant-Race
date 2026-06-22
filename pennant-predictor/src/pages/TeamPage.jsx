import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getTeam, getTeamStandings, getTeamStats, getNextGame, getTeamRecent } from "../services/mlbApi";

export default function TeamPage() {
  const { teamId } = useParams();

  const [team, setTeam] =
    useState(null);
  const [standings, setStandings] =
    useState(null);
  const [stats, setStats] =
    useState(null);
  const [recent, setRecent] =
    useState(null);  
  const [nextGame, setNextGame] =
    useState(null);

  useEffect(() => {
    async function loadTeam() {
      const teamData =
        await getTeam(teamId);
    
      const standingsData =
        await getTeamStandings(teamId);
      const statsData =
        await getTeamStats(teamId);
      const recentData =
        await getTeamRecent(teamId);
      const nextGameData =
        await getNextGame(teamId);
      
      setRecent(recentData);
      setNextGame(nextGameData);
      setStats(statsData);
      setTeam(teamData);
      setStandings(standingsData);
    }

    loadTeam();
  }, [teamId]);

  if (!team || !standings || !stats || !recent ||!nextGame) {
    return <h2>Loading...</h2>;
  }

  const wins = standings.wins;
  const losses = standings.losses;

  const winPct =
    wins / (wins + losses);

  const gamesRemaining =
    162 - (wins + losses);

  const projectedWins =
    Math.round(
      wins +
      gamesRemaining * winPct
    );

  const projectedLosses =
    162 - projectedWins;

  return (
    <div className="container">

      <Link
        to="/"
        className="back-link"
      >
        ← Back to Standings
      </Link>

      <div className="team-header">
  <img
    src={`https://www.mlbstatic.com/team-logos/${team.id}.svg`}
    alt={team.name}
    className="team-page-logo"
  />

  <div>
    <h1>{team.name}</h1>

    <h2 className="team-record">
      {wins}-{losses} ({winPct.toFixed(3)})
    </h2>

    <p className="projected-record">
      Projected Finish: {projectedWins}-{projectedLosses}
    </p>
  </div>
</div>

<div className="team-overview">

<div className="team-stat-card">
  <h3>Current Record</h3>
  <p>{wins}-{losses}</p>
</div>

<div className="team-stat-card">
  <h3>Projected Record</h3>
  <p>{projectedWins}-{projectedLosses}</p>
</div>

<div className="team-stat-card">
  <h3>Run Differential</h3>

  <p
    className={
      stats.runDifferential >= 0
        ? "positive"
        : "negative"
    }
  >
    {stats.runDifferential > 0
      ? "+"
      : ""}
    {stats.runDifferential}
  </p>
</div>

<div className="team-stat-card">
  <h3>Last 10</h3>
  <p>{recent.last10}</p>
</div>

</div>

<div className="team-snapshot">

  <h2>Team Snapshot</h2>

  <div className="snapshot-grid">

    <div>
      <span>Win %</span>
      <strong>
        {winPct.toFixed(3)}
      </strong>
    </div>

    <div>
      <span>
        Games Remaining
      </span>

      <strong>
        {gamesRemaining}
      </strong>
    </div>

    <div>
      <span>
        Runs Scored
      </span>

      <strong>
        {stats.runsScored}
      </strong>
    </div>

    <div>
      <span>
        Runs Allowed
      </span>

      <strong>
        {stats.runsAllowed}
      </strong>
    </div>

    <div>
      <span>
        Current Streak
      </span>

      <strong>
        {recent.streak}
      </strong>
    </div>

  </div>

</div>

<div className="next-game-card">
  <h2>Next Game</h2>

  <div className="next-game-content">

    <span
      className={
        nextGame.label === "LIVE"
          ? "live-badge"
          : "game-date"
      }
    >
      {nextGame.label}
    </span>

    <p>{nextGame.matchup}</p>

  </div>
</div>

</div>
);
}