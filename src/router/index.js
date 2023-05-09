import Vue from 'vue'
import VueRouter from 'vue-router'

// Routes
import { canNavigate } from '@/libs/acl/routeProtection'
import { isUserLoggedIn, getUserData, getHomeRouteForLoggedInUser } from '@/auth/utils'
import apps from './routes/apps'
import dashboard from './routes/dashboard'
import uiElements from './routes/ui-elements/index'
import pages from './routes/pages'
import chartsMaps from './routes/charts-maps'
import formsTable from './routes/forms-tables'
import others from './routes/others'
import timekeeping from './routes/timekeeping'
import manage from './routes/manage'
import system from './routes/system'
import navMenuItems from '@/navigation/vertical'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    { path: '/', redirect: { name: 'dashboard' } },
    ...timekeeping,
    ...system,
    ...manage,
    ...dashboard,
    ...pages,
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

router.beforeEach((to, _, next) => {
  const isLoggedIn = isUserLoggedIn()
  const userRoles = JSON.parse(localStorage.getItem('userData'))?.role;
  const excludePages = pages.map(x => x.path);
  let isValidRoute = true;

  if (!excludePages.includes(to.path) && userRoles[0] !== "*:*:*") {
    const path = to.path === '/dashboard' ? `/dashboard/dashboard` : to.path;
    const userPaths = userRoles?.map(x => '/' + x.split(':').slice(0, 2).join('/'));
    isValidRoute = userPaths?.includes(path);
  }
  
  if (!canNavigate(to) || !isValidRoute) {
    // Redirect to login if not logged in
    if (!isLoggedIn) 
      return next({ name: 'auth-login' })

    // If logged in => not authorized
    return next({ name: 'misc-not-authorized' })
  }

  // Redirect if logged in
  if (to.meta.redirectIfLoggedIn && isLoggedIn) {
    const userData = getUserData()
    next(getHomeRouteForLoggedInUser(userData ? userData.role : null))
  }

  return next()
})

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
