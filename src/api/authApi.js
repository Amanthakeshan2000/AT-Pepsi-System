// import axios from 'axios';

// const API_BASE_URL = 'https://apidirect.techwirelanka.com/api/User/login';

// export const login = async (userName, password) => {
//   try {
//     const response = await axios.post(API_BASE_URL, {
//       userName,
//       password,
//     });

//     // Extract tokens from response
//     const { accessToken, refreshToken } = response.data;

//     // Return the tokens or handle them as needed
//     return { accessToken, refreshToken };
//   } catch (error) {
//     console.error('Error logging in:', error.response?.data || error.message);
//     throw error; // Propagate error for the calling function to handle
//   }
// };
