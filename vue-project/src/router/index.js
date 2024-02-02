import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// import DataBinding from '../views/DataBinding.vue'
// import DataBinding from '../views/DataBinding2.vue'
// import DataBinding from '../views/DataBinding3.vue'
// import DataBinding from '../views/DataBinding4.vue'
// import DataBinding from '../views/DataBindingList.vue'
// import DataBinding from '../views/EventClick.vue'
// import DataBinding from '../views/EventTodo.vue'
import DataBinding from '../views/ComputedVue.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/binding',
    name: 'binding', // 이름으로도 등록가능
    component: DataBinding
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
