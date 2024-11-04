import React from "react";

function ExpenseDetails({ income, expense }) {
  const balance = income + expense; // Since expenses are negative, this gives the correct balance

  // Conditional style for balance text color
  const balanceStyle = {
    color: balance < 0 ? "red" : "lightGreen", // Red if balance is negative, black otherwise
  };

  return (
    <div className="expense-details-container">
      <h3 className="details-heading">Financial Summary</h3>
      <div className="details-info">
        <p>
          Total Balance:{" "}
          <span className="amount balance" style={balanceStyle}>
            {balance}
          </span>
        </p>
        <p>
          Total Income: <span className="amount income">{income}</span>
        </p>
        <p>
          Total Expense: <span className="amount expense">{expense}</span>
        </p>
      </div>
    </div>
  );
}

export default ExpenseDetails;
