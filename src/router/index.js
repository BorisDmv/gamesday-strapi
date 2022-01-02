import Vue from "vue";
import VueRouter from "vue-router";
import Library from "../views/Library.vue";
import Game from "../views/Game.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "library",
    component: Library,
  },
  {
    path: '/:id',
    name: "game",
    component: Game,
    meta: { transitionName: 'slide' }
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
