import Vue from 'vue'
import VueRouter from 'vue-router'
/*import Home from '../views/Home.vue'*/
const Homes = () =>import('../views/home/Homes')
const Category = () =>import('../views/category/Category')
const Cart = () =>import('../views/cart/Cart')
const Profile = () =>import('../views/profile/Profile')
const Detail = () =>import('../views/detail/Detail')

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '',
    redirect:'/homes'
  },
  {
    path: '/homes',
    component:Homes
  },
  {
    path: '/category',
    component:Category
  },
  {
    path: '/cart',
    component:Cart
  },
  {
    path: '/profile',
    component:Profile
  },
  {
    path: '/detail/:iid',
    component:Detail
  }

]

const router = new VueRouter({
  routes,
  mode:'history'
})

export default router
