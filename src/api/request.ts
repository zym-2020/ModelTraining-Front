import { get, post, del, patch } from './axios'

export const login = async (jsonData: { email: string; password: string }) => {
    return await post(`/user/login`, true, jsonData);
  };
  
  export const getUserInfo = async () => {
    return await get(`/user/getUserInfo`, true);
  };

