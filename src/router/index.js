import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "@/layouts/default.vue";
import NoneLayout from "@/layouts/none.vue";
import useAuthStore from "../stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Auth
    {
      path: "/",
      name: "home",
      meta: {
        requiresAuth: true,
        layout: DefaultLayout,
      },
      component: () => import("@/views/home/index.vue"),
    },
    {
      path: "/login",
      name: "login",
      meta: {
        requiresAuth: false,
        layout: NoneLayout,
      },
      component: () => import("@/views/auth/login/index.vue"),
    },
    {
      path: "/forgot-password",
      name: "forgot-password",
      meta: {
        requiresAuth: false,
        layout: NoneLayout,
      },
      component: () => import("@/views/auth/forgot-password/index.vue"),
    },
    {
      path: "/change-password",
      name: "change-password",
      meta: {
        requiresAuth: false,
        layout: NoneLayout,
      },
      component: () => import("@/views/auth/change-password/index.vue"),
    },
    {
      path: "/user-info",
      name: "user-info",
      meta: {
        requiresAuth: false,
        layout: DefaultLayout,
      },
      component: () => import("@/views/auth/user-info/index.vue"),
    },
    // Bến đến
    {
      path: "/quan-ly-thong-tin/ben-den",
      name: "quan-ly-ben-den",
      meta: {
        requiresAuth: true,
        layout: DefaultLayout,
      },
      component: () => import("@/views/quan-ly-thong-tin/ben-den/index.vue"),
    },
    {
      path: "/quan-ly-thong-tin/ben-den/them-moi",
      name: "them-ben-den",
      meta: {
        requiresAuth: true,
        layout: DefaultLayout,
      },
      component: () =>
        import("@/views/quan-ly-thong-tin/ben-den/chi-tiet/index.vue"),
    },
    {
      path: "/quan-ly-thong-tin/ben-den/sua-thong-tin",
      name: "sua-ben-den",
      meta: {
        requiresAuth: true,
        layout: DefaultLayout,
      },
      component: () =>
        import("@/views/quan-ly-thong-tin/ben-den/chi-tiet/index.vue"),
    },
    // Tuyến vận chuyển
    {
      path: "/quan-ly-thong-tin/tuyen-van-chuyen",
      name: "quan-ly-tuyen-van-chuyen",
      meta: {
        requiresAuth: true,
        layout: DefaultLayout,
      },
      component: () =>
        import("@/views/quan-ly-thong-tin/tuyen-van-chuyen/index.vue"),
    },
    {
      path: "/quan-ly-thong-tin/tuyen-van-chuyen/them-moi",
      name: "them-tuyen-van-chuyen",
      meta: {
        requiresAuth: true,
        layout: DefaultLayout,
      },
      component: () =>
        import("@/views/quan-ly-thong-tin/tuyen-van-chuyen/chi-tiet/index.vue"),
    },
    {
      path: "/quan-ly-thong-tin/tuyen-van-chuyen/sua-thong-tin",
      name: "sua-tuyen-van-chuyen",
      meta: {
        requiresAuth: true,
        layout: DefaultLayout,
      },
      component: () =>
        import("@/views/quan-ly-thong-tin/tuyen-van-chuyen/chi-tiet/index.vue"),
    },
    // Doanh nghiệp vận tải
    {
      path: "/quan-ly-thong-tin/doanh-nghiep-van-tai",
      name: "quan-ly-doanh-nghiep-van-tai",
      meta: {
        requiresAuth: true,
        layout: DefaultLayout,
      },
      component: () =>
        import("@/views/quan-ly-thong-tin/doanh-nghiep-van-tai/index.vue"),
    },
    {
      path: "/quan-ly-thong-tin/doanh-nghiep-van-tai/them-moi",
      name: "them-doanh-nghiep-van-tai",
      meta: {
        requiresAuth: true,
        layout: DefaultLayout,
      },
      component: () =>
        import(
          "@/views/quan-ly-thong-tin/doanh-nghiep-van-tai/chi-tiet/index.vue"
        ),
    },
    {
      path: "/quan-ly-thong-tin/doanh-nghiep-van-tai/sua-thong-tin",
      name: "sua-doanh-nghiep-van-tai",
      meta: {
        requiresAuth: true,
        layout: DefaultLayout,
      },
      component: () =>
        import(
          "@/views/quan-ly-thong-tin/doanh-nghiep-van-tai/chi-tiet/index.vue"
        ),
    },
    // Nhà xe
    {
      path: "/quan-ly-thong-tin/nha-xe",
      name: "quan-ly-nha-xe",
      meta: {
        requiresAuth: true,
        layout: DefaultLayout,
      },
      component: () => import("@/views/quan-ly-thong-tin/nha-xe/index.vue"),
    },
    {
      path: "/quan-ly-thong-tin/nha-xe/them-moi",
      name: "them-nha-xe",
      meta: {
        requiresAuth: true,
        layout: DefaultLayout,
      },
      component: () =>
        import("@/views/quan-ly-thong-tin/nha-xe/chi-tiet/index.vue"),
    },
    {
      path: "/quan-ly-thong-tin/nha-xe/sua-thong-tin",
      name: "sua-nha-xe",
      meta: {
        requiresAuth: true,
        layout: DefaultLayout,
      },
      component: () =>
        import("@/views/quan-ly-thong-tin/nha-xe/chi-tiet/index.vue"),
    },
    // Phương tiện
    {
      path: "/quan-ly-thong-tin/phuong-tien",
      name: "quan-ly-phuong-tien",
      meta: {
        requiresAuth: true,
        layout: DefaultLayout,
      },
      component: () =>
        import("@/views/quan-ly-thong-tin/phuong-tien/index.vue"),
    },
    {
      path: "/quan-ly-thong-tin/phuong-tien/them-moi",
      name: "them-phuong-tien",
      meta: {
        requiresAuth: true,
        layout: DefaultLayout,
      },
      component: () =>
        import("@/views/quan-ly-thong-tin/phuong-tien/chi-tiet/index.vue"),
    },
    {
      path: "/quan-ly-thong-tin/phuong-tien/sua-thong-tin",
      name: "sua-phuong-tien",
      meta: {
        requiresAuth: true,
        layout: DefaultLayout,
      },
      component: () =>
        import("@/views/quan-ly-thong-tin/phuong-tien/chi-tiet/index.vue"),
    },
    // Lái xe
    {
      path: "/quan-ly-thong-tin/tai-xe",
      name: "quan-ly-tai-xe",
      meta: {
        requiresAuth: true,
        layout: DefaultLayout,
      },
      component: () => import("../views/quan-ly-thong-tin/tai-xe/index.vue"),
    },
    {
      path: "/quan-ly-thong-tin/tai-xe/them-moi",
      name: "them-tai-xe",
      meta: {
        requiresAuth: true,
        layout: DefaultLayout,
      },
      component: () =>
        import("../views/quan-ly-thong-tin/tai-xe/chi-tiet/index.vue"),
    },
    {
      path: "/quan-ly-thong-tin/tai-xe/sua-thong-tin",
      name: "sua-tai-xe",
      meta: {
        requiresAuth: true,
        layout: DefaultLayout,
      },
      component: () =>
        import("../views/quan-ly-thong-tin/tai-xe/chi-tiet/index.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "error",
      meta: {
        requiresAuth: false,
        layout: NoneLayout,
      },
      component: () => import("@/views/error/index.vue"),
    },
    {
      path: "/home",
      redirect: "/",
    },
    {
      path: "/trang-chu",
      redirect: "/",
    },
  ],
});
router.beforeEach((to, from, next) => {
  const isAuth = useAuthStore().isAuth();
  if (to.name === "login" && isAuth) {
    next({ name: "home" });
  }

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (isAuth) {
      next();
    } else {
      next({ name: "login" });
    }
  } else {
    next();
  }
});

export default router;
