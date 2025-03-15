import moment from "moment";

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};


export const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};


export const addThousandsSeparator = (num) => {
  if (num == null || isNaN(num)) return "";

  const [integerPart, fractionalPart] = num.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};


export const prepareExpenseBarChartData = (data = []) => {
  let chartData;
  {
    data && (
      chartData = data.map((item) => ({
        category: item?.category,
        amount: item?.amount
      }))
    )
  }

  return chartData;
}

export const prepareIncomeBarchartData = (data = []) => {
  const sortedData = [...data].sort((a,b) => new Date(a.date) - new Date(b.date)); 
  const chartedData = sortedData.map((item) => ({
    month: moment(item?.date).format("Do MMM YYYY"), 
    amount: item?.amount, 
    source: item?.source
  }))

  return chartedData; 
}