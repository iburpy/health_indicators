import axios from "./axios";

export const registerRequest = (user) => axios.post(`/register`, user);
export const loginRequest = (user) => axios.post(`/login`, user);
export const indicatorRequest = (indicator) => axios.post(`/indicators/create`, indicator);
export const indicatorUserRequest = (user_num_doc) => axios.get(`indicator/${user_num_doc}`, user_num_doc);
export const profileRequest = (user_num_doc) => axios.get(`/profile/${user_num_doc}`, user_num_doc);
export const contactRequest = (contact) => axios.get(`/contacts`, contact);
export const updateProfileRequest = (user) => axios.put(`/profile/edit/:num_doc`, user);
export const createGoalRequest = (goalData) => axios.post('/goals/create', goalData);
export const verifyTokenRequest = (token) => axios.get ('/verify',{headers:{token}})