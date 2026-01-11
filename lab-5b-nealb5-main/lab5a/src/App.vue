<template>
  <v-app>
    <link
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"
      rel="stylesheet"
      type="text/css"
    />

    <AppBar :user="user" />

    <v-main>
      <router-view :user="user"></router-view>
    </v-main>
  </v-app>
</template>

<script>
// Import the AppBar component
import AppBar from '@/components/AppBar.vue';

export default {
  name: 'App',
  components: {
    AppBar,
  },
  data() {
    return {
      user: {},
      defaultUser: {
        UserName: 'hello',
      },
    };
  },
  methods: {
    async getUser() {
      try {
        const response = await fetch(`${process.env.VUE_APP_API_ORIGIN}/api/v1/user`, {
          // Include your credentials here (e.g., headers with authorization token)
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const userData = await response.json();
          this.user = userData; // Update user with fetched data
        } else {
          console.error('Failed to fetch user data:', response.statusText);
          this.user = this.defaultUser; // Use default if fetch fails
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        this.user = this.defaultUser; // Use default if fetch fails
      }
    },
  },
  mounted() {
    this.getUser();
  },
};
</script>
