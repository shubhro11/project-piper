import axios from "axios";

export const authApi = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
});

export const musicApi = axios.create({
  baseURL: "http://localhost:3002/api/music",
  withCredentials: true,
});