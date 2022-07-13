import { MutationTree } from 'vuex'
import { UserState } from './userState'

export type Mutations<S = UserState> = {
    SET_NAME(state: S, name: string): void
    SET_TEAM_ID(state: S, teamId: string): void
}

export const userMutations: MutationTree<UserState> & Mutations = {
    SET_NAME(state: UserState, name: string) {
        state.name = name
    },
    SET_TEAM_ID(state: UserState, teamId: string) {
        state.teamId = teamId
    },
}