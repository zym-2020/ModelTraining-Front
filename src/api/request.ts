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

export async function saveProcess (id: string, jsonData: any) {
    return await patch(`/apply/saveProcess/${id}`, jsonData)
}

export async function saveResult(id: string, jsonData: any) {
    return await patch(`/apply/saveResult/${id}`, jsonData)
}

export async function getResource(id: string) {
    return await get(`/apply/getResource/${id}`)
}

export async function saveModelResources(id: string, jsonData: any) {
    return await patch(`/apply/saveModelResources/${id}`, jsonData)
}

export async function deleteModelResources(id: string, jsonData: any) {
    return await patch(`/apply/deleteModelResources/${id}`, jsonData)
}

export async function saveDataResources(id: string, jsonData: any) {
    return await patch(`/apply/saveDataResources/${id}`, jsonData)
}

export async function deleteDataResources(id: string, jsonData: any) {
    return await patch(`/apply/deleteDataResources/${id}`, jsonData)
}

export async function saveComputeResource(id: string, jsonData: any) {
    return await patch(`/apply/saveComputeResource/${id}`, jsonData)
}
export async function updateModelResources(id: string, jsonData: any) {
    return await patch(`/apply/updateModelResources/${id}`, jsonData)
}
export async function updateDataResources(id: string, jsonData: any) {
    return await patch(`/apply/updateDataResources/${id}`, jsonData)
}