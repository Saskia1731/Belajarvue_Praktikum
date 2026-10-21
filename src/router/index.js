
import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Browse from '@/views/Browse.vue'
import Category from '@/views/Category.vue'
import Contact from '@/views/Contact.vue'
import EventList from '@/views/EventList.vue'
import EventDetail from '@/views/EventDetail.vue'

import DashboardLayout from '@/layouts/DashboardLayout.vue'
import Dashboard from '@/views/Dashboard.vue'
import EventManagement from '@/views/EventManagement.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/about', name: 'about', component: About },
    { path: '/browse', name: 'browse', component: Browse },
    { path: '/category', name: 'category', component: Category },
    { path: '/contact', name: 'contact', component: Contact },

    { path: '/events', name: 'events', component: EventList },
    {
      path: '/events/:id',
      name: 'event-detail',
      component: EventDetail
    },

    {
      path: '/dashboard',
      component: DashboardLayout,
      children: [
        {
          path: '',
          name: 'dashboard',
          component: Dashboard
        },
        {
          path: 'events',
          name: 'event-management',
          component: EventManagement
        }
      ]
    }
  ]
})

export default router
