<template>
  <div class="admin-page">
    <h1>Admin Dashboard</h1>
    <h2>Add New User</h2>
    <form @submit.prevent="addUser">
      <label for="name">Name:</label>
      <input v-model="newUser.username" type="text" id="name" />

      <label for="email">Email:</label>
      <input v-model="newUser.email" type="email" id="email" />

      <label for="password">Password:</label>
      <input v-model="newUser.password" type="password" id="password" />

      <label for="role">Role:</label>
      <select v-model="newUser.role" id="role">
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <button type="submit">Add User</button>
    </form>
    <h2>Users</h2>
    <table id="users-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Password</th>
          <th>Role</th>
          <th class="action-column">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.password }}</td>
          <td>{{ user.role }}</td>
          <td class="action-column">
            <font-awesome-icon @click="deleteUser(user.id)" icon="user-slash" class="delete-user-icon" />
          </td>
        </tr>
      </tbody>
    </table>
    <div>
      <DisplayFeedback />
    </div>
  </div>
</template>
  
<script>
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import DisplayFeedback from "../components/DisplayFeedback.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      users: [],
      newUser: {
        username: "",
        email: "",
        password: "",
        role: "user",
      },
    };
  },

  components: {
    DisplayFeedback,
  },

  async created() {
    const response = await fetch(
      `${process.env.VUE_APP_CLIENT_ORIGIN}/api/users/listUsers`
    );
    if (response.ok) {
      const data = await response.json();
      this.users = data.data;
    }
  },

  computed: {
    ...mapGetters(["isLoggedIn", "accessToken", "cartItems", "cartCount", "orderAddress", "orderCard", "userId", "userEmail", "userRole",]),
  },

  methods: {
    async addUser() {
      if (!this.accessToken) {
        console.error("No JWT token found");
        return;
      }

      const decode = jwtDecode(this.accessToken);
      console.log(decode);

      const response = await fetch(
        `${process.env.VUE_APP_CLIENT_ORIGIN}/api/users/addUser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.accessToken}`,
          },
          body: JSON.stringify(this.newUser),
        }
      );

      if (response.ok) {
        const user = await response.json();
        this.users.push(this.newUser);
        this.newUser = { username: "", email: "", password: "", role: "user" }; // reset form
      } else {
        console.error(`HTTP error! status: ${response.status}`);
      }
    },

    async deleteUser(userId) {
      if (!this.accessToken) {
        console.error("No JWT token found");
        return;
      }

      const response = await fetch(
        `${process.env.VUE_APP_CLIENT_ORIGIN}/api/users/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.accessToken}`,
          },
        }
      );

      if (response.ok) {
        this.users = this.users.filter((user) => user.id !== userId);
      } else {
        console.error(`HTTP error! status: ${response.status}`);
      }
    },

  },
};
</script>
  
<style scoped src="../styles/admin.css"></style>

  