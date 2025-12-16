import React from "react";
import CustomPieChart from "./CustomPieChart";
import { addThousandsSeparator } from "../util/util";

const FinanceOverView = ({ totalBalance, totalIncome, totalExpense }) => {
  const COLORS = ["#591688", "#a0090e", "#016630"];

  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Expenses", amount: totalExpense },
    { name: "Total Income", amount: totalIncome },
  ];

  return (
    <div className="rounded-2xl  bg-gray-200 p-3 sm:p-5">
      <div className="flex items-center justify-center ">
        <h5 className="text-lg">Financial Overview</h5>
      </div>

        <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={`${addThousandsSeparator(totalBalance)}`}
        colors={COLORS}
        showTextAnchor
        />

    </div>
  );
};

export default FinanceOverView;
