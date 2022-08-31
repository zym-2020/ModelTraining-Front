import router from '@/router/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { RouteLocationNormalized } from 'vue-router'
import { getToken } from '@/utils/auth'
import { getById, getUserInfo } from '@/api/request'
import { notice } from './utils/notice'

NProgress.configure({ showSpinner: false })
router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: any) => {
    NProgress.start()
    // console.log('token', getToken())
    if (getToken() != null) {
        if (to.path === '/modelTrainingCourse/submission/login') {
            next({ path: '/modelTrainingCourse/submission' })
            NProgress.done()
        } else {
            if (to.name === 'Apply') {
                const data = await getById()
                if (data != null && (data as any).code === 0) {
                    if (data.data.teamId && data.data.teamId != '') {
                        to.params.apply = data.data
                        next()
                        NProgress.done()
                    } else {
                        notice('warning', '警告', '您尚未报名模型竞赛，暂无访问权限')
                        next('/modelTrainingCourse/submission/404')
                        NProgress.done()
                    }
                }
            } else if (to.name === 'Homework') {
                const data = await getUserInfo()
                if (data != null && (data as any).code === 0) {
                    if (data.data.memberId != '') {
                        next()
                        NProgress.done()

                    } else {
                        notice('warning', '警告', '培训班您尚未报名，暂无访问权限')
                        next('/modelTrainingCourse/submission/404')
                        NProgress.done()
                    }
                }
            } else {
                next()
                NProgress.done()
            }
        }
    } else {
        if (to.path === '/modelTrainingCourse/submission/login') {
            next()
            NProgress.done
        } else {
            next('/modelTrainingCourse/submission/login')
            NProgress.done
        }
    }
    NProgress.done()

})