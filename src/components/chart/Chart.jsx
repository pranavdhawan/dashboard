import React, { useState, useEffect } from "react";
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

const Chart = ({ websiteName }) => {
  const [chartData, setChartData] = useState([]);

  const sheetID = "1hcnLmF9O7cHN-XLvzsXjfixO2mZE_nn9FTP7zuKsddY";
  const key = "AIzaSyBew1eFXlK1t8U_-DncRstx_m7lRxMTEFk";

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

  const renderCharts = () => {
    if (chartData.length === 0) {
      return <div>No data available</div>;
    }

    const chartElements = Object.keys(chartData[0])
      .filter((key) => key !== "Date" && key !== "Website")
      .map((key) => {
        // Extract values for domain calculation
        const values = chartData.map((entry) => entry[key]);

        // Calculate the domain with some padding
        const minValue = Math.min(...values);
        const maxValue = Math.max(...values);
        const padding = 0.1 * (maxValue - minValue); // 10% padding
        const domain = [minValue - padding, maxValue + padding];

        return (
          <ResponsiveContainer key={key} width="100%" aspect={2 / 1}>
            <AreaChart
              width={730}
              height={250}
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id={`${key}-gradient`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="Date" stroke="gray" />
              <YAxis type="number" stroke="gray" domain={domain} />
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
        );
      });

    return chartElements;
  };

  return (
    <div className="chart">
      <div className="title">{websiteName}</div>
      {renderCharts()}
    </div>
  );
};

export default Chart;
