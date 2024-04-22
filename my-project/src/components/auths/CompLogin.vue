<template>
  <div class="login-form">
    <router-link to="/" class="back-button"><i class="fas fa-angle-double-left"></i></router-link>
    <h2>Đăng nhập</h2>
    <form @submit.prevent="submitForm" class="form">
      <label class="form-label">Tên người dùng:</label>
      <input type="text" v-model="username" required class="form-input" />
      <label class="form-label">Mật khẩu:</label>
      <input type="password" v-model="password" required class="form-input" />
      <button type="submit" class="form-button">Đăng nhập</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    submitForm() {
      const users = JSON.parse(localStorage.getItem("users")) || [];

      const user = users.find(
        (user) =>
          user.username === this.username && user.password === this.password
      );

      if (user) {
        alert("Đăng nhập thành công!");
        localStorage.setItem("currentUser", JSON.stringify(user)); 
        this.$router.push("/");
      } else {
        alert("Tên người dùng hoặc mật khẩu không chính xác");
      }
    },
  },
};
</script>

<style scoped>
.login-form {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}
.back-button {
  display: inline-block;
  margin-bottom: 10px;
  padding: 10px 20px;
  background-color: #007bffa9;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

.back-button:hover {
  background-color: #ac311bb9;
}
.login-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.form-label {
  display: block;
  margin-bottom: 10px;
  color: #333;
  font-weight: bold;
}

.form-input {
  width: 95%;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
}

.form-button:hover {
  background-color: #45a049;
}

.form-button:disabled {
  background-color: #bfbfbf;
  cursor: not-allowed;
}
</style>
