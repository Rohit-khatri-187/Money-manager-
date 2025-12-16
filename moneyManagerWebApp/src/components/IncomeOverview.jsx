import React, { useEffect, useState } from "react";
import { prepareIncomeLineChartData } from "../util/util";
import CustomLineChart from "./CustomLineChart";

const IncomeOverview = ({ transactions }) => {
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    const result = prepareIncomeLineChartData(transactions);
    setChartData(result);
    console.log(result);

    return () => {};
  }, [transactions]);

  return (
    <div className="rounded-2xl bg-gray-200 p-3 sm:p-5 mt-3 sm:mt-5">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-xl sm:text-3xl text-green-600 font-semibold ">Income Overview</h5>
          <p className="text-xs text-green-600 font-semibold mt-0.5  ">
            Track your earnings over time and analyze your income trends
          </p>
        </div>
      </div>
      <div className="mt-10">
        <CustomLineChart data={chartData} type="income" />
      </div>
    </div>
  );
};

export default IncomeOverview;
