export const formatMonthlyChartData = (rawData) => {
  const allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const aggregatedExpenses = new Map();

  rawData.forEach(item => {
    const month = item.month;
    const amount = parseFloat(item.amount);

    if (aggregatedExpenses.has(month)) {
      const currentTotal = aggregatedExpenses.get(month);
      aggregatedExpenses.set(month, currentTotal + amount);
    } else {
      aggregatedExpenses.set(month, amount);
    }
  });

  const labels = allMonths;
  const data = allMonths.map(month => aggregatedExpenses.get(month) || 0);

  return { labels, data };
};