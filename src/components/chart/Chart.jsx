import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const convertToNumber = (value) => {
  // Assuming the Revenue values have a "$" sign
  return parseFloat(value.replace(/\$/g, ""));
};

const Chart = ({ websiteName, data }) => {
  // Convert Revenue values to numbers
  const chartData = data.map((entry) => ({
    ...entry,
    Revenue: convertToNumber(entry.Revenue),
  }));

  // Extract revenue values for domain calculation
  const impressionsValues = chartData.map((entry) => entry.Impressions);
  const revenueValues = chartData.map((entry) => entry.Revenue);

  // Calculate the domain with some padding
  const minImpressions = Math.min(...impressionsValues);
  const maxImpressions = Math.max(...impressionsValues);
  const minRevenue = Math.min(...revenueValues);
  const maxRevenue = Math.max(...revenueValues);
  const paddingImpressions = 0.1 * (maxImpressions - minImpressions); // 10% padding
  const paddingRevenue = 0.1 * (maxRevenue - minRevenue); // 10% padding

  // Set the domains for both y-axes
  const impressionsDomain = [minImpressions - paddingImpressions, maxImpressions + paddingImpressions];
  const revenueDomain = [minRevenue - paddingRevenue, maxRevenue + paddingRevenue];

  return (
    <div className="chart">
      <div className="title">{websiteName}</div>
      <ResponsiveContainer width="100%" aspect={2 / 1}>
        <AreaChart
          width={730}
          height={250}
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="impressions" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="Date" stroke="gray" />
          <YAxis type="number" stroke="gray" domain={impressionsDomain} />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Impressions"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#impressions)"
          />
        </AreaChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" aspect={2 / 1}>
        <AreaChart
          width={730}
          height={250}
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="revenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="Date" stroke="gray" />
          <YAxis type="number" stroke="gray" domain={revenueDomain} />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip formatter={(value) => `$${value}`} />
          <Area
            type="monotone"
            dataKey="Revenue"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#revenue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
