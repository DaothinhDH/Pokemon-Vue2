import CompLogin from "../components/auths/CompLogin.vue";
import RegisterForm from "../components/auths/RegisterForm.vue";
import ChangePassword from "../components/auths/ChangePassword.vue";

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
  {
    path: "/change-pass",
    name: "ChangePass",
    component: ChangePassword,
  },
];
