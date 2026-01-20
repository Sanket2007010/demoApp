import axios from "axios";

const API_BASE_URL = "http://localhost:5000";
//const API_BASE_URL = "http://192.168.1.5:5000";
// for Android emulator

// If using physical device, use your PC IP like:
// const API_BASE_URL = "http://192.168.1.5:5000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const createTask = (input) =>
  api.post("/ai/create-task", { input });


export const getSmartSummary = () => api.get("/summary");

export const autoPriority = (data) => api.post("/auto-priority", data);

export const generateDescription = (title) =>
  api.post("/ai/description", { title });

export default api;
