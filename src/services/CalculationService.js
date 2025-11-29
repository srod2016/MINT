class CalculationService {
  calculateBudgetStatus(budget, expenses) {
    const relevantExpenses = expenses.filter(expense => 
      expense.categoryId === budget.categoryId &&
      new Date(expense.date) >= new Date(budget.startDate) &&
      new Date(expense.date) <= new Date(budget.endDate)
    );

    const totalSpent = relevantExpenses.reduce((sum, expense) => sum + expense.amount, 0);
   const percentageUsed = Math.round((totalSpent / budget.limitAmount) * 100);

    let status;
    if (percentageUsed < budget.alertThreshold) {
      status = "SAFE";
    } else if (percentageUsed < 100) {
      status = "WARNING";
    } else {
      status = "EXCEEDED";
    }

    return {
      budgetId: budget.budgetId,
      currentSpending: totalSpent,
      percentageUsed: percentageUsed,
      status: status
    };
  }
}
module.exports = CalculationService;
export default CalculationService;