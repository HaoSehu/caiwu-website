import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'

const routes = [
  { path: '/', name: 'home', component: HomePage },
  {
    path: '/features',
    name: 'features',
    component: () => import('./pages/FeaturesPage.vue'),
  },
  {
    path: '/architecture',
    name: 'architecture',
    component: () => import('./pages/ArchitecturePage.vue'),
  },
  {
    path: '/compare',
    name: 'compare',
    component: () => import('./pages/ComparePage.vue'),
  },
  {
    path: '/scenarios',
    name: 'scenarios',
    component: () => import('./pages/ScenariosPage.vue'),
  },
  {
    path: '/devguide',
    name: 'devguide',
    component: () => import('./pages/DevGuidePage.vue'),
  },
  {
    path: '/devguide/quickstart',
    name: 'devguide-quickstart',
    component: () => import('./pages/docs/QuickStartPage.vue'),
  },
  {
    path: '/devguide/backend',
    name: 'devguide-backend',
    component: () => import('./pages/docs/BackendPage.vue'),
  },
  {
    path: '/devguide/api',
    name: 'devguide-api',
    component: () => import('./pages/docs/ApiPage.vue'),
  },
  {
    path: '/devguide/frontend',
    name: 'devguide-frontend',
    component: () => import('./pages/docs/FrontendPage.vue'),
  },
  {
    path: '/devguide/plugin',
    name: 'devguide-plugin',
    component: () => import('./pages/docs/PluginPage.vue'),
  },
  {
    path: '/devguide/database',
    name: 'devguide-database',
    component: () => import('./pages/docs/DatabasePage.vue'),
  },
  {
    path: '/devguide/deploy',
    name: 'devguide-deploy',
    component: () => import('./pages/docs/DeployPage.vue'),
  },
  {
    path: '/devguide/verify',
    name: 'devguide-verify',
    component: () => import('./pages/docs/VerifyPage.vue'),
  },
  {
    path: '/demo',
    name: 'demo',
    component: () => import('./pages/DemoPage.vue'),
  },
  {
    path: '/start',
    name: 'start',
    component: () => import('./pages/StartPage.vue'),
  },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, _from, saved) {
    if (saved) return saved
    if (to.hash) return { el: to.hash, top: 80, behavior: 'smooth' }
    return { top: 0 }
  },
})
