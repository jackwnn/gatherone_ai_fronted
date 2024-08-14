import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: (to) => {
      return '/home/dialogue'
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home/index'),
    children: [
      {
        path: '/home/dialogue',
        name: 'dialogue',
        component: () => import('@/views/Home/dialogue')
      },
      {
        path: '/home/work/writing',
        name: 'writing',
        component: () => import('@/views/Home/work/writing')
      },
      {
        path: '/home/work/makePPT',
        name: 'makePPT',
        component: () => import('@/views/Home/work/makePPT')
      },
      {
        path: '/home/work/mindMap',
        name: 'mindMap',
        component: () => import('@/views/Home/work/mindMap')
      },
      {
        path: '/home/painting/vincentDiagram',
        name: 'vincentDiagram',
        component: () => import('@/views/Home/painting/vincentDiagram')
      },
      {
        path: '/home/voice/audiotoText',
        name: 'audiotoText',
        component: () => import('@/views/Home/voice/audiotoText')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior: () => {
    history.pushState(null, null, document.URL)
  }
})

export default router
