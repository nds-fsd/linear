import axios from "axios";
import { getUserSession, getUserToken } from "./localStorage.utils";


const URL_API =
      window.location.hostname === "https://makisolutions.netlify.app/"
      ? "https://makisolutions.netlify.app/"
      : "http://localhost:3001"


export const api = axios.create({
  baseURL: URL_API,
  headers: {
    "Content-Type": "application/json",
    Authorization: getUserSession() ? `Bearer ${getUserToken()}` : null,
  }
});