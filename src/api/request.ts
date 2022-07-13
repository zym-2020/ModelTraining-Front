import { get, post, del, patch } from './axios'

//user相关接口
export async function login(jsonData: { teamId: string, name: string }) {
    return await post(`/user/login`, jsonData)
}


//Apply相关接口
export async function getByTeamId() {
    return await get(`/apply/getByTeamId`)
}

export async function saveDescription(id: string, jsonData: any) {
    return await patch(`/apply/saveDescription/${id}`, jsonData)
}
