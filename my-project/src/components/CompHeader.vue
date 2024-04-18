<template>
  <div class="header">
    <h1>Trò chơi Pokemon</h1>
    <div class="auth-buttons">
      <template v-if="isLoggedIn">
        <div class="avt">
          <img
            src="https://gamek.mediacdn.vn/133514250583805952/2021/8/16/hot7-1629130884959131357663.jpg"
            alt="User Icon"
            class="user-icon-img"
          />
          <div>{{ username }}</div>
        </div>
        <button>
          <router-link class="button" to="/cart">Cart</router-link>
        </button>
        <button @click="logout">Logout</button>
      </template>
      <template v-else>
        <button v-if="!isLoggedIn">
          <router-link class="button" to="/login">Login</router-link>
        </button>
        <button v-if="!isLoggedIn">
          <router-link class="button" to="/register">Register</router-link>
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
    // clickCart() {
    //   this.$router.push("/cart");
    // },
  },
};
</script>

<style>
.avt {
  display: flex;
}
.avt > img {
  width: 40px;
  height: 40px;
}
.username {
  font-weight: bold;
  color: #333;
  margin-right: 10px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: linear-gradient(to bottom, #5ac2d42d, #9ebccf2d, #bb80a925);
  border-radius: 10px;
  color: rgb(253, 146, 7);
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}
button {
  transition: transform 0.3s ease;
}
.button {
  cursor: pointer;
  border: 1px solid white;
  border-radius: 5px;
  background-color: antiquewhite;
  color: rgba(27, 25, 25, 0.795);
}
button:hover {
  transform: translateY(-5px);
}
.auth-buttons button {
  margin-left: 10px;
}
button {
  cursor: pointer;
  border: 1px solid white;
  border-radius: 5px;
  background-color: antiquewhite;
  color: rgba(27, 25, 25, 0.795);
}
</style>
