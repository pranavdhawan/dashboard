import axios from 'axios';

export const api = axios.create({
  // baseURL: 'https://hotel-booking-api-rho.vercel.app/api', 
  baseURL:"https://apnabackend.onrender.com/",
  withCredentials: true

});