import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store/store';

const routes = [
  {
    path: '/',
    name: 'product',
    component: () => import('@/views/ProductsView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import('@/views/LogoutView.vue'),
    beforeEnter: (to, from, next) => {
      // Check if the user has an access token or not
      if (!store.getters.accessToken) {
        next('/');
      } else {
        next();
      }
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/RegisterView.vue')
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('@/views/ProductsView.vue'),
    props: true
  },
  {
    path: '/checkout',
    name: 'checkout-root',
    redirect: '/checkout/basket',
  },
  {
    path: '/checkout/basket',
    name: 'basket',
    component: () => import('@/views/BasketItemsView.vue'),
    props: true,
    meta: { authorize: [] }
  },
  {
    path: '/checkout/details',
    name: 'details',
    component: () => import('@/views/OrderView.vue'),
    props: true,
    meta: { authorize: [] },
    beforeEnter: (to, from, next) => {
      // Check if the user is coming from a specific page
      if (from.name === 'basket') {
        next();
      } else {
        next('/');
      }
    }
  },
  {
    path: '/checkout/summary',
    name: 'checkout',
    component: () => import('@/views/CheckoutView.vue'),
    props: true,
    meta: { authorize: [] },
    beforeEnter: (to, from, next) => {
      // Check if the user is coming from a specific page
      if (from.name === 'details') {
        next();
      } else {
        next('/');
      }
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/ProfileView.vue'),
    props: true,
    meta: { authorize: [] }
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/Admin.vue'),
    props: true,
    meta: { authorize: ['admin'] }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/About-us.vue'),
    props: true
  },
  {
    path: '/legal',
    name: 'legal',
    component: () => import('@/views/Legal.vue'),
    props: true
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/views/Customer-feedback.vue'),
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const { authorize } = to.meta;
  const accessToken = store.getters.accessToken;
  const loggedIn = store.getters.isLoggedIn;
  const userRole = store.getters.userRole;
  const expiryDate = new Date(store.getters.expiration * 1000);

  if (accessToken && expiryDate < Date.now()) {
    // token has expired so logout
    return next({ path: '/logout' })
  }
  else if (authorize) {
    if (!accessToken || !loggedIn) {
      // not logged in so redirect to login page with the return url
      return next({ path: '/login' });
    }

    // check if route is restricted by role
    if (authorize.length && !authorize.includes(userRole)) {
      // role not authorized so redirect to home page
      return next({ path: '/' });
    }
  }

  next();
});

export default router
