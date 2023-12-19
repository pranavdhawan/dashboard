// userApi.js

// Replace with your actual API endpoint
const USER_API_ENDPOINT = "http://localhost:1337/"; 

// Function to fetch user information
// export const getUserSheetId = async (email, password) => {
//   try {
//     const response = await fetch(USER_API_ENDPOINT, {
//       method: "GET",
//       headers: {
//         // Add any headers you need, such as authorization headers
//         "Content-Type": "application/json",
//         // Add any authentication token if needed
//         // "Authorization": `Bearer ${yourAuthToken}`,
//       },
//       body: JSON.stringify({
//         email,
//         password,
//       }),
//       // Add any other options like body for a POST request
//     });

//     if (!response.ok) {
//       throw new Error(`Failed to fetch user data. Status: ${response.status}`);
//     }

//     const userData = await response.json();

//     console.log(email)
//     return userData;
//   } catch (error) {
//     console.error("Error fetching user data:", error.message);
//     // Handle errors or rethrow if needed
//     throw error;
//   }
// };


export const fetchUserSheetId = async (email, password) => {
    console.log(email)
    console.log(password)
    try {
      const sheetIdResponse = await fetch('http://localhost:1337/api/fetchSheetId', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const sheetIdData = await sheetIdResponse.json();

      console.log(sheetIdData)
      if (sheetIdData.sheetId) {
        // Store user's sheetId in localStorage or use it as needed
        return sheetIdData.sheetId
      } 
    } catch (error) {
      console.error('Error fetching user\'s sheetId:', error.message);
    }
  }
