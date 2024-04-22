<template>
  <div class="register-form">
    <router-link to="/" class="back-button"><i class="fas fa-angle-double-left"></i></router-link>
    <h2>Đăng ký</h2>
    <form @submit.prevent="submitForm" class="form">
      <label class="form-label">Tên người dùng:</label>
      <input type="text" v-model="username" required class="form-input" />
      <label class="form-label">Mật khẩu:</label>
      <input type="password" v-model="password" required class="form-input" />
      <button type="submit" class="form-button">Đăng ký</button>
    </form>
    <p v-if="error" class="error-message">{{ error }}</p>
    <p v-if="success" class="success-message">{{ success }}</p>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      username: "",
      password: "",
      error: "",
      success: "",
    };  
  },
  methods: {
    submitForm() {
      const newUser = {
        username: this.username,
        password: this.password,
      };
      let existingUsers = JSON.parse(localStorage.getItem("users")) || [];

      const userExists = existingUsers.some(
        (user) => user.username === newUser.username
      );

      if (userExists) {
        this.error = "Tên người dùng đã tồn tại. Vui lòng chọn tên khác.";
      } else {
        existingUsers.push(newUser);

        localStorage.setItem("users", JSON.stringify(existingUsers));

        this.success = "Đăng ký thành công!";
        // this.error = "";
        this.$router.push("/");
      }
    },
  },
};
</script>

<style scoped>
.error-message {
  color: red;
}
.success-message {
  color: green;
}
.register-form {
  box-shadow: rgba(146, 12, 12, 0.801) 0px 4px 12px;
}
.back-button {
  width: 80px;
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
.register-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.back-button {
  display: block;
  margin-bottom: 10px;
  color: #333;
  text-decoration: none;
  font-size: 16px;
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
