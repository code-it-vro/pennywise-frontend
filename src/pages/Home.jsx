import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

import "../stylesheet/home.css";
import ExpensesTable from "./ExpensesTable";
import ExpenseTrackerForm from "./ExpenseTrackerForm";
import ExpenseDetails from "./ExpenseDetails";

function Home() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [incomeAmount, setIncomeAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  useEffect(() => {
    const amounts = expenses.map((expense) => expense.amount);

    const income = amounts
      .filter((amount) => amount > 0)
      .reduce((acc, item) => (acc += item), 0);
    const expense = amounts
      .filter((amount) => amount < 0)
      .reduce((acc, item) => (acc += item), 0);
    setIncomeAmount(income);
    setExpenseAmount(expense);

    
  }, [expenses]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("Logged out successfully");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const fetchExpenses = async () => {
    try {
     const url = `${import.meta.env.VITE_APP_API_URL}/expenses`;

      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      const response = await fetch(url, headers);
      if (response.status === 403) {
        navigate("/login");
        return;
      }
      const result = await response.json();
      setExpenses(result.data);
    } catch (error) {
      handleError(error);
    }
  };

  const addExpenses = async (data) => {
    try {
      const url = `${import.meta.env.VITE_APP_API_URL}/expenses`;

      const headers = {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json", // Correct header for sending JSON
      };

      // Send the POST request with the expense data
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      });

      // Check for response status and handle errors
      if (response.ok) {
        const result = await response.json();
        // After adding the expense, you can fetch the updated list or update state directly
        handleSuccess("Expense added successfully");
        fetchExpenses(); // To refresh the expenses after adding
      } else {
        const error = await response.json();
        handleError(error.message); // Handle server-side errors
      }
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleDeleteExpense = async (expenseId) => {
    try {
      const url = `${import.meta.env.VITE_APP_API_URL}/expenses/${expenseId}`;

      const headers = {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      };

      const response = await fetch(url, {
        method: "DELETE",
        headers: headers,
      });

      if (response.ok) {
        const result = await response.json();

        handleSuccess("Expense delelted successfully");
        fetchExpenses();
      } else {
        const error = await response.json();
        handleError(error.message);
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="main-container">
      <header className="header-container">
        <h1 className="header-title">PennyWise</h1>
        <div className="user-info">
          <h2 className="user-name">{loggedInUser}</h2>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>
      <div className="content-container">
        <div className="left-panel">
          <ExpenseDetails income={incomeAmount} expense={expenseAmount} />
          <ExpenseTrackerForm addExpenses={addExpenses} />
        </div>
        <div className="right-panel">
          <ExpensesTable
            expenses={expenses}
            handleDeleteExpense={handleDeleteExpense}
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Home;
