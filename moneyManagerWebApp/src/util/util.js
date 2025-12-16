export const addThousandsSeparator = (num) => {
  if (num == null || isNaN(num)) return "";

  // Convert number to string to handle decimals
  const numStr = num.toString();
  const parts = numStr.split("."); // Split into integer and fractional parts

  let integerPart = parts[0];
  const fractionalPart = parts[1];

  // Handle Indian Numbering: first group of 3, then groups of 2
  const lastThree = integerPart.substring(integerPart.length - 3);
  const otherNumbers = integerPart.substring(0, integerPart.length - 3);

  if (otherNumbers !== "") {
    const formattedOtherNumbers = otherNumbers.replace(
      /\B(?=(\d{2})+(?!\d))/g,
      ","
    );
    integerPart = formattedOtherNumbers + "," + lastThree;
  } else {
    integerPart = lastThree;
  }

  return fractionalPart ? `${integerPart}.${fractionalPart}` : integerPart;
};

export const prepareIncomeLineChartData = (transactions) => {
  if (!Array.isArray(transactions)) return [];

  // Helper to format the month label (e.g., "6th Jul")
  const getDaySuffix = (day) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const getMonthLabel = (dateStr) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    return `${day}${getDaySuffix(day)} ${month}`;
  };

  const grouped = {};

  transactions.forEach((txn) => {
    const date = txn.date;

    if (!grouped[date]) {
      grouped[date] = {
        date,
        totalAmount: 0,
        items: [],
        month: getMonthLabel(date),
      };
    }

    grouped[date].totalAmount += txn.amount;
    grouped[date].items.push(txn);
  });

  const result = Object.values(grouped).sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return result;
};


export const calculateTotalAmount = (items) => {
  let total = 0;

  for(let i = 0 ; i < items.length ; i++){
    total += items[i].amount;
  }

  return total;
}

