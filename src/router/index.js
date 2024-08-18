import { createRouter, createWebHashHistory } from "vue-router";
import store from "../store/index.js";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/QuestCenter",
    name: "QuestCenter",
    component: () => import("../views/QuestCenterView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/QuestCenter/:id",
    name: "QuestCenterId",
    component: () => import("../views/QuestMoreInfoView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/Battlefield",
    name: "Battlefield",
    component: () => import("../views/BattlefieldView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/Attendance/:uid",
    name: "Attendance",
    component: () => import("../views/AttendanceView.vue"),
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/QuestSubmission/:uid",
    name: "QuestSubmission",
    component: () => import("../views/QuestSubmissionView.vue"),
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/RegionSubmission/:uid",
    name: "RegionSubmission",
    component: () => import("../views/RegionSubmissionView.vue"),
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/MyQuest",
    name: "MyQuest",
    component: () => import("../views/MyQuestView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/QRCode",
    name: "QRCode",
    component: () => import("../views/QRCodeView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/AddQuest",
    name: "AddQuest",
    component: () => import("../views/AddQuestView.vue"),
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/AddTeam",
    name: "AddTeam",
    component: () => import("../views/AddTeamView.vue"),
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/AssignPlayers",
    name: "AssignPlayers",
    component: () => import("../views/AssignPlayersToTeamsView.vue"),
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: "/LeaderboardGold",
    name: "LeaderboardGold",
    component: () => import("../views/LeaderboardView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/LeaderboardHp",
    name: "LeaderboardHp",
    component: () => import("../views/LeaderboardHPView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/AddPoints",
    name: "AddPoints",
    component: () => import("../views/AddPointsView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/TransferPoints",
    name: "TransferPoints",
    component: () => import("../views/TransferPointsView.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// Navigation guard
router.beforeEach((to, from, next) => {
  const user = store.state.user; // Get the user object from the state
  const isAuthenticated = user !== null; // Check if the user is authenticated
  const isAdmin = user && user.isAdmin; // Check if the user has the admin role

  // Guard 1: User must be signed in for all routes
  if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated) {
    next({
      path: "/",
      query: { redirect: to.fullPath },
    });
  } 
  // Guard 2: User must be an admin for specific routes
  else if (to.matched.some((record) => record.meta.requiresAdmin) && !isAdmin) {
    next({
      path: "/",
      query: { redirect: to.fullPath },
    });
  } 
  // Proceed if all checks pass
  else {
    next();
  }
});

export default router;
