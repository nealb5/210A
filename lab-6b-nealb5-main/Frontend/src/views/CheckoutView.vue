<template>
  <div id="main">
    <div v-if="!message" class="content">
      <h1>Order Summary</h1>
      <div class="order-summary">
        <div class="summary cart-summary" v-if="cartItems.length">
          <h2>Your Basket</h2>
          <div class="cart-item" v-for="item in cartItems" :key="item.id">
            <img class="item-image" :src="require('@/assets/products/' + item.image_url)" alt="Product Image" />
            <div class="item-name">{{ item.name }} - ${{ item.price }} x {{ item.quantity }}</div>
          </div>
          <h3>Total: ${{ totalPrice }}</h3>
        </div>

        <div v-if="orderAddress || orderCard" class="summary address-card-summary">
          <h2>Shipping and Payment Info</h2>
          <div v-if="orderAddress" class="address-summary">
            <h3>Shipping Address</h3>
            <div>Street: {{ orderAddress.street }}</div>
            <div>City: {{ orderAddress.city }}</div>
            <div>State: {{ orderAddress.state }}</div>
            <div>ZIP: {{ orderAddress.zip }}</div>
          </div>
          <div v-if="orderCard" class="card-summary">
            <h3>Credit Card</h3>
            <div>Name: {{ orderCard.cardHolderName }}</div>
            <div>Number: {{ orderCard.cardNumber }}</div>
            <div>CVV: {{ orderCard.cvv }}</div>
            <div>Expiration Date: {{ orderCard.expiryMonth }} / {{ orderCard.expiryYear }}</div>
          </div>
        </div>
      </div>
      <button class="btn btn-secondary checkout-button" @click="submitOrder">
        Submit Order
      </button>
    </div>
    <div v-else class="content">
      <div class="submit-message">
        <h2>{{ message }}</h2>
        <router-link class="nav-link home-logo" to="/">
          <button class="btn btn-secondary homepage-button">
            Return to homepage
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>
  
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      message: "",
    };
  },

  computed: {
    ...mapGetters(["userId", "orderAddress", "orderCard", "cartItems"]),
    totalPrice() {
      return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    }
  },

  methods: {
    ...mapActions(["clearCart", "setOrderAddress", "setOrderCard"]),

    async submitOrder() {
      // Code to submit the order to the backend and clear the basket items
      const response = await fetch(
        `${process.env.VUE_APP_CLIENT_ORIGIN}/api/products/checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: this.userId, total: this.total }),
        }
      );

      if (response.ok) {
        this.clearCart();
        this.setOrderAddress(null);
        this.setOrderCard(null);
        this.message = "Thank you for your order!";
      } else {
        this.message = `Error: HTTP status code ${response.status}`;
      }
    },
  },

  async mounted() {
    // if (this.userId) {
    //   const response = await fetch(
    //     `${process.env.VUE_APP_CLIENT_ORIGIN}/api/products/basket-items/${this.userId}`
    //   );

    //   if (response.ok) {
    //     const text = await response.text();

    //     if (text) {
    //       const data = JSON.parse(text);
    //       if (data.message) {
    //         this.message = data.message;
    //       } else {
    //         this.items = data;
    //         this.total = this.items.reduce(
    //           (acc, item) => acc + item.price * item.quantity,
    //           0
    //         );
    //       }
    //     }
    //   } else {
    //     console.log("HTTP error, status = " + response.status);
    //     this.message = `Error: HTTP status code ${response.status}`;
    //   }
    // }

  },

};
</script>
  
<style scoped src="../styles/checkout.css"></style>
  