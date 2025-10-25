import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL; // ✅ from .env

export const testConnection = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/test`);
    console.log("✅ Connected:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("❌ Connection failed:", error.message);
    return null;
  }
};
