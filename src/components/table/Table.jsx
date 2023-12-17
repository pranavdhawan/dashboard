import React, { useEffect, useState } from "react";
import "./table.scss";


const Table = ({ websiteName }) => {
  const [tableData, setTableData] = useState([]);

  const sheetID = process.env.REACT_APP_SHEET_ID;
  const key = process.env.REACT_APP_KEY;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values:batchGet?ranges=${websiteName}&majorDimension=ROWS&key=${key}`;
        const response = await fetch(endpoint);
        const result = await response.json();

        // Assuming the data is in the format { values: [ [col1, col2, col3], [data1, data2, data3], ...] }
        const headers = result.valueRanges[0].values[0];
        const rows = result.valueRanges[0].values.slice(1);

        // Convert data to an array of objects
        const formattedData = rows.map((row) => {
          return headers.reduce((obj, header, index) => {
            obj[header] = row[index];
            return obj;
          }, {});
        });

        setTableData(formattedData);
      } catch (error) {
        console.error("Error fetching data from Google Sheets:", error);
      }
    };

    fetchData();
  }, [websiteName]);


  const renderTableHeader = () => {
    return Object.keys(tableData[0] || {}).map((key) => (
      <th key={key}>{key.toUpperCase()}</th>
    ));
  };

  const renderTableData = () => {
    return tableData.map((item, index) => (
      <tr key={index}>
        {Object.values(item).map((value, index) => (
          <td key={index}>{value}</td>
        ))}
      </tr>
    ));
  };

  return (
    <div className="tableContainer">
      <table>
        <thead>
          <tr>{renderTableHeader()}</tr>
        </thead>
        <tbody>{renderTableData()}</tbody>
      </table>
    </div>
  );
};

export default Table;
