import axios from "axios";
import { getUserSession, getUserToken } from "./localStorage.utils";


const URL_API =
      window.location.hostname === "makisolutions.netlify.app"
      ? "https://maki.up.railway.app"
      : "http://localhost:3001"


export const api = axios.create({
  baseURL: URL_API,
  headers: {
    "Content-Type": "application/json",
    Authorization: getUserSession() ? `Bearer ${getUserToken()}` : null,
  }
});