export async function getStandings() {
    const response = await fetch(
      "https://statsapi.mlb.com/api/v1/standings?leagueId=103,104"
    );
    
    const data = await response.json();
    return data.records;
  }