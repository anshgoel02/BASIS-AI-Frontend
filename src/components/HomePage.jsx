import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const sampleAlerts = [
  { name: 'High CPU Usage', value: 10 },
  { name: 'Disk Space Low', value: 5 },
  { name: 'Memory Leak', value: 8 },
  { name: 'Network Error', value: 3 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6">
      <h1 className="text-2xl font-bold mb-6">System Alerts Overview</h1>
      <PieChart width={500} height={400}>
        <Pie
          data={sampleAlerts}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
          label
        >
          {sampleAlerts.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
