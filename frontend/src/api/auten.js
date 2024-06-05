import axios from "./axios";

export const registerRequest = (user) => axios.post(`/register`, user);
export const loginRequest = (user) => axios.post(`/login`, user);
export const indicatorRequest = (indicator) => axios.post(`/indicators/create`, indicator);
export const profileRequest = (user) => axios.get(`/profile/:num_doc`, user);
export const updateProfileRequest = (user) => axios.put(`/profile/edit/:num_doc`, user);
export const createGoalRequest = (goalData) => axios.post('/goals/create', goalData);
export const verifyTokenRequest = () => axios.get ('/verify')