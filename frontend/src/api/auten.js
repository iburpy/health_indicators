import axios from "./axios";

export const registerRequest = (user) => axios.post(`/register`, user);
export const loginRequest = (user) => axios.post(`/login`, user);
export const indicatorRequest = (user) => axios.post(`/indicators/create`, user);
export const profileRequest = (user) => axios.get(`/profile/:num_doc`, user);
export const updateProfileRequest = (user) => axios.put(`/profile/edit/:num_doc`, user);
export const verifyTokenRequest = () => axios.get ('/verify')