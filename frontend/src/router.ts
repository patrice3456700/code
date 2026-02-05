import { createRouter, createWebHistory } from 'vue-router';
import { isAuthenticatedGuard, isNotAuthenticatedGuard } from './shared/guards';
import { useUser } from './shared/stores';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/views/MyHome.vue'),
    },
    {
      path: '/connexion',
      beforeEnter: [isNotAuthenticatedGuard],
      component: () => import('@/views/MyLogin.vue'),
    },
    {
      path: '/inscription',
      beforeEnter: [isNotAuthenticatedGuard],
      component: () => import('@/views/MySignup.vue'),
    },
    {
      path: '/profil',
      beforeEnter: [isAuthenticatedGuard],
      component: () => import('@/views/MyProfile.vue'),
    },
    {
      path: '/:notfound(.*)*',
      component: () => import('@/views/NotFound.vue'),
    },
  ],
});

router.beforeEach(async () => {
  const userStore = useUser();
  if (!userStore.loaded) {
    await userStore.fetchCurrentUser();
  }
});
