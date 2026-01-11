<template>
  <div class="basket-container">
    <h1 class="basket-title">My Basket</h1>
    <div v-if="items.length" class="basket-items-container">
      <div v-for="item in items" :key="item.id" class="basket-item-row">
        <img class="product-image" :src="require('@/assets/products/' + item.image_url)" alt="Product Image" />
        <div class="basket-item-content">
          <div class="product-name">{{ item.name }}</div>
          <div class="product-control">
            <button class="quantity-btn" @click="decrementQuantity(userId, item.id)">
              <i class="fa fa-minus-square"></i>
            </button>
            <span class="product-quantity">{{ item.quantity }}</span>
            <button class="quantity-btn" @click="incrementQuantity(userId, item.id)">
              <i class="fa fa-plus-square"></i>
            </button>
          </div>
          <div class="product-price">Price: ${{ item.price }}</div>
          <div></div>
          <!-- This is the empty space.-->
          <button class="remove-btn" @click="removeFromBasket(userId, item.id)">
            <i class="fa fa-trash-alt"></i>
          </button>
        </div>
      </div>
      <div class="total-price">Total Price: ${{ totalPrice }}</div>
    </div>
    <div v-else class="empty-message">
      {{ message }}
    </div>
    <button v-if="items.length" class="checkout-button" @click="goToCheckout">Checkout</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      items: [],
      message: "",
      quantity: {},
    };
  },

  computed: {
    ...mapGetters(["isLoggedIn", "accessToken", "cartItems", "cartCount", "orderAddress", "orderCard", "userId", "userEmail", "userRole",]),

    totalPrice() {
      return this.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    }
  },

  methods: {
    ...mapActions(["addToCart", "removeFromCart", "clearCart"]),

    async removeFromBasket(userId, productId) {
      const response = await fetch(
        `${process.env.VUE_APP_CLIENT_ORIGIN}/api/products/basket-items/${userId}/${productId}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      // Reload items to update the UI after an item has been removed.
      this.loadItems();
      // await this.updateCartCount(); // Update cart count
    },

    async incrementQuantity(userId, productId) {
      const response = await fetch(
        `${process.env.VUE_APP_CLIENT_ORIGIN}/api/products/basket-items/${userId}/${productId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ changeInQuantity: 1 }),
        }
      );
      const data = await response.json();
      this.loadItems();
      // this.addToCart({
      //   id: productId,
      //   quantity: this.quantity[productId],
      // });
    },

    async decrementQuantity(userId, productId) {
      const response = await fetch(
        `${process.env.VUE_APP_CLIENT_ORIGIN}/api/products/basket-items/${userId}/${productId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ changeInQuantity: -1 }),
        }
      );
      const data = await response.json();
      this.loadItems();
      // this.removeFromCart({
      //   id: productId,
      //   quantity: this.quantity[productId],
      // });
    },

    async goToCheckout() {
      this.$router.push({ name: "details" });
    },

    async loadItems() {
      if (this.userId) {
        const response = await fetch(
          `${process.env.VUE_APP_CLIENT_ORIGIN}/api/products/basket-items/${this.userId}`
        );
        if (response.ok) {
          const text = await response.text();
          this.clearCart();
          if (text) {
            const data = JSON.parse(text);
            if (data.message) {
              if (data.message == "No data found.") {
                this.message = "No items in cart."
              } else {
                this.message = data.message;
              }
            } else {
              for (const item of data) {
                this.addToCart(item);
              }
            }
          }
        } else {
          console.log("HTTP error, status = " + response.status);
          this.message = `Error: HTTP status code ${response.status}`;
        }
      }

      this.items = this.cartItems;
    },

    // // Adds the product to the Vuex cart state.
    // async addToCart(productId) {
    //   this.addToCart({
    //     id: productId,
    //     quantity: this.quantity[productId],
    //   });
    // },
    // // Removes the product to the Vuex cart state.
    // async removeFromCart(productId) {
    //   this.removeFromCart({
    //     id: productId,
    //     quantity: this.quantity[productId],
    //   });
    // },
  },

  async mounted() {
    this.loadItems();
  },
};
</script>

<style scoped src="../styles/basket-items.css"></style>
