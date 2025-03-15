import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { addThousandsSeparator } from "../../utils/helper";

import { LuHandCoins, LuWalletMinimal } from "react-icons/lu"
import { IoMdCard } from "react-icons/io"
import InfoCard from "../../components/Cards/InfoCard";
import RecentTransaction from "../../components/Dashboard/RecentTransaction";
import FinanceOverView from "../../components/Dashboard/FinanceOverView";
import ExpenseTransactions from "../../components/Dashboard/ExpenseTransactions";
import Last30daysExpenses from "../../components/Dashboard/Last30daysExpenses";

const Home = () => {
  useUserAuth();

  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:3000/api/v1/dashboard",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data)
      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Error getting dashbaord data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    return () => { };
  }, []);

  useEffect(() => {
    console.log("Dashboard Data", dashboardData);
  }, [dashboardData]);

  return (
    <>
      <DashboardLayout activeMenu="Dashboard">
        <div className="my-5 mx-auto">
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <InfoCard
              icon={<IoMdCard />}
              label="Total Balance"
              value={addThousandsSeparator(dashboardData?.totalBalance)}
              color="bg-primary"
            />

            <InfoCard
              icon={<LuWalletMinimal />}
              label="Total Income"
              value={addThousandsSeparator(dashboardData?.totalIncome)}
              color="bg-orange-500"
            />

            <InfoCard
              icon={<LuHandCoins />}
              label="Total Expense"
              value={addThousandsSeparator(dashboardData?.totalExpense)}
              color="bg-red-500"
            />

          </div> */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <RecentTransaction
              transaction={dashboardData?.recentTransactions}  // will give array 
              onSeemore={() => navigate("/expense")}
            />


            <FinanceOverView
              totalBalance={dashboardData?.totalBalance || 0}
              totalIncome={dashboardData?.totalIncome || 0}
              totalExpense={dashboardData?.totalExpense || 0}
            />


            <ExpenseTransactions
              transactions={dashboardData?.last30DaysExpenses?.transactions || 0}
              onSeeMore={() => navigate("/expense")}
            />

            {/* this one is for showing the chart */}
            <Last30daysExpenses
              data={dashboardData?.last30DaysExpenses?.transactions || 0}
            />
          </div>


        </div>
      </DashboardLayout>
    </>
  );
};

export default Home;
