import axios from "axios";

const API_BASE_URL = "https://api.redseam.redberryinternship.ge/api";

export const appClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
