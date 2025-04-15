import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import DashboardLayout from "../../components/Dashboard/DashboardLayout"
import ExpenseOverView from "../../components/Expense/ExpenseOverView"
import ExpenseList from "../../components/Expense/ExpenseList"
import AddExpenseForm from "../../components/Expense/AddExpenseForm"
import Modal from "../../components/Income/Modal"
import DeleteAlert from "../../components/Income/DeleteAlert"
import { API_BASE_URL } from "../../utils/apiPath"


const Expense = () => {

  const [expensedata, setExpensedata] = useState([])
  const [loading, setLoading] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null
  })


  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false)

  // get all expenses data
  const fetchExpenseDetails = async () => {
    try {
      if (loading) return;
      setLoading(true);

      const token = localStorage.getItem("token")
      const response = await axios.get(`${API_BASE_URL}/api/v1/expense/get`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      console.log("Expense data", response.data)
      if (response.data) {
        setExpensedata(response.data)
      }
    } catch (error) {
      console.log("Error while fetching data", error)
    } finally {
      setLoading(false)
    }
  }

  // add Expense data
  const handleAddExpense = async (expense) => {
    const { icon, category, amount, date } = expense;
  
    try {
      if (!category.trim()) {
        toast.error("Source is required");
        return;
      }
      if (!amount || isNaN(amount) || Number(amount) < 0) {
        toast.error("Amount should be a valid number and greater than 0");
        return;
      }
  
      if (!date) {
        toast.error("Date is required");
        return;
      }
  
      const token = localStorage.getItem("token");
      const response = await axios.post(`${API_BASE_URL}/api/v1/expense/add`, {
        icon,
        category,
        amount: Number(amount),
        date
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      console.log(response);
      toast.success("Expense Added Successfully");
      setOpenAddExpenseModal(false);
      fetchExpenseDetails();
  
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      toast.error(errorMsg);  // <-- this was missing!
      console.log("Error while adding Expense:", errorMsg);
    }
  };
  

  // delete Expense
  const deleteExpense = async (id) => {
    try {
      const token = localStorage.getItem("token")
      await axios.delete(`${API_BASE_URL}/api/v1/expense/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      setOpenDeleteAlert({ show: false, id: null })
      toast.success("Expense deleted Successfully")
      fetchExpenseDetails()
    } catch (error) {
      console.log("Error while deleting", error.response?.data?.message || error.message)
    }
  }


  // handle download 
  const handleDownload = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.get(`${API_BASE_URL}/api/v1/expense/downloadexcel`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob' // Important for downloading files
      })

      // Create a link element, use it to download the file
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'Expense_details.xlsx') // or whatever file name you want
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.log("Error while downloading the Expense details", error)
    }
  }

  useEffect(() => {
    fetchExpenseDetails();
  }, [])
  return (
    <DashboardLayout activeMenu="Expense">
      <div className='my-5 mx-auto'>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <ExpenseOverView
              transactions={expensedata}
              onAddExpense={() => setOpenAddExpenseModal(true)}
            />
          </div>


          <ExpenseList
            transactions={expensedata}
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
            onDownload={handleDownload}
          />
        </div>

        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Expense Modal"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>


        {/* Modal for showing the delete functionality */}
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Income"
        >
          <DeleteAlert
            content={"Are you sure you want to delete"}
            onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Expense
