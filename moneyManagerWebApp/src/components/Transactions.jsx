import { ArrowRight } from "lucide-react";
import React from "react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";

const Transactions = ({ transactions, onMore, type, title }) => {
  return (
    <div className="rounded-2xl bg-gray-200 p-3 sm:p-5">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">{title}</h5>
        <button
          className={`${
            type == "expense"
              ? "flex justify-center items-center py-1 px-3 rounded-xl cursor-pointer bg-red-600 text-white font-semibold hover:scale-[1.05]"
              : "flex justify-center items-center bg-green-600 py-1 px-3 text-white rounded-xl cursor-pointer hover:scale-[1.05] font-semibold "
          }`}
          onClick={onMore}
        >
          <span className="text-xs">More</span>{" "}
          <ArrowRight className="text-base" size={15} />
        </button>
      </div>

      <div className="mt-6">
        {transactions?.slice(0, 5)?.map((item) => (
          <TransactionInfoCard
            key={item.id}
            title={item.name}
            icon={item.icon}
            date={moment(item.date).format("Do MMM YYYY")}
            amount={item.amount}
            type={type}
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};

export default Transactions;
