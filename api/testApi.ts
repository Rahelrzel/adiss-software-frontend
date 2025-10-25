import axios from "axios";

const API_URL = "https://adiss-software-backend.onrender.com/"; // change to your actual backend route

export const testConnection = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log("✅ Backend connected successfully:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("❌ Backend connection failed:", error.message);
    return null;
  }
};  
