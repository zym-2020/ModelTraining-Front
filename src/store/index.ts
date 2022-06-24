import { createStore } from 'vuex'
import { UserState } from './user/userState'
import { UserStore, store as user } from './user'



export interface RootState {
  user: UserState
}

export type Store = UserStore<Pick<RootState, 'user'>>

export const store = createStore({
  modules: {
    user
  }
})

// export function useStore(): Store {
//   return store as Store
// }
