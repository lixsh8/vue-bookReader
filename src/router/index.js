import Vue from 'vue'
import Router from 'vue-router'
import EPub from '@/components/EPub'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/epub'
    },
    {
      path: '/epub',
      name: 'EPub',
      component: EPub
    }
  ]
})
