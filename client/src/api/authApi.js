// src/api/authApi.js
import api from "./axiosInstance.js"

// Login
export const loginApi = (email, password) => {
    return api.post("/auth/login", { email, password })
}

// Signup
export const signupApi = (data) => {
    return api.post("/auth/signup", data)
}

// Logout
export const logoutApi = () => {
    return api.post("/auth/logout")
}
  

// Fetch current user
export const fetchMeApi = () => {
    return api.get("/user/me")
}
 
