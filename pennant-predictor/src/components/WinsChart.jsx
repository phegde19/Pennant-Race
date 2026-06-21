import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function WinsChart({ teams }) {
  const data = teams
    .sort((a, b) => b.projectedWins - a.projectedWins)
    .slice(0, 10)
    .map(team => ({
      team: team.name.split(" ").pop(),
      wins: Math.round(team.projectedWins)
    }));

  return (
    <div className="chart-container">
      <h2>Top 10 Projected Teams</h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >
        <BarChart data={data}>
          <XAxis dataKey="team" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="wins" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}