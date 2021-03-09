import { createRouter, createWebHistory } from 'vue-router'
import Tasks from '../views/Tasks.vue'
import Task from '../views/Task.vue'
import New from '../views/New.vue'
import NotFound from '../views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Tasks
    },
    {
      path: '/task/:taskId?',
      component: Task,
      props: true,
      beforeEnter: (to, from, next) => {
        if (to.params.taskId) {
          next()
        } else {
          next({ name: 'home' })
        }
      }
    },
    {
      path: '/new',
      component: New
    },
    {
      path: '/:notFound(.*)',
      component: NotFound
    }
  ],
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

export default router
