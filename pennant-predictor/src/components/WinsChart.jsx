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
  .sort((a, b) => {
    const pctA =
      a.wins / (a.wins + a.losses);
  
    const pctB =
      b.wins / (b.wins + b.losses);
  
    return pctB - pctA;
  })

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