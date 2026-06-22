export async function getStandings() {
    const response = await fetch(
      "https://statsapi.mlb.com/api/v1/standings?leagueId=103,104"
    );
    
    const data = await response.json();
    return data.records;
  }

  export async function getTeam(teamId) {
    const response = await fetch(
      `https://statsapi.mlb.com/api/v1/teams/${teamId}`
    );
  
    const data = await response.json();
  
    return data.teams[0];
  }

  export async function getTeamStandings(teamId) {
    const response = await fetch(
      "https://statsapi.mlb.com/api/v1/standings?leagueId=103,104"
    );
  
    const data = await response.json();
  
    const team = data.records
      .flatMap(record => record.teamRecords)
      .find(
        team => team.team.id === Number(teamId)
      );
  
    return team;
  }

  export async function getTeamStats(teamId) {
    const [hittingRes, pitchingRes] = await Promise.all([
      fetch(
        `https://statsapi.mlb.com/api/v1/teams/${teamId}/stats?stats=season&group=hitting`
      ),
      fetch(
        `https://statsapi.mlb.com/api/v1/teams/${teamId}/stats?stats=season&group=pitching`
      )
    ]);
  
    const hittingData = await hittingRes.json();
    const pitchingData = await pitchingRes.json();
  
    const hitting =
      hittingData.stats[0].splits[0].stat;
  
    const pitching =
      pitchingData.stats[0].splits[0].stat;
  
    return {
      runsScored: hitting.runs,
      runsAllowed: pitching.runs,
      runDifferential:
        hitting.runs - pitching.runs
    };
  }

  export async function getTeamRecent(teamId) {
    const endDate =
      new Date();
  
    const startDate =
      new Date();
  
    startDate.setDate(
      endDate.getDate() - 30
    );
  
    const response = await fetch(
      `https://statsapi.mlb.com/api/v1/schedule?sportId=1&teamId=${teamId}&startDate=${startDate.toISOString().split("T")[0]}&endDate=${endDate.toISOString().split("T")[0]}`
    );
  
    const data =
      await response.json();
  
    const games =
      data.dates.flatMap(
        date => date.games
      );
  
    const completed =
      games.filter(
        game =>
          game.status
            .detailedState ===
          "Final"
      );
  
    const last10 =
      completed.slice(-10);
  
    let wins = 0;
  
    last10.forEach(game => {
      const isHome =
        game.teams.home.team.id ===
        Number(teamId);
  
      const teamScore = isHome
        ? game.teams.home.score
        : game.teams.away.score;
  
      const oppScore = isHome
        ? game.teams.away.score
        : game.teams.home.score;
  
      if (teamScore > oppScore)
        wins++;
    });
  
    const losses =
      last10.length - wins;
  
    const latest =
      completed[
        completed.length - 1
      ];
  
    let streak = "-";
  
    if (latest) {
      const isHome =
        latest.teams.home.team.id ===
        Number(teamId);
  
      const teamScore = isHome
        ? latest.teams.home.score
        : latest.teams.away.score;
  
      const oppScore = isHome
        ? latest.teams.away.score
        : latest.teams.home.score;
  
      streak =
        teamScore > oppScore
          ? "W1"
          : "L1";
    }
  
    return {
      last10: `${wins}-${losses}`,
      streak
    };
  }

  export async function getNextGame(teamId) {
    const today = new Date();
  
    const endDate = new Date();
    endDate.setDate(today.getDate() + 14);
  
    const response = await fetch(
      `https://statsapi.mlb.com/api/v1/schedule?sportId=1&teamId=${teamId}&startDate=${
        today.toISOString().split("T")[0]
      }&endDate=${
        endDate.toISOString().split("T")[0]
      }`
    );
  
    const data = await response.json();
  
    if (!data.dates?.length) {
      return "No game scheduled";
    }
  
    const game = data.dates[0].games[0];
  
    const isHome =
      game.teams.home.team.id ===
      Number(teamId);
  
    const opponent = isHome
      ? game.teams.away.team.name
      : game.teams.home.team.name;
  
    const matchup = isHome
      ? `vs ${opponent}`
      : `@ ${opponent}`;
  
    const status =
      game.status.detailedState;
  
    if (
      status === "In Progress" ||
      status === "Manager Challenge" ||
      status === "Delayed"
    ) {
      return {
        label: "LIVE",
        matchup
      };
    }
  
    const gameDate = new Date(
      game.gameDate
    );
  
    const formattedDate =
      gameDate.toLocaleDateString(
        "en-US",
        {
          month: "short",
          day: "numeric"
        }
      );
  
    return {
      label: formattedDate,
      matchup
    };
  }