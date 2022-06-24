import { createRouter, createWebHistory } from 'vue-router'
import LoginBox from '../components/LoginBox.vue'
import RegisterBox  from '../components/RegisterBox.vue'
import Dashboard from '../components/DashboardView.vue'

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: LoginBox,
        },
        {
            path: '/register',
            name: 'Register',
            component: RegisterBox,
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard,
        }
    ]
})