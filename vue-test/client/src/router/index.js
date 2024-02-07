import { createRouter, createWebHistory } from 'vue-router'
import Main from '../layouts/MainComponent.vue'
import BoardListView from '../views/BoardListView.vue'
import BoardInfoView from '../views/BoardInfoView.vue'
import BoardInsertView from '../views/BoardInsertView.vue'
import BoardFormView from '../views/BoardFormView.vue'

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main
  },
  {
    path: '/boardList',
    name: 'boardList',
    component: BoardListView
  },
  {
    path: '/boardInfo',
    name: 'boardInfo',
    component: BoardInfoView
  },
  {
    path: '/boardInsert',
    name: 'boardInsert',
    component: BoardInsertView
  },
  {
    path: '/boardForm',
    name: 'boardForm',
    component: BoardFormView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
