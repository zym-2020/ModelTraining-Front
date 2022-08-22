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
export async function saveComputeResources(id: string, jsonData: any) {
    return await patch(`/apply/saveComputeResources/${id}`, jsonData)
}

export async function deleteComputeResources(id: string, jsonData: any) {
    return await patch(`/apply/deleteComputeResources/${id}`, jsonData)
}
export async function updateComputeResources(id: string, jsonData: any) {
    return await patch(`/apply/updateComputeResources/${id}`, jsonData)
}

export async function updateModelResources(id: string, jsonData: any) {
    return await patch(`/apply/updateModelResources/${id}`, jsonData)
}
export async function updateDataResources(id: string, jsonData: any) {
    return await patch(`/apply/updateDataResources/${id}`, jsonData)
}
export async function addResearcher(id: string, jsonData: any) {
    return await patch(`/apply/addResearcher/${id}`, jsonData)
}
export async function updateResearcher(id: string, jsonData: any) {
    return await patch(`/apply/updateResearcher/${id}`, jsonData)
}
export async function deleteResearcher(id: string, jsonData: any) {
    return await patch(`/apply/deleteResearcher/${id}`, jsonData)
}
export async function addSummary(id: string, jsonData: any) {
    return await patch(`/apply/addSummary/${id}`, jsonData)
}
export async function deleteSummary(id: string, jsonData: any) {
    return await patch(`/apply/deleteSummary/${id}`, jsonData)
}
export async function uploadData(jsonData: FormData) {
    return await post('http://221.226.60.2:8082/data', jsonData)
}

export async function deleteData(id: string) {
    return await del(id)
}

export async function checkVideoState(key: string) {
    return await get(`/apply/checkState/${key}`)
}

export async function clearVideoTemp(uuid: string) {
    return await post(`/apply/clearTemp/${uuid}`)
}

export async function mergeSchemeVideoFiles(id: string, jsonData: { uuid: string; name: string; total: number }) {
    return await post(`/apply/mergeSchemeFiles/${id}`, jsonData)
}

export async function removeSchemeVideoFile(id: string) {
    return await del(`/apply/removeSchemeFile/${id}`)
}

export async function mergePurposeVideoFiles(id: string, jsonData: { uuid: string; name: string; total: number }) {
    return await post(`/apply/mergePurposeFiles/${id}`, jsonData)
}

export async function removePurposeVideoFile(id: string) {
    return await del(`/apply/removePurposeFile/${id}`)
}
export async function mergeBackgroundVideoFiles(id: string, jsonData: { uuid: string; name: string; total: number }) {
    return await post(`/apply/mergeBackgroundFiles/${id}`, jsonData)
}

export async function removeBackgroundVideoFile(id: string) {
    return await del(`/apply/removeBackgroundFile/${id}`)
}
export async function mergeResultValidationVideoFiles(id: string, jsonData: { uuid: string; name: string; total: number }) {
    return await post(`/apply/mergeResultValidationFiles/${id}`, jsonData)
}

export async function removeResultValidationVideoFile(id: string) {
    return await del(`/apply/removeResultValidationFile/${id}`)
}

export async function mergeResultVisualizationVideoFiles(id: string, jsonData: { uuid: string; name: string; total: number }) {
    return await post(`/apply/mergeResultVisualizationFiles/${id}`, jsonData)
}

export async function removeResultVisualizationVideoFile(id: string) {
    return await del(`/apply/removeResultVisualizationFile/${id}`)
}
export async function mergeConclusionVideoFiles(id: string, jsonData: { uuid: string; name: string; total: number }) {
    return await post(`/apply/mergeConclusionFiles/${id}`, jsonData)
}

export async function removeConclusionVideoFile(id: string) {
    return await del(`/apply/removeConclusionFile/${id}`)
}
export async function mergeProcessVideoFiles(id: string,  jsonData: {  process: any; uuid: string; name: string; total: number }) {
    return await post(`/apply/mergeProcessFiles/${id}`, jsonData)
}

export async function removeProcessVideoFile(id: string, jsonData: any) {
    return await del(`/apply/removeProcessFile/${id}`, jsonData)
}
export async function getProcessLength(id: string) {
    return await get(`/apply/getProcessLength/${id}`)
}
export async function deleteDataLocation(id: string, jsonData: any) {
    return await post(`/apply/deleteDataLocation/${id}`,jsonData)
}
export async function deleteModelStorage(id: string, jsonData: any) {
    return await post(`/apply/deleteModelStorage/${id}`,jsonData)
}
export async function deleteModelcodeContent(id: string, jsonData: any) {
    return await post(`/apply/deleteModelcodeContent/${id}`,jsonData)
}
export async function deleteresultValidationStorage(id: string) {
    return await post(`/apply/deleteresultValidationStorage/${id}`)
}
export async function deleteresultVisualizationStorage(id: string) {
    return await post(`/apply/deleteresultVisualizationStorage/${id}`)
}
//homework
export async function checkState(key: string) {
    return await get(`/homework/checkState/${key}`)
}