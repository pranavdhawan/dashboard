import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data1 = [
  { date: "01/11/2023", impressions: 26611 },
  { date: "02/11/2023", impressions: 42171 },
  { date: "03/11/2023", impressions: 35262 },
  { date: "04/11/2023", impressions: 13127 },
  { date: "05/11/2023", impressions: 4440 },
  { date: "06/11/2023", impressions: 0 },
  { date: "07/11/2023", impressions: 0 },
  { date: "08/11/2023", impressions: 15885 },
  { date: "09/11/2023", impressions: 18743 },
  { date: "10/11/2023", impressions: 14910 },
  { date: "11/11/2023", impressions: 16125 },
  { date: "12/11/2023", impressions: 56334 },
  { date: "13/11/2023", impressions: 65008 },
  { date: "14/11/2023", impressions: 54323 },
  { date: "15/11/2023", impressions: 12034 },
  { date: "16/11/2023", impressions: 0 },
  { date: "17/11/2023", impressions: 0 },
  { date: "18/11/2023", impressions: 0 },
  { date: "19/11/2023", impressions: 0 },
  { date: "20/11/2023", impressions: 399186 },
  { date: "21/11/2023", impressions: 1042270 },
  { date: "22/11/2023", impressions: 1202564 },
  { date: "23/11/2023", impressions: 1198756 },
  { date: "24/11/2023", impressions: 1142057 },
  { date: "25/11/2023", impressions: 1200002 },
  { date: "26/11/2023", impressions: 1344732 },
  { date: "27/11/2023", impressions: 1234445 },
  { date: "28/11/2023", impressions: 1302052 },
  { date: "29/11/2023", impressions: 1460866 },
  { date: "30/11/2023", impressions: 1536287 },
  { date: "01/12/2023", impressions: 1316520 },
  { date: "02/12/2023", impressions: 1357448 },
  { date: "03/12/2023", impressions: 1455056 },
  { date: "04/12/2023", impressions: 1359677 },
  { date: "05/12/2023", impressions: 1343243 },
  { date: "06/12/2023", impressions: 248051 },
];

const data2 = [
  { date: "01/11/2023", revenue: 3.64 },
  { date: "02/11/2023", revenue: 3.97 },
  { date: "03/11/2023", revenue: 1.26 },
  { date: "04/11/2023", revenue: 2.23 },
  { date: "05/11/2023", revenue: 3.06 },
  { date: "06/11/2023", revenue: 0.00 },
  { date: "07/11/2023", revenue: 0.00 },
  { date: "08/11/2023", revenue: 6.81 },
  { date: "09/11/2023", revenue: 9.49 },
  { date: "10/11/2023", revenue: 6.53 },
  { date: "11/11/2023", revenue: 7.82 },
  { date: "12/11/2023", revenue: 18.52 },
  { date: "13/11/2023", revenue: 4.63 },
  { date: "14/11/2023", revenue: 6.17 },
  { date: "15/11/2023", revenue: 0.78 },
  { date: "16/11/2023", revenue: 0.00 },
  { date: "17/11/2023", revenue: 0.00 },
  { date: "18/11/2023", revenue: 0.00 },
  { date: "19/11/2023", revenue: 0.00 },
  { date: "20/11/2023", revenue: 38.86 },
  { date: "21/11/2023", revenue: 198.60 },
  { date: "22/11/2023", revenue: 210.00 },
  { date: "23/11/2023", revenue: 189.00 },
  { date: "24/11/2023", revenue: 166.80 },
  { date: "25/11/2023", revenue: 151.80 },
  { date: "26/11/2023", revenue: 181.93 },
  { date: "27/11/2023", revenue: 162.75 },
  { date: "28/11/2023", revenue: 155.52 },
  { date: "29/11/2023", revenue: 181.10 },
  { date: "30/11/2023", revenue: 203.89 },
  { date: "01/12/2023", revenue: 154.63 },
  { date: "02/12/2023", revenue: 149.47 },
  { date: "03/12/2023", revenue: 167.94 },
  { date: "04/12/2023", revenue: 153.48 },
  { date: "05/12/2023", revenue: 154.19 },
  { date: "06/12/2023", revenue: 30.29 },
];


const Chart = ({ aspect, title, data }) => {
  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={
            data === "data1" ? data1 : data2
          }
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey= {data === "data1" ? "impressions" : "revenue"}
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
