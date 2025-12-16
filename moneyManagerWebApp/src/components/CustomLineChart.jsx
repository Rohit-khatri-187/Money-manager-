import React from "react";
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Custom Tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const { totalAmount, items } = payload[0].payload;

    return (
      <div className="bg-white border border-gray-300 rounded-md p-3 shadow-sm text-sm max-w-xs">
        <p className="font-semibold text-gray-700">{label}</p>
        <p className="text-gray-500 mb-2">
          Total: ${totalAmount.toLocaleString()}
        </p>

        <div className="max-h-40 overflow-y-auto pr-1 space-y-2">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-2 text-xs text-gray-700"
            >
              <div className="flex items-center gap-1">
                {item.icon && (
                  <img src={item.icon} alt={item.name} className="w-4 h-4" />
                )}
                <span className="truncate max-w-[100px]">{item.name}</span>
              </div>
              <span className="text-gray-600">
                ${item.amount.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

// Chart Component
const CustomLineChart = ({ data, type = "income" }) => {
  const isExpense = type === "expense";

  const gradientId = isExpense ? "colorRedLight" : "colorPurpleLight";
  const strokeColor = isExpense ? "#ef4444" : "#4f46e5"; // red or purple

  return (
    <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] p-4 bg-white shadow rounded-xl">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
        >
          {/* Gradients for Area */}
          <defs>
            <linearGradient id="colorPurpleLight" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#a78bfa" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorRedLight" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f87171" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" className="text-xs md:text-sm" />
          <YAxis className="text-xs md:text-sm" />
          <Tooltip content={<CustomTooltip />} />

          {/* Area Fill */}
          <Area
            type="monotone"
            dataKey="totalAmount"
            stroke={false}
            fill={`url(#${gradientId})`}
          />

          {/* Main Line */}
          <Line
            type="monotone"
            dataKey="totalAmount"
            stroke={strokeColor}
            strokeWidth={2}
            activeDot={{ r: 6 }}
            dot={{ r: 3 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
