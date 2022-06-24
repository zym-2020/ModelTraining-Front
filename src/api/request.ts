import { get, post, del, patch } from './axios'

//user相关接口
export async function login(jsonData: { account: string, password: string }) {
    return await post(`/user/login`, jsonData)
}

