<template>
  <div class="form-container">
    <h2>Login</h2>

    <form @submit.prevent="loginUser" class="form">
      <div>
        <label for="username">Username:</label>
        <input type="username" id="username" v-model="username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit" class="form-btn" :disabled="isLoading">
        {{ isLoading ? "Logging in..." : "Login" }}
      </button>
    </form>

    <p class="success-message" v-if="successMessage">{{ successMessage }}</p>
    <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>
  
<script>
import { mapActions } from "vuex";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useRouter } from "vue-router";

export default {
  data() {
    return {
      username: "",
      password: "",
      isLoading: false,
      successMessage: "",
      errorMessage: "",
    };
  },

  setup() {
    const router = useRouter();
    return { router };
  },

  methods: {
    ...mapActions([
      "setAccessToken",
      "setLoggedIn",
      "addToCart",
      "clearCart",
    ]),
    async loginUser() {
      this.isLoading = true;
      this.successMessage = "";
      this.errorMessage = "";
      console.log("The JWT secret is 'secret' lol");
      try {
        const response = await fetch(
          `${process.env.VUE_APP_CLIENT_ORIGIN}/api/users/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: this.username,
              password: this.password,
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          let decoded = jwtDecode(data.token);

          if (data.token) {
            this.setAccessToken(data.token);
            this.setLoggedIn(true);
            this.clearCart();
            try {
              const response = await fetch(
                `${process.env.VUE_APP_CLIENT_ORIGIN}/api/products/basket-items/${decoded.id}`
              );

              if (response.ok) {
                response.text().then((text) => {
                  if (text) {
                    const data = JSON.parse(text);
                    if (data.message) {
                      console.error(data.message);
                    } else {
                      for (const item of data) {
                        this.addToCart(item);
                      }
                    }
                  }
                });
              }
            } catch (error) {
              console.error(`Could not fetch cart details: ${error}`);
            }

            await this.$nextTick();

            this.successMessage = "Logged in successfully!";
            this.router.push({ name: "product" });
          } else {
            console.error(`Login failed!`);
            this.errorMessage = "Login failed!";
          }
        } else {
          response.text().then(text => {
            this.errorMessage = text;
          })
        }
      } catch (error) {
        this.errorMessage = error.message;
      } finally {
        this.isLoading = false;
      }
    },

  },

};
</script>
  
<style scoped src="../styles/login-form.css"></style>
