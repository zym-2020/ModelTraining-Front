import router from '@/router/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { RouteLocationNormalized } from 'vue-router'
import { getToken } from '@/utils/auth'

NProgress.configure({ showSpinner: false })
router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: any) => {
    NProgress.start()
    // console.log('token', getToken())
    if (getToken() != null) {
        if (to.path === '/login') {
            next({ path: '/' })
            NProgress.done()
        } else {
            next()
            NProgress.done()
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