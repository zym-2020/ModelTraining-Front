import { Mutations } from './userMutations'
import { ActionTree, ActionContext } from 'vuex'
import { UserState } from './userState'
import { RootState } from '@/store'
import { notice } from '@/utils/notice';
import { setToken } from '@/utils/auth'
import { login } from '@/api/request'
import router from '@/router'

type AugmentedActionContext = {
    ['commit']<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>
} & Omit<ActionContext<UserState, RootState>, 'commit'>

export interface Actions {
    ['login']({ commit }: AugmentedActionContext, userInfo: { teamId: string, name: string }): Promise<void>
    logout({ commit }: AugmentedActionContext): void
}

export const userActions: ActionTree<UserState, RootState> & Actions = {
    async login({ commit }, userInfo) {
        let data = await login(userInfo) as any
        if (data != null) {
            if (data.code === -6) {
                notice('error', '登录失败', data.msg)
            } else if (data.code === -2) {
                notice('error', '登录失败', '账号不存在！')
            } else if (data.code === 0) {
                setToken(data.data.token)
                notice('success', '成功', '登录成功')
                commit("SET_TEAM_ID", data.data.info.teamId)
                commit("SET_NAME", data.data.info.name)
                router.push({ path: '/' })
            } else {
                notice('error', '失败', '登录失败！')
            }
        }
    },

    logout({ commit }) {
        localStorage.clear()
        commit("SET_NAME", "")
        commit("SET_TEAM_ID", '')
        router.push({ path: '/login' })
    },


}