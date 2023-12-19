import Sidebar from "../../components/sidebar/Sidebar";
import "./home.scss";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

const Home = () => {

  const { user } = useAuth();
  const [sheetId, setSheetId] = useState(null);
  const [sheetNames, setSheetNames] = useState([]);
  const [selectedSheet, setSelectedSheet] = useState([]);
  const [view, setView] = useState("chart");

  console.log(user)
  useEffect(() => {
    const fetchSheetId = async () => {
      try {
        const response = await fetch(`http://localhost:1337/api/getSheetIdByEmail/${user.email}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch sheetId. Status: ${response.status}`);
        }
  
        const data = await response.json();
        setSheetId(data.sheetId);
      } catch (error) {
        console.error('Error fetching sheetId:', error.message);
      }
    };
  
    // Check if user is not null before calling fetchSheetId
    if (user) {
      console.log(user.email);
      fetchSheetId();
    }
  }, [user]);
  

  useEffect(() => {
    const getName = async () => {
      try {
        if (!sheetId) {
          return; // Wait until sheetId is available
        }

        console.log(sheetId)
        console.log('s')

        const key = process.env.REACT_APP_KEY;
        const endpoint = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}?key=${key}`;
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        const data = await response.json();

        if (!data.sheets || !data.sheets.length) {
          throw new Error("No sheets found in the spreadsheet.");
        }

        const names = data.sheets.map((sheet) => sheet.properties.title);
        setSheetNames(names);
        setSelectedSheet(names[0]);
      } catch (error) {
        console.error("Error fetching sheet names:", error.message);
      }
    };

    getName();
  }, [sheetId]);

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
