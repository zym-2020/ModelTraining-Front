import router from '@/router/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { RouteLocationNormalized } from 'vue-router'
import { getToken } from '@/utils/auth'
import { getByTeamId } from '@/api/request'

NProgress.configure({ showSpinner: false })
router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: any) => {
    NProgress.start()
    // console.log('token', getToken())
    if (getToken() != null) {
        if (to.path === '/login') {
            next({ path: '/' })
            NProgress.done()
        } else {
            if (to.name === 'Apply') {
                const data = await getByTeamId()
                if (data != null && (data as any).code === 0) {
                    to.params.apply = data.data
                    next()
                    NProgress.done()
                }
            } else {
                next()
                NProgress.done()
            }
        }
    } else {
        if (to.path === '/login') {
            next()
            NProgress.done
        } else {
            next('/login')
            NProgress.done
        }
    }
    NProgress.done()

})