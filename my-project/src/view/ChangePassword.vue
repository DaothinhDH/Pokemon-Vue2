<template>
  <div class="login-form">
    <div class="container">
      <div class="main">
        <div class="content">
          <h2>Đổi mật khẩu</h2>
          <form @submit.prevent="handleSubmit" method="post">
            <input
              v-model="oldPassword"
              type="password"
              name=""
              placeholder="Mật khẩu cũ"
              required
              autofocus=""
            />
            <input
              v-model="newPassword"
              type="password"
              name=""
              placeholder="Mật khẩu mới"
              required
              autofocus=""
            />
            <input
              v-model="confirmPassword"
              type="password"
              name=""
              placeholder="Nhập lại mật khẩu mới"
              required
              autofocus=""
            />
            <button class="btn" type="submit">Đổi mật khẩu</button>
            <div class="error">{{ error }}</div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      error: "",
    };
  },
  methods: {
    handleSubmit() {
      if (!this.oldPassword || !this.newPassword || !this.confirmPassword)
        return (this.error = "Vui lòng điền đầy đủ các trường");
      if (
        this.oldPassword.length < 6 ||
        this.newPassword.length < 6 ||
        this.confirmPassword.length < 6
      )
        return (this.error = "Mật khẩu chứa ít nhất 6 kí tư");
      const user = JSON.parse(localStorage.getItem("currentUser"));
      if (user.password !== this.oldPassword)
        return (this.error = "Mật khẩu cũ không chính xác");

      if (this.newPassword !== this.confirmPassword)
        return (this.error = "Mật khẩu xác nhận không khớp");

      const newUser = {
        ...user,
        password: this.newPassword,
      };

      const users = JSON.parse(localStorage.getItem("users"));
      const indexUser = users.findIndex(
        (item) => item.username === newUser.username
      );
      users[indexUser] = newUser;
      localStorage.setItem("users", JSON.stringify(users));

      localStorage.setItem("currentUser", JSON.stringify(newUser));
      this.$toast.open({
        type: "success",
        message: "ĐỔi mật khẩu thành công",
        position: "top-right",
        duration: 2000,
      });
      localStorage.removeItem("currentUser");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap");
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "poppins", sans-serif;
}

.login-form {
  position: relative;
  min-height: 100vh;
  z-index: 0;
  background: white;
  padding: 30px;
  justify-content: center;
  display: grid;
  font-family: "poppins", sans-serif;

  grid-template-rows: 1fr auto 1fr;
  align-items: center;
}
.container {
  max-width: 800px;
  margin: 0 auto;
}

.login-form h1 {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 400;
  color: #fff;
  font-family: "poppins", sans-serif;
}
.login-form h2 {
  line-height: 40px;
  margin-bottom: 5px;
  font-size: 30px;
  font-weight: 500;
  color: #272346;
  text-align: center;
}
.login-form .main {
  position: relative;
  display: flex;
  margin: 30px 0;
}
.content {
  padding: 3em 3em;
  background: #ddc6b959;
  box-shadow: 2px 9px 49px -17px rgba(0, 0, 0, 0.1);
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}
.form-img {
  flex-basis: 50%;
  background: #dfe5ea;
  background-size: cover;
  padding: 40px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  align-items: center;
  display: grid;
}
.form-img img {
  max-width: 100%;
}
p {
  color: #666;
  font-size: 16px;
  line-height: 25px;
  opacity: 0.6;
  text-align: center;
}
.btn,
button,
input {
  border-radius: 35px;
}
.btn:hover,
button:hover {
  color: #272346;
  transition: 0.5s ease;
}
a {
  text-decoration: none;
}
.login-form form {
  margin: 30px 0;
}
.login-form input {
  outline: none;
  margin-bottom: 15px;
  font-stretch: 16px;
  color: #999;
  text-align: left;
  padding: 14px 20px;
  width: 100%;
  display: inline-block;
  box-sizing: border-box;
  border: none;
  background: #f7fafc;
  transition: 0.3s ease;
  border: 1px solid transparent;
}
.login-form input:focus {
  background: transparent;
  border: 1px solid #4e34b6;
}

.login-form button {
  font-size: 18px;
  color: #fff;
  width: 100%;
  background: #4e34b6;
  border: none;
  padding: 14px 15px;
  font-weight: 600;
  transition: 0.3s ease;
}
p.account a {
  color: #4e34b6;
}
p.account a:hover {
  text-decoration: underline;
}
@media (max-width: 736px) {
  .login-form .main {
    flex-direction: column;
  }
  .login-form form {
    margin-top: 30px;
    margin-bottom: 10px;
  }
  .form-img {
    border-radius: 0;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    order: 2;
  }
  .content {
    order: 1;
    border-radius: 0;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
}
.error {
  color: red;
  margin-top: 10px;
}
</style>
