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
    path: '/install',
    name: 'install',
    component: () => import('./pages/InstallPage.vue'),
  },
  {
    path: '/install/requirements',
    name: 'install-requirements',
    component: () => import('./pages/install/RequirementsPage.vue'),
  },
  {
    path: '/install/sites',
    name: 'install-sites',
    component: () => import('./pages/install/SitesPage.vue'),
  },
  {
    path: '/install/backend',
    name: 'install-backend',
    component: () => import('./pages/install/BackendPage.vue'),
  },
  {
    path: '/install/frontend',
    name: 'install-frontend',
    component: () => import('./pages/install/FrontendPage.vue'),
  },
  {
    path: '/install/schedule',
    name: 'install-schedule',
    component: () => import('./pages/install/SchedulePage.vue'),
  },
  {
    path: '/install/firstrun',
    name: 'install-firstrun',
    component: () => import('./pages/install/FirstRunPage.vue'),
  },
  {
    path: '/install/troubleshoot',
    name: 'install-troubleshoot',
    component: () => import('./pages/install/TroubleshootPage.vue'),
  },
  {
    path: '/install/checklist',
    name: 'install-checklist',
    component: () => import('./pages/install/ChecklistPage.vue'),
  },
  {
    path: '/beginner',
    name: 'beginner',
    component: () => import('./pages/BeginnerPage.vue'),
  },
  {
    path: '/beginner/onboarding',
    name: 'beginner-onboarding',
    component: () => import('./pages/beginner/OnboardingPage.vue'),
  },
  {
    path: '/beginner/settings',
    name: 'beginner-settings',
    component: () => import('./pages/beginner/SettingsPage.vue'),
  },
  {
    path: '/beginner/daily',
    name: 'beginner-daily',
    component: () => import('./pages/beginner/DailyPage.vue'),
  },
  {
    path: '/userguide',
    name: 'userguide',
    component: () => import('./pages/UserGuidePage.vue'),
  },
  {
    path: '/userguide/start',
    name: 'userguide-start',
    component: () => import('./pages/userguide/StartPage.vue'),
  },
  {
    path: '/userguide/catalog',
    name: 'userguide-catalog',
    component: () => import('./pages/userguide/CatalogPage.vue'),
  },
  {
    path: '/userguide/order',
    name: 'userguide-order',
    component: () => import('./pages/userguide/OrderPage.vue'),
  },
  {
    path: '/userguide/finance',
    name: 'userguide-finance',
    component: () => import('./pages/userguide/FinancePage.vue'),
  },
  {
    path: '/userguide/service',
    name: 'userguide-service',
    component: () => import('./pages/userguide/ServicePage.vue'),
  },
  {
    path: '/userguide/marketing',
    name: 'userguide-marketing',
    component: () => import('./pages/userguide/MarketingPage.vue'),
  },
  {
    path: '/userguide/site',
    name: 'userguide-site',
    component: () => import('./pages/userguide/SitePage.vue'),
  },
  {
    path: '/userguide/system',
    name: 'userguide-system',
    component: () => import('./pages/userguide/SystemPage.vue'),
  },
  {
    path: '/userguide/logs',
    name: 'userguide-logs',
    component: () => import('./pages/userguide/LogsPage.vue'),
  },
  {
    path: '/userguide/faq',
    name: 'userguide-faq',
    component: () => import('./pages/userguide/FaqPage.vue'),
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
    path: '/devguide/payment',
    name: 'devguide-payment',
    component: () => import('./pages/docs/PaymentPage.vue'),
  },
  {
    path: '/devguide/mail',
    name: 'devguide-mail',
    component: () => import('./pages/docs/MailPage.vue'),
  },
  {
    path: '/devguide/sms',
    name: 'devguide-sms',
    component: () => import('./pages/docs/SmsPage.vue'),
  },
  {
    path: '/devguide/captcha',
    name: 'devguide-captcha',
    component: () => import('./pages/docs/CaptchaPage.vue'),
  },
  {
    path: '/devguide/hook',
    name: 'devguide-hook',
    component: () => import('./pages/docs/HookPage.vue'),
  },
  {
    path: '/devguide/storage',
    name: 'devguide-storage',
    component: () => import('./pages/docs/StoragePage.vue'),
  },
  {
    path: '/devguide/module',
    name: 'devguide-module',
    component: () => import('./pages/docs/ModulePage.vue'),
  },
  {
    path: '/devguide/standards',
    name: 'devguide-standards',
    component: () => import('./pages/docs/StandardsPage.vue'),
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
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('./pages/NotFoundPage.vue') },
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
