import Vue from "vue";
import VueRouter from "vue-router";
import Welcome from "../components/Welcome";
import Chat from '../components/chat';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Welcome",
    component: Welcome
  },
  {
    path: "/chat",
    name: "Chat",
    component: Chat,
    props: true,
    beforeEnter: (to,from,next) => {
      if(to.params.name){
        next();
      }
      else {
        next({name:"Welcome"});
      }
    }
  },
 {
  path: "*",
  redirect: '/'
}
];

const router = new VueRouter({
  routes
});

export default router;
