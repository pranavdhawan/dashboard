import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { useEffect, useState } from "react";

const Home = () => {

  const [sheetNames, setSheetNames] = useState([]);

  const [selectedSheet, setSelectedSheet] = useState([])



  const sheetID = process.env.REACT_APP_SHEET_ID
  const key = process.env.REACT_APP_KEY
  
  const getName = async () => {
    try {
      const endpoint = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}?key=${key}`;
      const response = await fetch(endpoint);
      const data = await response.json();
      const names = data.sheets.map((sheet) => sheet.properties.title);
      setSheetNames(names);
      setSelectedSheet(names[0])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getName()
  }, [])


  return (
    <div className="home">
      <Sidebar names={sheetNames} selectedSheet={selectedSheet} setSelectedSheet={setSelectedSheet}/>
      <div className="homeContainer">
        <br />
        {/* <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div> */}

        
        <div className="charts">
          <Chart websiteName={selectedSheet} />
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
