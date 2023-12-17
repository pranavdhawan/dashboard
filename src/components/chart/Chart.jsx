import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./chart.scss";

const convertToNumber = (value) => {
  return parseFloat(value.replace(/\$/g, ""));
};

const formatDate = (date) => {
  // Format date to DD/MM/YYYY
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};




const parseDateString = (dateString) => {
  // Parse DD-MM-YYYY format to create a Date object
  const [day, month, year] = dateString.split("-");
  return new Date(year, month - 1, day);
};


const Chart = ({ websiteName }) => {
  const [chartData, setChartData] = useState([]);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const sheetID = process.env.REACT_APP_SHEET_ID;
  const key = process.env.REACT_APP_KEY;


  const getData = async () => {
    try {
      const endpoint = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values:batchGet?ranges=${websiteName}&majorDimension=ROWS&key=${key}`;
      const response = await fetch(endpoint);
      const result = await response.json();

      const headers = result.valueRanges[0].values[0];
      const dateIndex = headers.indexOf("Date");

      const data = result.valueRanges[0].values
        .slice(1)
        .map((row) => {
          const rowData = {};
          headers.forEach((header, index) => {
            if (index === dateIndex) {
              rowData[header] = row[index];
            } else if (header !== "Website") {
              rowData[header] = convertToNumber(row[index]);
            }
          });
          return rowData;
        });

      setChartData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [websiteName]);




  

  const handleDateChange = (dates) => {
    const [start, end] = dates;
  
    // Format the selected start and end dates to DD/MM/YYYY
    const formattedStartDate = start ? formatDate(start) : null;
    const formattedEndDate = end ? formatDate(end) : null;
  
    setStartDate(start);
    setEndDate(end);
  
    // Check if both start and end are null, then reset the states
    if (start === null && end === null) {
      setStartDate(null);
      setEndDate(null);
  
      // Fetch all data when the date range is cleared
      getData();
      return;
    }
  
    // Filter data based on the selected date range
    const filteredData = chartData.filter((entry) => {
      const formattedEntryDate = entry.Date; // Assuming entry.Date is already in DD/MM/YYYY format
  
      return (
        (!start || formattedEntryDate >= formattedStartDate) &&
        (!end || formattedEntryDate <= formattedEndDate)
      );
    });
  
    // Update the chart data with the filtered data
    setChartData(filteredData);
  };
  
  
  
  
  


  const renderCharts = () => {
    if (chartData.length === 0) {
      return <div>No data available</div>;
    }

    const chartElements = Object.keys(chartData[0])
      .filter((key) => key !== "Date" && key !== "Website")
      .map((key) => {
        const displayName = key // Add more mappings as needed

        const values = chartData.map((entry) => entry[key]);

        const minValue = Math.min(...values);
        const maxValue = Math.max(...values);
        const domain = [minValue, maxValue];

        let total = values.reduce((acc, value) => acc + value, 0)

        // if (key === "Revenue") {
        //   total = total.toFixed(2);
        // }

        const totalFormatted = key === "Revenue" ? `$${total.toFixed(2)}` : total.toLocaleString();


        return (
          <div key={key} className="chart-container">
            <ResponsiveContainer width="100%" aspect={2 / 1}>
              <AreaChart
                width={730}
                height={250}
                data={chartData}
                margin={{ top: 30, right: 30, left: 50, bottom: 20 }}
              >
                <defs>
                  <linearGradient id={`${key}-gradient`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="Date" stroke="gray" />
                <YAxis
                  type="number"
                  stroke="gray"
                  domain={domain}
                  tickFormatter={(value) => (key === "Revenue" ? `$${value}` : value)}
                />
                <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey={key}
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill={`url(#${key}-gradient)`}
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className="total-value">Total {displayName}: {totalFormatted}</div>
          </div>
        );
      });

    return <div className="charts-container">{chartElements}</div>;
  };

  return (
    <div className="chart">
      <div className="date-picker">
        <DatePicker
          selectsRange
          startDate={startDate}
          endDate={endDate}
          onChange={handleDateChange}
          isClearable
          dateFormat="dd-MM-yyyy"
        />
      </div>
      <div className="title">{websiteName}</div>
      {renderCharts()}
    </div>
  );

};

export default Chart;