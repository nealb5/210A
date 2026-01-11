<template>
  <div>
    <app-bar @set-logged-in-user="setLoggedInUser" />
    <router-view />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Cookies from "js-cookie";
import { useRouter } from "vue-router";
import AppBar from "./components/AppBar.vue";

export default {
  components: {
    AppBar,
  },

  setup() {
    const router = useRouter();
    const loggedInUser = ref(null);
    const isLoggedIn = ref(false);

    function setLoggedInUser(username) {
      loggedInUser.value = username;
      isLoggedIn.value = true;
    }

    return {
      router,
      setLoggedInUser,
      isLoggedIn,
    };
  },
  
};
</script>

<style>
body {
  background-color: #1a1a1a;
  /* Dark background for the whole body */
}

#app {
  font-family: "Lato", sans-serif;
  color: #ddd;
  /* Light text */
  background-color: #1a1a1a;
  /* Dark background for the app */
}

/* CSS reset for body and html */
html,
body {
  margin: 0;
  padding: 0;
  background-color: #1a1a1a;
  /* Dark background for html and body */
  color: #ddd;
  /* Light text */
}

.no-scroll {
  overflow: hidden;
}</style>
