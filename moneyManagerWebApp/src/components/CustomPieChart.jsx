import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Tooltip component
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0];
    return (
      <div className="bg-white border border-gray-300 rounded-md p-2 shadow text-xs">
        <p className="text-gray-800 font-semibold">{name}</p>
        <p className="text-gray-600">${value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

// Full label with name, percentage, and value
const renderLabel = ({ name, percent, value }) => {
  return `${name}: ${Math.round(percent * 100)}% ($${value.toLocaleString()})`;
};

const CustomPieChart = ({ data, label, totalAmount, colors, showTextAnchor }) => {
  // Detect screen width using window.innerWidth (optional enhancement)
  const isMobile = window.innerWidth < 640;

  return (
    <div className="w-full flex flex-col items-center justify-center mt-6 px-2">
      {/* Pie Chart */}
      <div className="w-[250px] h-[250px] sm:w-[320px] sm:h-[320px] md:w-[380px] md:h-[380px] lg:w-[420px] lg:h-[420px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="amount"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius="80%"
              innerRadius="50%"
              paddingAngle={2}
              label={
                showTextAnchor && !isMobile ? renderLabel : false
              }
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              formatter={(value) => (
                <span className="text-sm text-gray-700">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Total Label */}
      <div className="text-center mt-4">
        <h3 className="text-lg font-semibold text-gray-800">{label}</h3>
        <p className="text-3xl font-bold text-purple-700 mt-1">${totalAmount}</p>
      </div>
    </div>
  );
};

export default CustomPieChart;
