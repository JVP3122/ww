import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/day/:day",
      name: "Day",
      component: () => import("./views/Day")
    },
    {
      path: "/apollo",
      name: "Apollo",
      component: () => import("./components/ApolloExample")
    },
	  {
	  	path: "/user",
		  name: "User",
		  component: () => import ("./views/User"),
		  children: [
			  {
			  	path: "login",
				  name: "Login",
				  component: () => import ("./components/user-management/Login")
			  },
			  {
			  	path: "register",
				  name: "Register",
				  component: () => import ("./components/user-management/Register")
			  },
			  {
			  	path: "forgot_password",
				  name: "ForgotPassword",
				  component: () => import ('./components/user-management/ForgotPassword')
			  }
		  ]
	  }
  ]
});
