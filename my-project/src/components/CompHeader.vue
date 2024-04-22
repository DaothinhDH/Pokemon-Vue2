<template >
  <div class="header">
    <h1>GAMES POKEMON</h1>
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
            <h2>{{ username }}</h2>
          </div>
          <div class="icons" v-show="showIcons">
            <router-link to="/cart"
              ><i class="fa-solid fa-cart-shopping"></i
            ></router-link>
            <button @click="logout">
              <i class="fa-solid fa-right-from-bracket"></i>
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

.user-icon-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.username {
  font-weight: bold;
  color: #2e2d27d3;
  width: 50px;
}

.icons {
  position: absolute;
  top: 100%;
  left: 50%;
  width: 80x;
  height: 40px;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #decedff8;
  border-radius: 5px;
  padding: 5px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
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
  border: 1px solid white;
  border-radius: 5px;
  background-color: antiquewhite;
  color: rgba(27, 25, 25, 0.795);
  transition: transform 0.3s ease;
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
}

.login-button:hover,
.register-button:hover {
  background-color: #e5e5e5;
}
</style>
