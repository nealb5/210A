<template>
  <div id="products">
    <h1>Product List</h1>
    <div class="product-grid">
      <div class="product-card" v-for="product in products" :key="product.id" @click="showDescription(product)">
        <h2 class="product-title">{{ product.name }}</h2>
        <p class="product-price">${{ product.price }}</p>
        <img class="product-image" :src="require('@/assets/products/' + product.image_url)" alt="Product Image" />
        <button v-if="isLoggedIn" class="add-basket-btn" @click.stop="addToBasket(product.id)">
          Add to Basket
        </button>

        <div v-if="selectedProduct === product" class="overlay">
          <div class="overlay-content">
            <img class="product-image-overlay" :src="require('@/assets/products/' + product.image_url)"
              alt="Product Image" />
            <p class="product-description">{{ product.description }}</p>
            <p v-if="isLoggedIn">
              <ReviewForm :productId="selectedProduct.id" :userId="userId" />
            </p>
            <p v-if="itemAdded" class="confirmation-message">
              {{ confirmationMessage }}
            </p>
            <button class="close-button" @click.stop="selectedProduct = null">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters, mapActions } from "vuex";

import ReviewForm from "../components/ReviewForm.vue";

export default {
  components: {
    ReviewForm, // Register the ReviewForm component
  },

  data() {
    return {
      products: [],
      selectedProduct: null,
      quantity: {},
      itemAdded: false,
      confirmationMessage: "",
    };
  },

  computed: {
    ...mapGetters(["isLoggedIn", "userId", "cartCount"]),
  },

  methods: {
    ...mapActions(["addToCart"]),

    showDescription(product) {
      this.selectedProduct = product;
    },

    async addToBasket(productId) {
      try {
        const response = await fetch(
          `${process.env.VUE_APP_CLIENT_ORIGIN}/api/products/basket-items/${this.userId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: this.userId,
              productId: productId,
              quantity: this.quantity[productId],
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            this.itemAdded = true;
            this.confirmationMessage = "Item successfully added to the basket";

            // Adds the product to the Vuex cart state.
            this.addToCart({
              id: productId,
              quantity: this.quantity[productId],
            });
          } else {
            throw new Error("There was an issue adding the item to the basket");
          }
        } else {
          throw new Error("There was an issue adding the item to the basket");
        }
      } catch (error) {
        this.itemAdded = true;
        this.confirmationMessage = error.message;
      } finally {
        setTimeout(() => {
          this.itemAdded = false;
        }, 3000); // message will disappear after 3 seconds
      }
    },

    handleOutsideClick(event) {
      const overlay = this.$el.querySelector(".overlay");
      if (overlay && !overlay.contains(event.target)) {
        this.selectedProduct = null;
      }
    },

  },

  async mounted() {
    const response = await fetch(
      `${process.env.VUE_APP_CLIENT_ORIGIN}/api/products/listAll`
    );
    this.products = await response.json();
    this.products.forEach((product) => {
      this.quantity[product.id] = 1; // Initializes the quantity for each product
    });
  },

};
</script>

<style scoped src="../styles/product-list.css"></style>
