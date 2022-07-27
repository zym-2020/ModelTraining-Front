import { get, post, del, patch } from './axios'
import { getToken } from '@/utils/auth';
import { notice } from '@/utils/notice'
import axios from 'axios'

//user相关接口
export async function login(jsonData: { email: string, name: string }) {
    return await post(`/user/login`, jsonData)
}

export async function getUserInfo() {
    return await get(`/user/getUserInfo`)
}

export async function getTeamInfo() {
    return await get(`/user/getTeamInfo`)
}

//homework接口
export async function mergeFiles(jsonData: { number: string; name: string; total: number }) {
    return await post(`/homework/mergeFiles`, jsonData)
}

export async function checkState(key: string) {
    return await get(`/homework/checkState/${key}`)
}

export async function clearTemp(number: string) {
    return await post(`/homework/clearTemp/${number}`)
}

export async function getHomework() {
    return await get(`/homework/getHomework`)
}

export async function removeFile(number: string) {
    return await del(`/homework/removeFile/${number}`)
}

export async function commit(number: string) {
    return await patch(`/homework/commit/${number}`)
}

export async function download(number: string, name: string) {
    axios.get(`/modelTrainingCourse/submission/model/homework/download/${number}`, {
        responseType: 'blob',
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    }).then(res => {
        if (res.data.size > 0) {
            const blob = new Blob([res.data], { type: res.headers['content-type'] })
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            // const fileName = decodeURIComponent(res.headers['content-disposition'].match(/filename=(.*)/)[0]);
            const fileName = name
            link.href = url; // 下载元素url赋值
            link.download = fileName; // 下载后文件名
            document.body.appendChild(link); // 浏览器增加元素
            link.click(); // 点击下载
            link.remove(); // 下载完成移除元素
            window.URL.revokeObjectURL(link.href); // 用完之后使用URL.revokeObjectURL()释放
        } else {
            notice("error", "失败", "下载失败！")
        }
    }).catch(err => {
        console.log(err)
        notice("error", "失败", "下载失败！")
    })
}

//Apply相关接口
export async function getByTeamId() {
    return await get(`/apply/getByTeamId`)
}

export async function saveDescription(id: string, jsonData: any) {
    return await patch(`/apply/saveDescription/${id}`, jsonData)
}

export async function saveProcess(id: string, jsonData: any) {
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