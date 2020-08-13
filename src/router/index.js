import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('../components/Login.vue')
const Chat = () => import('../components/Chat.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/Login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/chat/:name/:img',
    component: Chat
  }
]

const router = new VueRouter({
  mode: 'history',
  routes

})

export default router
