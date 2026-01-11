<template>
  <div class="change-username-and-email">
    <div class="input-field">
      <label for="username">New Username:</label>
      <input type="text" id="username" v-model="localUsername" :placeholder="userUsername" required />
      <button class="btn btn-primary" @click="updateUsername">Update Username</button>
    </div>
    <div class="input-field">
      <label for="email">New Email:</label>
      <input type="email" id="email" v-model="localEmail" :placeholder="userEmail" required />
      <button class="btn btn-primary" @click="updateEmail">Update Email</button>
    </div>
    <div class="input-field">
      <label for="password">Old Password:</label>
      <input type="password" id="password-initial" v-model="localOldPassword" required />
      <label for="password">New Password:</label>
      <input type="password" id="password-initial" v-model="localPasswordInitial" required />
      <label for="password">Confirm New Password:</label>
      <input type="password" id="password-confirm" v-model="localPasswordConfirm" required />
      <button class="btn btn-primary" @click="updatePassword">Update Password</button>
      <div class="passwords-dont-match" v-if="passwordsDontMatch">Your passwords don't match.</div>
    </div>
  </div>
</template>
  
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      localUsername: "",
      localEmail: "",
      localOldPassword: "",
      localPasswordInitial: "",
      localPasswordConfirm: "",
      passwordsDontMatch: false,
    }
  },
  computed: {
    ...mapGetters(["userEmail", "userUsername"]),
  },
  methods: {
    updateUsername() {
      this.$emit("update-profile", {
        newUsername: this.localUsername,
      });
      this.localUsername = "";
    },
    updateEmail() {
      this.$emit("update-profile", {
        newEmail: this.localEmail,
      });
      this.localEmail = "";
    },
    updatePassword() {
      if (this.localPasswordInitial == this.localPasswordConfirm) {
        this.$emit("update-profile", {
          oldPassword: this.localOldPassword,
          newPassword: this.localPasswordConfirm,
        });
        this.oldPassword = "";
        this.localPasswordInitial = "";
        this.localPasswordConfirm = "";
      } else {
        this.passwordsDontMatch = true;
        setTimeout(() => {
          this.passwordsDontMatch = false;
        }, 3000);
      }
    }
  },
};
</script>

<style scoped>
.change-username-and-email {
  background-color: #222;
  color: #f5f5f5;
  padding: 20px;
  border-radius: 5px;
  margin: 20px 0;
}

.input-field {
  margin-bottom: 15px;
}

.input-field label {
  display: block;
  margin-bottom: 5px;
  color: #f5f5f5;
}

.input-field input {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #888;
  background-color: #333;
  color: #f5f5f5;
}

.btn {
  margin-top: 10px;
}

.passwords-dont-match {
  color: red;
  margin-top: 10px;
}

label {
  margin-top: 5px;
}

</style>
