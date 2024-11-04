import React, { useState } from "react";
import { handleError } from "../utils";

function ExpenseTrackerForm({ addExpenses }) {
  const [expenseInfo, setExpenseInfo] = useState({
    text: "",
    amount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleExpense = (e) => {
    e.preventDefault();
    const { text, amount } = expenseInfo;
    if (!text || !amount) {
      handleError("All fields are required");
      return;
    }
    addExpenses(expenseInfo);

    // Reset the form fields after submission
    setExpenseInfo({
      text: "",
      amount: "",
    });
  };

  return (
    <div className="expense-form-container">
      <form className="expense-form" onSubmit={handleExpense}>
        <h3>Transaction Amount</h3>
        <div className="form-group">
          <label htmlFor="text">Description</label>
          <input
            type="text"
            name="text"
            placeholder="Enter description ..."
            value={expenseInfo.text}
            onChange={handleChange}
            autoFocus
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            name="amount"
            placeholder="Enter value(+ for income,- for expense)"
            value={expenseInfo.amount}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn">
          Add Expense
        </button>
      </form>
    </div>
  );
}

export default ExpenseTrackerForm;
