import { createRouter, createWebHistory } from 'vue-router'
import { userAuth } from '../stores/auth.store';

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home', 
            component: () => import("@/components/LoginBox.vue")
        },
        {
            path: '/register',
            name: 'Register',
            component: () => import("@/components/RegisterBox.vue")
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: () => import("@/components/DashboardView.vue")
        }
    ]
})

router.beforeEach((to) => {
    
    const publicPages = ['/', '/register']
    const authRequired = !publicPages.includes(to.path);

    const store = userAuth()

    if (!authRequired && store.user) {
        return '/dashboard';
    }

    if (authRequired && !store.user) {        
        store.returnUrl = to.fullPath;
        return '/';
    }
})