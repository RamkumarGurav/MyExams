import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  // withCredentials: true,
});

//--------------------------------------------------------

// AUTHSLICE
//--------------------------------------------------------
export const registerUser = (formValue) =>
  API.post("/users/register", formValue);

export const login = (formValue) => API.post("/users/login", formValue);

export const logout = () => API.get("/users/logout");
//--------------------------------------------------------
export const createOrder = (formValue, token) => API.post(`/orders`, formValue);
