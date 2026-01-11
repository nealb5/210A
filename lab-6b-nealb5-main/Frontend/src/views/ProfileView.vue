<template>
  <div class="main">
    <div class="content">
      <h2>Profile</h2>
      <div class="summary">
        <div class="profile-pic">
          <img class="profile-image" :src="profilePicturePath" alt="Product Image" />
          <div class="file-select">
            <input type="file" id="picture-file" @change="handleFileChange" />
            <button class="btn btn-secondary" @click="uploadProfilePicture">Submit Profile Picture</button>
          </div>
        </div>
        <div>
          <div>
            <strong>Username: </strong>
            <span v-html="userUsername"></span>
          </div>
          <div>
            <strong>Role: </strong>
            <span v-html="userRole"></span>
          </div>
          <div>
            <strong>Activity Status: </strong>
            <span v-html="isActive ? 'Active' : 'Inactive'"></span>
          </div>
        </div>
      </div>

      <div class="status-message">
        <div v-if="successMessage">
          <p class="success-message">{{ successMessage }}</p>
        </div>
        <div v-if="errorMessage">
          <p class="error-message">{{ errorMessage }}</p>
        </div>
      </div>

      <ChangeUsernameEmail @update-profile="updateProfile" />

    </div>
  </div>
</template>

<script>
import ChangeUsernameEmail from "../components/ChangeUsernameEmail.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      isActive: null,
      isLoading: false,
      successMessage: "",
      errorMessage: "",
      newPictureFile: null,
    };
  },

  components: {
    ChangeUsernameEmail,
  },

  computed: {
    ...mapGetters(["isLoggedIn", "accessToken", "cartItems", "cartCount", "orderAddress", "orderCard", "userId", "userUsername", "userEmail", "userRole",]),
    profilePicturePath() {
      return process.env.VUE_APP_CLIENT_ORIGIN + "/api/files/download/profile/" + this.userId;
    }
  },

  methods: {
    ...mapActions([
      "setAccessToken",
    ]),
    loadProfile() {
      fetch(
        `${process.env.VUE_APP_CLIENT_ORIGIN}/api/users/user/${this.userId}`,
        {
          method: "GET",
          credentials: "include",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          this.isActive = data.isActive;
        })
        .catch((error) => console.error(error));
    },

    async updateProfile({ newUsername, newEmail, oldPassword, newPassword, newRole }) {
      this.isLoading = true;
      this.successMessage = "";
      this.errorMessage = "";

      if (newUsername !== undefined) {
        newUsername = newUsername.trim()
      }
      if (newEmail !== undefined) {
        newEmail = newEmail.trim()
      }
      if (oldPassword !== undefined) {
        oldPassword = oldPassword.trim()
      }
      if (newPassword !== undefined) {
        newPassword = newPassword.trim()
      }
      if (newRole !== undefined) {
        newRole = newRole.trim()
      }

      // Create an object to store the fields to send to the server
      const dataToSend = {};

      // Add the fields to the dataToSend object if they are not empty
      if (newUsername !== "") {
        dataToSend.newUsername = newUsername;
      }

      if (newEmail !== "") {
        dataToSend.newEmail = newEmail;
      }

      if (oldPassword !== "") {
        dataToSend.oldPassword = oldPassword;
      }

      if (newPassword !== "") {
        dataToSend.newPassword = newPassword;
      }

      if (newRole !== "") {
        dataToSend.newRole = newRole;
      }

      // Send the data to the server only if there are fields to update
      try {
        if (Object.keys(dataToSend).length > 0) {
          const response = await fetch(
            `${process.env.VUE_APP_CLIENT_ORIGIN}/api/users/user/${this.userId}`,
            {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${this.accessToken}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(dataToSend),
              credentials: "include",
            }
          )
          if (response.ok) {
            const data = await response.json();

            if (data.token) {
              this.setAccessToken(data.token);
              this.successMessage = data.message;
            } else {
              this.errorMessage = data.message;
            }
          } else {
            this.errorMessage = data.message;
          }
        }
      }
      catch (error) {
        this.errorMessage = error.message;
      }

      if (this.successMessage) {
        setTimeout(() => {
          this.successMessage = "";
        }, 3000);
      } else if (this.errorMessage) {
        setTimeout(() => {
          this.errorMessage = "";
        }, 3000);
      }
    },

    handleFileChange(event) {
      this.newPictureFile = event.target.files[0];
      console.log(this.newPictureFile)
    },

    async uploadProfilePicture() {
      console.log(this.newPictureFile);

      const formData = new FormData();
      formData.append('myFile', this.newPictureFile);
      // formData.append('userId', this.userId)

      const response = await fetch(`${process.env.VUE_APP_CLIENT_ORIGIN}/api/files/profile/upload/${this.userId}`, {
        method: 'POST',
        body: formData
      })
      try {
        const data = response.json();
        if (response.ok) {
          console.log('Upload successful:', data);
          this.successMessage = data.message
          this.profilePicturePath = `${process.env.VUE_APP_CLIENT_ORIGIN}/api${data.filepath}`
        } else {
          console.error('Error uploading file:', data);
          this.errorMessage = data.message
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        this.errorMessage = data.message
      };

      if (this.successMessage) {
        setTimeout(() => {
          this.successMessage = "";
        }, 3000);
      } else if (this.errorMessage) {
        setTimeout(() => {
          this.errorMessage = "";
        }, 3000);
      }
      window.location.reload();
    },

    // getProfilePicturePath() {
    //   // `${process.env.VUE_APP_CLIENT_ORIGIN}/api/files/download/profile/1`
    //   fetch(`${process.env.VUE_APP_CLIENT_ORIGIN}/api/files/download/profile/${this.userId}`, {
    //     method: 'GET',
    //   })
    //     .then(response => response.json())
    //     .then(data => {
    //       this.profilePicturePath = `${process.env.VUE_APP_CLIENT_ORIGIN}/api${data}`;
    //       console.log(this.profilePicturePath);
    //     })
    //     .catch(error => {
    //       console.error('Error fetching filepath:', error);
    //       this.errorMessage = data.message
    //     });
    // },
  },
  mounted() {
    if (this.accessToken) {
      this.loadProfile();
      // this.getProfilePicturePath();
    }
  },
}
</script>

<style scoped src="../styles/profile-view.css"></style>
