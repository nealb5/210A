<template>
  <div id="app-bar">
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Todo App</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- Conditionally show this button when the user is logged in -->
      <v-btn v-if="loggedIn" v-on:click.stop="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary right>
      <v-list-item>
        <v-list-item-title>{{user.UserName}}</v-list-item-title>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense>
      <v-list-item link :href= "logoutUrl">
          <v-icon>mdi-logout-variant</v-icon>
          <v-list-item-title>Log Out</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { authenticated } from '@/util';

export default {
  name: 'AppBar',
  props: {
    user: {
      type: Object,
      default: () => ({ UserName: '' }),
    },
  },
  data: () => ({
    drawer: true,
    loggedIn: false,
    apiUrl: process.env.VUE_APP_API_ORIGIN, 
    logoutUrl: `${process.env.VUE_APP_API_ORIGIN}/api/v1/auth/logout`
  }),
  methods: {
    async getLoggedIn(){
        try{
           const response = await authenticated()
           if (response == false){
            this.loggedIn = false
           }
           else{
            this.loggedIn = true
           }
          }
          catch(error){
          console.error(error.message)
          this.loggedIn = false
          }
  }
  },
 mounted(){
      this.getLoggedIn()
 } 

}
</script>