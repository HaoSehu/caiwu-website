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
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _from, saved) {
    if (saved) return saved
    if (to.hash) return { el: to.hash, top: 80, behavior: 'smooth' }
    return { top: 0 }
  },
})
