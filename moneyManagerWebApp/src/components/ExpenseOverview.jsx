import React, { useEffect, useState } from "react";
import { prepareIncomeLineChartData } from "../util/util";
import CustomLineChart from "./CustomLineChart";

const ExpenseOverview = ({ transactions }) => {
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
        <div className="flex flex-col " >
          <h5 className="text-2xl font-semibold text-red-700 ">Expense Overview</h5>
          <p className="text-xs font-semibold text-red-700 mt-2  ">
            Track your earnings over time and analyze your income trends
          </p>
        </div>
      </div>
      <div className="mt-10">
        <CustomLineChart data={chartData} type="expense" />
      </div>
    </div>
  );
};

export default ExpenseOverview;
