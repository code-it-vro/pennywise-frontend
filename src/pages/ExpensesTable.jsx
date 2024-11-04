import React from "react";

function ExpensesTable({ expenses, handleDeleteExpense }) {
  return (
    <div className="expense-list-container">
      <h3 className="expenses-heading">Expense History</h3>
      {expenses?.map((expense, index) => (
        <div key={index} className="expense-item">
          <div className="expense-description">{expense.text}</div>
          <div
            className="expense-amount"
            style={{ color: expense.amount < 0 ? "red" : "lightGreen" }}
          >
            {expense.amount}
          </div>
          <button
            className="delete-btn"
            onClick={() => handleDeleteExpense(expense._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}



export default ExpensesTable;
