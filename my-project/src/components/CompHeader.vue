<template>
  <div class="header">
    <router-link to="/">
      <div class="btn-logo">
        <img
          src="https://www.logolynx.com/images/logolynx/2b/2b5580b34909f75e7c9ac7b92ac0c4bf.png"
          alt=""
        />
      </div>
    </router-link>
    <div class="auth-buttons">
      <template v-if="isLoggedIn">
        <div
          class="avatar"
          @mouseover="showIcons = true"
          @mouseout="showIcons = false"
        >
          <img
            src="https://img1.kienthucvui.vn/uploads/2021/01/09/anh-dai-dien-pikachu-de-thuong-cho-nu_043119022.jpg"
            alt="User Icon"
            class="user-icon-img"
          />
          <div class="username">
            <span>{{ username }}</span>
          </div>
          <div class="icons" v-show="showIcons">
            <router-link to="/change-pass" class="flex">
              <span> </span>
              <span>Đổi mật khẩu</span>
            </router-link>
            <router-link to="/cart" class="flex">
              <span> <i class="fa-solid fa-cart-shopping"></i></span>
              <span>Giỏ hàng</span>
            </router-link>
            <button class="flex" @click="logout">
              <i class="fa-solid fa-right-from-bracket"></i>
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>
      </template>
      <template v-else>
        <button v-if="!isLoggedIn" class="login-button">
          <router-link class="button" to="/login">Đăng nhập</router-link>
        </button>
        <button v-if="!isLoggedIn" class="register-button">
          <router-link class="button" to="/register">Đăng ký</router-link>
        </button>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "CompHeader",
  data() {
    return {
      isLoggedIn: false,
      username: "",
      showIcons: false,
    };
  },
  mounted() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser && currentUser.username) {
      this.isLoggedIn = true;
      this.username = currentUser.username;
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("currentUser");
      this.isLoggedIn = false;
      this.username = "";
      this.$router.push("/login");
      this.$toast.open({
        type: "success",
        message: "Đăng xuất tài khoản thành công",
        position: "top-right",
        duration: 2000,
      });
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px;
  background: linear-gradient(to bottom, #316d772d, #295a793f, #7c416a42);
  color: rgb(247, 55, 7);
  background-image: url("https://e1.pxfuel.com/desktop-wallpaper/879/397/desktop-wallpaper-1500x500-pokemon-characters-twitter-header-backgrounds.jpg");
  background-size: 28%;
  background-position: center;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
.btn-logo > img {
  width: 80px;
  height: 80px;
  background-color: white;
  border-radius: 30px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.header > h1 {
  justify-content: center;
}

h1 {
  font-size: 1.5rem;
  margin: 0;
}

.avatar {
  display: flex;
  align-items: center;
  position: relative;
  border-radius: 10px;
}
.flex {
  width: 100%;
  display: flex;
  gap: 4px;
  justify-content: start;
  cursor: pointer;
  text-decoration: none;
}

.user-icon-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.username {
  font-weight: bold;
  color: #2e2d27d3;
}

.icons {
  position: absolute;
  top: 100%;
  left: 50%;
  width: 200px;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: start;
  background-color: #decedff8;
  border-radius: 5px;
  padding: 5px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.avatar:hover .icons {
  opacity: 1;
  visibility: visible;
}

.auth-buttons {
  display: flex;
  align-items: center;
}

.button {
  cursor: pointer;
  /* border: 1px solid white; */
  border-radius: 5px;
  /* background-color: antiquewhite; */
  color: rgba(27, 25, 25, 0.795);
  transition: transform 0.3s ease;
  text-decoration: none;
}

.button:hover {
  transform: translateY(-5px);
}

.cart-button {
  display: flex;
  align-items: center;
}

.fa-cart-shopping {
  margin-right: 0.25rem;
}

.logout-button {
  display: flex;
  align-items: center;
}

.fa-right-from-bracket {
  margin-left: 0.25rem;
}

.login-button,
.register-button {
  padding: 0.5rem 1rem;
  border-radius: 5px;
  background-color: #fff;
  color: #007bff;
  margin: 0 10px;
}
.login-button {
  background: purple;
}
.login-button a {
  color: #fff;
}
.login-button:hover a {
  color: #000;
}
.login-button:hover,
.register-button:hover {
  background-color: #e5e5e5;
}
</style>
