import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { useEffect, useState } from "react";
const Home = () => {

  const [chartData, setChartData] = useState([])

  const getData = async () => {
    try {
      const res = await fetch(
        'https://sheet.best/api/sheets/6d0266f2-0f51-4836-9481-fff67db5f052'
      )
      const data = await res.json()
      setChartData(data)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData()

  }, [])

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        {/* <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div> */}

        <div className="charts">
          <Chart websiteName={"dsdad"} data={chartData} />
        </div>



        {/* <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div> */}

      </div>
    </div>
  );
};

export default Home;
