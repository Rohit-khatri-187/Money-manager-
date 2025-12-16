import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/UseUser";
import { Plus } from "lucide-react";
import Modal from "../components/Modal";
import axiosConfig from "../util/axiosUtil";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import AddExpenseForm from "../components/AddExpenseForm";
import ExpenseList from "../components/ExpenseList";
import ExpenseOverview from "../components/ExpenseOverview";
import DeleteAlert from "../components/DeleteAlert";

const Expense = () => {
  useUser();

  const [expenseData, setExpenseData] = useState([]);
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

   const [openDeleteAlert, setOpenDeleteAlert] = useState({
      show: false,
      data: null,
    });

  // api to fetch all the categories for the expenses
  const fetchExpenseCategories = async () => {
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.CATEGORY_BY_TYPE("expense")
      );

      if (response.status === 200) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error("failed to fetch the expense categories:", error);
      toast.error(error.data?.message || "Failed to fetch income categories");
    }
  };

  // fetching all the expenses
  const fetchAllExpenses = async () => {
    if (loading) {
      return;
    }

    setLoading(true);

    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_EXPENSES);

      if (response.status === 200) {
        setExpenseData(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error while loading Expenses", error.message);
      toast.error(error.message || "Failed to fetch expense details");
    } finally {
      setLoading(false);
    }
  };

  // adding data to the database
  const handleAddExpense = async (income) => {
    const { name, amount, date, icon, categoryId } = income;

    if (!name.trim()) {
      toast.error("Please enter a name");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number greater than 0");
      return;
    }

    if (!date) {
      toast.error("Please select a date");
      return;
    }

    const today = new Date().toISOString().split("T")[0];

    if (date > today) {
      toast.error("Date cannot be in the future");
      return;
    }

    if (!categoryId) {
      toast.error("Please select a category");
      return;
    }

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSE, {
        name,
        amount: Number(amount),
        date,
        icon,
        categoryId,
      });

      if (response.status === 201) {
        setOpenAddIncomeModal(false);
        toast.success("Expense added successfully");
      }
    } catch (error) {
      console.error("Error adding Expense", error);
      toast.error(error.data?.message || "Failed to fetch Expense");
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await axiosConfig.delete(API_ENDPOINTS.DELETE_EXPENSE(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Expense deleted successfully");
      fetchAllExpenses();
    } catch (error) {
      console.error("Failed to delete expense", error);
      toast.error(error.data?.message || "Failed to delete expense");
    }
  };

    const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.EXPENSE_EXCEL_DOWNLOAD,{responseType:"blob"});

      let filename = "expense_details.xlsx";
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download",filename);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Download expense detials successfully");

    } catch (error) {
      console.error("Error while downloading the expense excel file"+ error);
      toast.error(error.data?.message || "Failed to download income");
    }
    
  }

  const handleEmailExpenseDetails = async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.EMIAL_EXPENSE);

      if(response.status === 200){
        toast.success("Expense details emailed successfully");
      }
      
    } catch (error) {
      console.error("Error while sending the Expense email"+ error);
      toast.error(error.data?.message || "Failed to email Expense");
    }
    
  }



  useEffect(() => {
    fetchAllExpenses();
    fetchExpenseCategories();
  }, []);

  return (
    <div>
      <Dashboard activeMenu="Expense">
        <div className="my-3 sm:my-5 mx-auto">
          <div className="grid grid-cols-1 gap-6  p-1 sm:p-5">
            <div>
              {/* overview for the income with lin chart  */}
              <button
                className="flex items-center justify-center bg-red-200 py-2 px-4 text-red-700 font-bold rounded-xl"
                onClick={() => setOpenAddIncomeModal(true)}
              >
                <Plus size={20} className="text-lg" /> <span>Add Expense</span>
              </button>

              <ExpenseOverview transactions={expenseData} />
            </div>

            <ExpenseList
              transactions={expenseData}
              onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
              onDownload={handleDownloadExpenseDetails}
              onEmail={handleEmailExpenseDetails}
            />

            {/* Add Income modal */}
            <Modal
              isopen={openAddIncomeModal}
              onClose={() => setOpenAddIncomeModal(false)}
              title="Add Expense"
            >
              <AddExpenseForm
                onAddExpense={handleAddExpense}
                categories={categories}
              />
            </Modal>

            <Modal
              isopen={openDeleteAlert.show}
              onClose={() => setOpenDeleteAlert({ show: false, data: null })}
              title="Delete Expense"
            >
              <DeleteAlert
                content="Are you sure want to delete this expense details?"
                onDelete={() => handleDeleteExpense(openDeleteAlert.data)}
              />
            </Modal>
          </div>
        </div>
      </Dashboard>
    </div>
  );
};

export default Expense;
