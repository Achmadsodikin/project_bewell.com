import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import Axios from 'axios';
import { URL_API } from '../../helper';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

//   static demoUrl = 'https://codesandbox.io/s/pie-chart-with-customized-label-dlhhj';

class ChartPieMl extends PureComponent {
  state = {

  }

  data = [
    { name: 'Paracetamol', value: 32 },
    { name: 'Ibuprofen', value: 100 },
    { name: 'Drugs C', value: 800 },
    { name: 'Drugs D', value: 750 },
  ];

  render() {
    return (
      <ResponsiveContainer width="100%" aspect={5}>
        <PieChart width={400} height={400}>
          <Pie
            data={this.data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {this.data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
  }
}

export default ChartPieMl;