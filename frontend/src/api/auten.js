import axios from "axios";

const API = " http://localhost:3001/api";

export const registerRequest = (user) => axios.post(`${API}/register`, user);
export const loginRequest = (user) => axios.post(`${API}/login`, user);
export const indicatorRequest = (user) => axios.post(`${API}/indicators/create`, user)