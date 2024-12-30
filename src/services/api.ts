import axios from "axios";
import { User } from "../types/user.ts";
import { API_ENDPOINTS } from "../constants/api.ts";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchUsers = async (page: number, limit: number): Promise<any> => {
  const response = await axios.get<any>(BASE_URL+API_ENDPOINTS.USERS, {
    params: { _page: page, _limit: limit },
  });
  return response.data;
};

export const fetchUserDetails = async (id: number): Promise<User> => {
  const response = await axios.get<User>(BASE_URL+API_ENDPOINTS.USER_DETAILS(id));
  return response.data;
};