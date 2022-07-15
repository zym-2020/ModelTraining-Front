import { get, post, del, patch } from './axios'

//user相关接口
export async function login(jsonData: { teamId: string, name: string }) {
    return await post(`/user/login`, jsonData)
}

export async function getUserInfo() {
    return await get(`/user/getUserInfo`)
}

export async function getTeamInfo() {
    return await get(`/user/getTeamInfo`)
}


//Apply相关接口
export async function getByTeamId() {
    return await get(`/apply/getByTeamId`)
}

export async function saveDescription(id: string, jsonData: any) {
    return await patch(`/apply/saveDescription/${id}`, jsonData)
}

export async function savaMethod(id: string, jsonData: any) {
    return await patch(`/apply/savaMethod/${id}`, jsonData)
}

export async function saveResult(id: string, jsonData: any) {
    return await patch(`/apply/saveResult/${id}`, jsonData)
}