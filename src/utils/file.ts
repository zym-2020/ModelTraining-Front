import { getToken } from '@/utils/auth'
import { checkState } from '@/api/request'
import axios from 'axios';


export function createFileChunk(file: File) {
    const size = 5242880
    const fileChunkList = []
    let count = 0
    while (count < file.size) {
        fileChunkList.push({
            file: file.slice(count, count + size),
        })
        count += size
    }
    return fileChunkList
}

export async function handlePostFiles(chunkList: string[], fileChunk: { file: Blob }[], number: string, percentage: any) {
    return new Promise((res, rej) => {
        const totalChunks = chunkList.length
        let successCount = 0
        const handle = () => {
            if (chunkList.length) {
                const name = chunkList.shift()
                const token = getToken()
                const formData = new FormData()
                formData.append("file", fileChunk[parseInt(name as string)].file)
                formData.append("name", name as string)
                formData.append("number", number)
                axios.post('/modelTrainingCourse/submission/model/homework/uploadFile', formData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(response => {
                    if (response.status === 200 && response.data.code === 0) {
                        successCount++
                        percentage.value = parseFloat(((totalChunks - chunkList.length) / totalChunks * 100).toFixed(1))
                        handle()
                    } else {
                        successCount++
                        chunkList.push(name as string)
                        handle()
                    }
                }).catch(err => {
                    successCount++
                    chunkList.push(name as string)
                    handle()
                })
            }
            if (successCount >= totalChunks) {
                res(undefined);
            }
        }
        for (let i = 0; i < 5; i++) {
            handle();
        }
    })
}

export async function checkMergeStatus(key: string, callback: (res: number) => void) {
    async function handle() {
        const response = await new Promise(async (res, rej) => {
            res(await checkMerge(key));
        });
        if (response === 0) {
            setTimeout(async () => {
                await handle();
            }, 2000);
        } else {
            callback(response as number)
        }
    }
    await handle()
}

export async function checkMerge(key: string) {
    const state = await checkState(key)
    return state.data
}

