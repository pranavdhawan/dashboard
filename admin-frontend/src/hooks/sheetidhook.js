import { useContext, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../lip/fetch-config';

const useSheetId = () => {
  const { email, sheetId, setSheetId } = useAuth();

  useEffect(() => {
    const fetchSheetId = async () => {
      try {
        const response = await api.get(`https://apnabackend.onrender.com/api/getSheetIdByEmail/${email}`);
        const data = await response.json();

        if (data && data.sheetId) {
          setSheetId(data.sheetId);
        }
      } catch (error) {
        console.error('Error fetching sheetId:', error.message);
      }
    };

    if (!sheetId) {
      fetchSheetId();
    }
  }, [email, sheetId, setSheetId]);

  return sheetId;
};

export default useSheetId;
