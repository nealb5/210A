<template>
  <div id='app-bar'>
    <v-app-bar app color="primary" dark>

      <v-toolbar-title>Todo App</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- TODO: Use a v-if to only show this button when the user is logged in -->
      <v-btn icon v-on:click.stop="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn> 
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary right>
      <v-list-item>

        <!-- TODO (extra-credit): If you choose to do the extra credit, comment out the following line --> 
        <v-list-item-title>{{user.UserName}}</v-list-item-title>
        <!-- TODO (extra-credit): This is where you would put the image you get from Google's OAuth 2 scope -->
        <!-- If the image's URL is a string on the user object, pass it into the :src attribute -->
        <!-- <v-list-item-avatar> -->
        <!-- <v-img :src=""></v-img> -->
        <!-- </v-list-item-avatar> -->

        <!-- TODO (extra-credit): This is where you would put the user's email from Google -->
        <!-- Remember, use mustache syntax {{}} to pass the value of a variable into this HTML -->
       
        <!-- <v-list-item-title></v-list-item-title> -->
    

      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>

        <!-- TODO: Add an :href attribute to this tag so that clicking this link will log a user out -->
        <v-list-item link>

          <!-- HINT: When there's a colon before an attribute, that's a short-hand for v-bind: which means -->
          <!-- that in the quotation marks of that attribute, you can put JavaScript! That means you can -->
          <!-- use a backtick string to concatenate the API origin env variable to the logout path! -->

            <v-icon>mdi-logout-variant</v-icon>
            <v-list-item-title>Log Out</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { authenticated } from '@/util'
export default {

  name: 'AppBar',
  props: {
    // TODO: Pass in the user object to this component as a prop
    // Make sure to give it a default value that has the UserName defined as an empty string
  },
  data: () => ({
    drawer: false,
     loggedIn: false,
    // TODO: Get the api's url origin from process.env and set it to a variable here
  }
  ),
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


