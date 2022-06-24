import { MutationTree } from 'vuex'
import { UserState } from './userState'

export type Mutations<S = UserState> = {
    SET_NAME(state: S, name: string): void
    SET_ACCOUNT(state: S, account: string): void
}

export const userMutations: MutationTree<UserState> & Mutations = {
    SET_NAME(state: UserState, name: string) {
        state.name = name
    },
    SET_ACCOUNT(state: UserState, account: string) {
        state.account = account
    },
}