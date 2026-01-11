<template>
  <nav class="navbar">
    <div class="sidebar-toggle-container">
      <i class="fas fa-bars sidebar-toggle" @click="toggleSidebar"></i>
      <div class="sidebar" v-if="showSidebar" :class="{ open: showSidebar }">
        <router-link class="nav-link" to="/contact" @click.native="toggleSidebar">Customer Feedback</router-link>
        <router-link class="nav-link" to="/about" @click.native="toggleSidebar">About</router-link>
        <router-link class="nav-link" v-if="isLoggedIn && userRole === 'admin'" to="/admin"
          @click.native="toggleSidebar">Admin Panel</router-link>
      </div>
    </div>

    <router-link class="nav-link home-logo" to="/">
      <span class="logo-text">HomeShop</span>
    </router-link>
    <div class="icons">
      <router-link class="cart-icon" v-if="isLoggedIn" to="/checkout/basket">
        <i class="fas fa-shopping-cart"></i>
        <span class="account-label">Basket</span>
        <span class="cart-count" v-if="cartCount">{{ cartCount }}</span>
      </router-link>
      <div class="profile">
        <button class="profile-icon" @click="toggleDropdown">
          <i class="fas fa-user-circle"></i>
          <span class="account-label">Account</span>
        </button>
        <div class="profile-menu" v-if="showDropdown && isLoggedIn">
          <router-link class="profile-item" to="/profile" @click.native="toggleDropdown">Profile</router-link>
          <router-link class="profile-item" to="/logout" @click.native="toggleDropdown">Logout</router-link>
        </div>
        <div class="profile-menu" v-if="showDropdown && !isLoggedIn">
          <router-link class="profile-item" to="/login" @click.native="toggleDropdown">Login</router-link>
          <router-link class="profile-item" to="/register" @click.native="toggleDropdown">Register</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      showSidebar: false,
      showDropdown: false,
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn", "accessToken", "cartItems", "cartCount", "orderAddress", "orderCard", "userId", "userEmail", "userRole",]),
  },
  methods: {
    toggleSidebar() {
      this.showSidebar = !this.showSidebar;
      if (this.showSidebar) {
        document.body.classList.add("no-scroll");
      } else {
        document.body.classList.remove("no-scroll");
      }
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    handleOutsideClick(event) {
      const dropdown = this.$el.querySelector(".profile");
      if (dropdown && !dropdown.contains(event.target)) {
        this.showDropdown = false;
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.handleOutsideClick);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleOutsideClick);
  },
};
</script>

<style scoped>
.navbar {
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  box-sizing: border-box;
  background-color: #212121;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 102;
}

.nav-link {
  color: #f5f5f5;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.1em;
}

.home-icon {
  font-size: 1.4em;
}

.icons {
  display: flex;
  gap: 1em;
  position: relative;
  margin-right: 20px;
}

.sidebar-toggle-container {
  display: flex;
  align-items: center;
  height: 100%;
}

.sidebar-toggle {
  position: relative;
  z-index: 101;
  background-color: #212121;
  color: #f5f5f5;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  outline: none;
  flex-shrink: 0;
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 265px;
  background-color: #212121;
  padding: 20px;
  padding-top: 70px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
  z-index: 100;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
}

.sidebar h3:first-of-type {
  margin-top: 3em;
  /* adjust value as necessary */
}

.sidebar.open {
  transform: translateX(0);
}

.sidebar .nav-link {
  color: #f5f5f5;
  padding: 12px;
  display: block;
}

.slide-enter-active {
  transition: all 0.3s ease;
}

.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(-100%);
}

.account-label {
  font-size: 0.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.cart-icon,
.profile-icon {
  color: #f5f5f5;
  font-size: 1.6em;
  text-decoration: none;
  background-color: #212121;
  border: none;
  outline: none;
  padding: 0;
}

.cart-icon:hover,
.profile-icon:hover {
  color: #fbc02d;
}

.cart-count {
  position: absolute;
  top: 15px;
  right: 50px;
  background-color: red;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8em;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.profile {
  position: relative;
}

.profile-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #212121;
  color: #f5f5f5;
  min-width: 200px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  display: flex;
  flex-direction: column;
}

.profile-item {
  color: #f5f5f5;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.profile-item:hover {
  background-color: #757575;
}

.home-logo {
  display: flex;
  align-items: center;
  font-size: 1.5em;
}

.logo-text {
  color: #f5f5f5;
  font-weight: bold;
  font-size: 1.2em;
  margin-left: 10px;
}
</style>
