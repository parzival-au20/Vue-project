import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import TodoView from '../views/TodoView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: MainView
  },
  {
    path: '/todos',
    name: 'todos',
    component: TodoView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
