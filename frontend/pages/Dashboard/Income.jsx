import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/Dashboard/DashboardLayout'
import IncomeOverView from '../../components/Income/IncomeOverView'
import axios from 'axios'
import { LuCode, LuCross } from 'react-icons/lu'
import Modal from '../../components/Income/Modal'
import AddIncomeForm from '../../components/Income/AddIncomeForm'
import toast from 'react-hot-toast'
import IncomeList from '../../components/Income/IncomeList'
import DeleteAlert from '../../components/Income/DeleteAlert'
import { API_BASE_URL } from '../../utils/apiPath'

const Income = () => {
  const [incomedata, setIncomedata] = useState([])
  const [loading, setLoading] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null
  })


  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false)

  // get all income datas
  const fetchIncomeDetails = async () => {
    try {
      if (loading) return;
      setLoading(true);

      const token = localStorage.getItem("token")
      const response = await axios.get(`${API_BASE_URL}/api/v1/income/get`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      console.log("Income data", response.data)
      if (response.data) {
        setIncomedata(response.data)
      }
    } catch (error) {
      console.log("Error while fetching data", error)
    } finally {
      setLoading(false)
    }
  }

  // add income data
  const handleAddIncome = async (income) => {
    const { icon, source, amount, date } = income;
    try {

      if (!source.trim()) {
        toast.error("Source is required")
        return;
      }
      if (!amount || isNaN(amount) || Number(amount) < 0) {
        toast.error("Amount should be valid number and greater than 0")
        return;
      }

      if (!date) {
        toast.error("Date is required")
        return;
      }

      const token = localStorage.getItem("token")
      await axios.post(`${API_BASE_URL}/api/v1/income/add`, {
        icon,
        source,
        amount,
        date
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })

      setOpenAddIncomeModal(false)
      toast.success("Income Added Successfully")
      fetchIncomeDetails();

    } catch (error) {
      console.log("Error while adding income",
        error.response?.data?.message || error.message
      )
    }

  }

  // Delete income
  const deleteIncome = async (id) => {
    try {
      const token = localStorage.getItem("token")
      await axios.delete(`${API_BASE_URL}/api/v1/income/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      setOpenDeleteAlert({ show: false, id: null })
      toast.success("Income deleted Successfully")
      fetchIncomeDetails()
    } catch (error) {
      console.log("Error while deltein", error.response?.data?.message || error.message)
    }
  }

  // Download Handler
  const handleDownload = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.get(`${API_BASE_URL}/api/v1/income/downloadexcel`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob' // Important for downloading files
      })

      // Create a link element, use it to download the file
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'income_details.xlsx') // or whatever file name you want
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.log("Error while downloading the income details", error)
    }
  }

  useEffect(() => {
    fetchIncomeDetails();
  }, [])
  return (
    <DashboardLayout activeMenu="Income">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div>
            <IncomeOverView
              transactions={incomedata}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>

          <IncomeList
            transactions={incomedata}
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
            onDownload={handleDownload}
          />
        </div>

        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Income Modal"
        >
          {/* <div>Parent Modal</div> */}
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>


        {/* Modal for showing the delete functionality */}
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Income"
        >
          <DeleteAlert
            content={"Are you sure you want to delete this Income"}
            onDelete={() => deleteIncome(openDeleteAlert.data)}
          />
        </Modal>


      </div>
    </DashboardLayout>
  )
}

export default Income
