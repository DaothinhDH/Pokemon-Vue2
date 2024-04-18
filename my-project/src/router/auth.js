import CompLogin from "../components/auths/CompLogin.vue";
import RegisterForm from "../components/auths/RegisterForm.vue";

export default [
  {
    path: "/login",
    name: "CompLogin",
    component: CompLogin,
  },
  {
    path: "/register",
    name: "RegisterForm",
    component: RegisterForm,
  },
];
