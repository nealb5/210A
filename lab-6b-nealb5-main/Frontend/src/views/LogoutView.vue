<template>
    <div class="main">
        <div class="content">
            <div v-if="logoutSuccess" class="logout-message">
                You have been successfully logged out. You should be redirected to the homepage soon.
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
    data() {
        return {
            logoutSuccess: false,
        }
    },
    computed: {
        ...mapGetters(["isLoggedIn", "accessToken", "cartItems", "cartCount", "orderAddress", "orderCard", "userId", "userEmail", "userRole",]),
    },
    methods: {
        ...mapActions(["logoutUser"]),
        async logout() {
            try {
                const response = await fetch(
                    `${process.env.VUE_APP_CLIENT_ORIGIN}/api/users/logout`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${this.accessToken}`,
                        },
                        body: JSON.stringify({ userId: this.userId }),
                    }
                );

                if (response.ok) {
                    this.logoutUser();
                    this.logoutSuccess = true;
                    setTimeout(() => {
                        this.$router.push({ name: "product" });
                    }, 2000);
                } else {
                    response.text().then((text) => {
                        alert(`An error occurred while trying to logout: ${text}`);
                    });
                }
            } catch (error) {
                console.error(error);
            }

        },
    },
    mounted() {
        this.logout();
    }
}
</script>

<style scoped>
.main {
  justify-content: center;
  margin: 30px 20%;
}

.content {
  padding: 20px;
  width: 100%;
  background-color: #333333;
  color: #eee;
}

.logout-message {
    text-align: center;
}
</style>