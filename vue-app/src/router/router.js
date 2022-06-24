import { createRouter, createWebHistory } from 'vue-router'
import { userAuth } from '../stores/auth.store';
import LoginBox from '../components/LoginBox.vue'
import RegisterBox  from '../components/RegisterBox.vue'
import Dashboard from '../components/DashboardView.vue'

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            meta: { title: 'Welcome to Weather App' },
            component: LoginBox,
        },
        {
            path: '/register',
            name: 'Register',
            meta: { title: 'Register' },
            component: RegisterBox,
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            meta: { title: 'Login Temperatures' },
            component: Dashboard,
        }
    ]
})

router.beforeEach((to) => {
    //console.log(to)
    const publicPages = ['/', '/register']
    const authRequired = !publicPages.includes(to.path);

    const store = userAuth()
    
    if (!authRequired && store.user) {
        return '/dashboard';
    }

    if (authRequired && !store.user) {
        console.log(authRequired)
        store.returnUrl = to.fullPath;
        return '/';
    }
})