import { Download, Mail } from "lucide-react";
import React from "react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";
import { calculateTotalAmount } from "../util/util";

const IncomeList = ({ transactions, onDelete, onDownload, onEmail }) => {
  return (
    <div className="rounded-2xl bg-gray-200 p-3 sm:p-5 ">
      <div className="flex items-center justify-between m-2 ">
        <h5 className="text-xs  sm:text-lg text-green-700 font-semibold ">
          Income Sources
        </h5>

        <div className="flex items-center justify-end gap-2 ">
          <button
            onClick={onEmail}
            className="flex justify-center items-center bg-gray-100 rounded-2xl py-2 px-3 gap-2 cursor-pointer hover:bg-white hover:scale-105 "
          >
            <Mail size={15} className="text-green-700 " />
            <span className="text-xs font-semibold text-green-700 ">Email</span>
          </button>

          <button
            onClick={onDownload}
            className="flex justify-center items-center bg-gray-100 rounded-2xl py-2 px-3 gap-2 cursor-pointer hover:bg-white hover:scale-105  "
          >
            <Download size={15} className="text-base text-green-700" />
            <span className="text-xs font-semibold text-green-700 ">
              Download
            </span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2  ">
        {/* display the incomes */}

        {transactions?.map((income) => (
          <TransactionInfoCard
            key={income.id}
            title={income.name}
            icon={income.icon}
            date={moment(income.date).format("Do MMM YYYY")}
            amount={income.amount}
            type="income"
            onDelete={() => onDelete(income.id)}
          />
        ))}
      </div>

      <div className="flex justify-end m-3 gap-3">
        <span className="font-semibold sm:text-xl text-green-700">Total Amount:</span>
        <span className="text-green-700 sm:text-xl" >${calculateTotalAmount(transactions)}</span>
      </div>
    </div>
  );
};

export default IncomeList;
