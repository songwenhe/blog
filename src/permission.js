import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import { notEmpty } from '@/utils'
NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()
  // set page title
  document.title = getPageTitle(to.meta.title)
  const user = store.getters.currentUser
  const isAuth = user.state === 1
  // console.log(to, from)
  if (to.meta.notLogin) {
    next()
  } else {
    if (notEmpty(user)) {
      next()
    } else {
      if (to.name !== 'login') {
        next({ name: 'login' })
      } else {
        next()
      }
    }

  }
  // if (notEmpty(user)) {
  //   console.log(user);
  //   console.log('to :>> ', to);
  //   console.log('from :>> ', from);
  //   if (!isAuth) {
  //     if (to.meta.page) {
  //       next()
  //     } else {
  //       next(false)
  //     }
  //   } else {
  //     next()
  //   }
  //   NProgress.done()

  // } else {

  //   next()
  //   NProgress.done()
  // }
  next()
  NProgress.done()
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
