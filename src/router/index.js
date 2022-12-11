import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BackgroundView from "@/views/BackgroundView";
import PersonalInfoView from "@/views/PersonalInfoView";
import ContactMeView from "@/views/ContactMeView";
import CommentsView from "@/views/CommentsView";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'personalInfo',
    component: PersonalInfoView
  },
  {
    path: '/background',
    name: 'background',
    component: BackgroundView,
  },
  {
    path: '/contactMe',
    name: 'contactMe',
    component: ContactMeView,
  },
  {
    path: '/comments',
    name: 'comments',
    component: CommentsView,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router
