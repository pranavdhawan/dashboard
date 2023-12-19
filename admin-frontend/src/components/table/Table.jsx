import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./table.scss";

const Table = ({ websiteName }) => {
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const sheetID = process.env.REACT_APP_SHEET_ID;
  const key = process.env.REACT_APP_KEY;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values:batchGet?ranges=${websiteName}&majorDimension=ROWS&key=${key}`;
        const response = await fetch(endpoint);
        const result = await response.json();

        const headers = result.valueRanges[0].values[0];
        const rows = result.valueRanges[0].values.slice(1);

        const formattedData = rows.map((row, index) => {
          const rowData = {
            "Sr. No.": index + 1,
          };
          headers.forEach((header, index) => {
            rowData[header] = row[index];
          });
          return rowData;
        });

        setTableData(formattedData);
        setFilteredData(formattedData); // Initially set filteredData to the entire dataset
      } catch (error) {
        console.error("Error fetching data from Google Sheets:", error);
      }
    };

    fetchData();
  }, [websiteName]);

  useEffect(() => {
    // Update filteredData when startDate or endDate changes
    const updatedFilteredData = tableData.filter((item) => {
      const formattedDate = item.Date;
      const startDateMatch =
        !startDate || new Date(formattedDate.split('/').reverse().join('/')) >= startDate;
      const endDateMatch =
        !endDate || new Date(formattedDate.split('/').reverse().join('/')) <= endDate;

      return startDateMatch && endDateMatch;
    });

    setFilteredData(updatedFilteredData);
  }, [startDate, endDate, tableData]);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const displayDollarSignColumns = new Set(["Total", "Revenue"]);

  const calculateTotal = (columnName, data) => {
    return data.reduce((total, item) => {
      if (!["Sr. No.", "Date", "Website"].includes(columnName)) {
        const value = parseInt(item[columnName].replace(/[\$,]/g, ""), 10);
        total += !isNaN(value) ? value : 0;
      }

      if (displayDollarSignColumns.has(columnName) && item[columnName] != null && !isNaN(item[columnName])) {
        const value = parseFloat(item[columnName].replace(/\$/g, ""));
        total += !isNaN(value) ? value : 0;
      }

      return total;
    }, 0);
  };

  const renderTotalBox = (columnName) => {
    if (["Sr. No.", "Date", "Website"].includes(columnName)) {
      return null;
    }

    const total = calculateTotal(columnName, filteredData);
    const formattedTotal = displayDollarSignColumns.has(columnName)
      ? `$${total.toLocaleString()}`
      : total.toLocaleString();

    return (
      <div key={columnName} className="total-box">
        <div className="total-label">{columnName}</div>
        <div className="total-value">{formattedTotal}</div>
      </div>
    );
  };

  const renderTableHeader = () => {
    return Object.keys(filteredData[0] || {}).map((key) => (
      <th key={key}>{key.toUpperCase()}</th>
    ));
  };

  const renderTableData = () => {
    return filteredData.map((item, index) => (
      <tr key={index}>
        {Object.values(item).map((value, index) => (
          <td key={index}>{value}</td>
        ))}
      </tr>
    ));
  };

  return (
    <div className="tableContainer">
      <div className="date-picker">
        <DatePicker
          selectsRange
          startDate={startDate}
          endDate={endDate}
          onChange={handleDateChange}
          isClearable
          dateFormat="dd/MM/yyyy"
        />
      </div>
      <table>
        <thead>
          <tr>{renderTableHeader()}</tr>
        </thead>
        <tbody>{renderTableData()}</tbody>
      </table>
      <div className="total-boxes">
        {Object.keys(filteredData[0] || {}).map((key) => renderTotalBox(key))}
      </div>
    </div>
  );
};

export default Table;
