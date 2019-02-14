import Vue from 'vue'
import Router from 'vue-router'
import Base from './views/Base'
import Symbol from './views/Element'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  // base: '/',
  routes: [
      {
    path: '*',
    redirect: 'list'
    },
    {
      path: '',
      name: 'base',
      redirect: '/list',
      component: Base,
      children: [
          {
        path: '/list',
        name: 'list',
        component: () => import('./views/List.vue')
        },
        {
          path: '/element/:id',
          name: 'element',
          component: () => import('./views/Element.vue')
        },
      ],
    },
    
  
  ]
})
