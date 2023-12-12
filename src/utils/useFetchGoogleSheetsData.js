import { useEffect, useState } from 'react';
import axios from 'axios';


const useFetchGoogleSheetsData = (spreadsheetId, range) => {
    const [data, setData] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`,
            {
              headers: {
                Authorization: `Bearer AIzaSyBew1eFXlK1t8U_-DncRstx_m7lRxMTEFk`,
              },
            }
          );
  
          setData(response.data.values);
        } catch (error) {
          console.error('Error fetching Google Sheets data:', error);
        }
      };
  
      fetchData();
    }, [spreadsheetId, range]);
  
    return data;
  };

  export default useFetchGoogleSheetsData;

