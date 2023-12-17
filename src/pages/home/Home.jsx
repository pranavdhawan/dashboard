import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import { useEffect, useState } from "react";
import Table from "../../components/table/Table"

const Home = () => {

  const [sheetNames, setSheetNames] = useState([]);
  const [selectedSheet, setSelectedSheet] = useState([]);
  const [view, setView] = useState("chart"); // Default view is chart

  const sheetID = process.env.REACT_APP_SHEET_ID;
  const key = process.env.REACT_APP_KEY;

  
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



  const handleViewChange = (newView) => {
    setView(newView);
  };

  return (
    <div className="home">
      <Sidebar names={sheetNames} selectedSheet={selectedSheet} setSelectedSheet={setSelectedSheet} />
      <div className="homeContainer">
        <br />
        <div className="viewToggle">
          <button onClick={() => handleViewChange("chart")} disabled={view === "chart"}>
            Chart View
          </button>
          <button onClick={() => handleViewChange("table")} disabled={view === "table"}>
            Table View
          </button>
        </div>

        <div className="views">
          {view === "chart" && <Chart websiteName={selectedSheet} />}
          {view === "table" && <Table websiteName={selectedSheet} />}
        </div>
      </div>
    </div>
  );
};

export default Home;
