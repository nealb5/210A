<template>
  <div class="form-container">
    <h2>Registration</h2>

    <form @submit.prevent="registerUser" class="form">
      <div class="input-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="username" required />
      </div>
      <div class="input-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="input-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit" class="form-btn">Register</button>
    </form>

  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
    };
  },

  methods: {
    async registerUser() {
      try {
        const response = await fetch(
          `${process.env.VUE_APP_CLIENT_ORIGIN}/api/users/register`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: this.username,
              email: this.email,
              password: this.password,
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.status === "success") {
            alert("User registered successfully");
            this.$router.push({ path: "/" });
          } else {
            alert(data.message);
          }
        } else {
          console.error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        // Handle registration error
        console.error(error);
      }
    },

  },
  
};
</script>


<style scoped src="../styles/register-view.css"></style>
