<template>
  <div id="main">
    <div id="content">
      <h1>{{ currentHeader }}</h1>
      <OrderDataSelection :dataSource="currentData" :dataType="currentStep" @selected="setOrderDetail"
        @deleted="deleteOrderDetail" />
      <OrderDetailCreation :dataType="currentStep" @add="addNewOrderDetail" />
      <div>
        <button v-if="showNextButton" @click="nextStep" class="btn btn-secondary btn-next">
          <i class="fas fa-chevron-right" style="margin-right: 5px;"></i>
          <span class="btn-text">Next</span>
        </button>
        <router-link v-if="showSummaryButton" to="/checkout/summary" class="btn-next">
          <button class="btn btn-secondary">
            <i class="fas fa-chevron-right" style="margin-right: 5px;"></i>
            <span class="btn-text">Summary</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Cookies from "js-cookie";
import OrderDataSelection from '@/components/OrderDataSelection.vue'
import OrderDetailCreation from '@/components/OrderDetailCreation.vue'
import router from "@/router";

export default {
  components: {
    OrderDataSelection,
    OrderDetailCreation
  },

  data() {
    return {
      currentStep: 'address', // or "card"
      cardData: [],
      addressData: [],
    }
  },

  computed: {
    ...mapGetters(["isLoggedIn", "accessToken", "cartItems", "cartCount", "orderAddress", "orderCard", "userId", "userEmail", "userRole",]),

    showNextButton() {
      if (this.currentStep == "address" && this.orderAddress) {
        return true;
      } else {
        return false;
      }
    },

    showSummaryButton() {
      if (this.currentStep == "card" && this.orderCard) {
        return true;
      } else {
        return false;
      }
    },

    currentHeader() {
      if (this.currentStep == "address") {
        return "Select an Address";
      } else if (this.currentStep == "card") {
        return "Select a Credit Card";
      } else {
        return "Error: Unknown Step"
      }
    },

    currentData() {
      if (this.currentStep == "address") {
        return this.addressData;
      } else if (this.currentStep == "card") {
        return this.cardData;
      }
    }
  },

  methods: {
    ...mapActions(["setOrderAddress", "setOrderCard"]),
    nextStep() {
      if (this.currentStep == "address") {
        this.currentStep = "card"
      } else if (this.currentStep == "card") {
        window.location.pathname('/checkout/summary')
      }
    },

    setOrderDetail(detail) {
      if (this.currentStep == "address") {
        this.setOrderAddress(detail);
      } else if (this.currentStep == "card") {
        this.setOrderCard(detail);
      }
    },

    deleteOrderDetail(id) {
      if (this.currentStep == "address") {
        this.deleteAddress(id);
      } else if (this.currentStep == "card") {
        this.deleteCard(id);
      }
    },

    addNewOrderDetail(detail) {
      if (this.currentStep == "address") {
        this.addNewAddress(detail);
      } else if (this.currentStep == "card") {
        this.addNewCard(detail);
      }
    },

    async getAddresses() {
      try {
        const response = await fetch(
          `${process.env.VUE_APP_CLIENT_ORIGIN}/api/users/user/${this.userId}/address`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${this.accessToken}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          if (data.status === "success") {
            return data.data;
          } else {
            console.error(data.message);
          }
        } else {
          console.error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        console.error(error);
      }
      return [];
    },

    async getCards() {
      try {
        const response = await fetch(
          `${process.env.VUE_APP_CLIENT_ORIGIN}/api/users/user/${this.userId}/payment`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${this.accessToken}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          if (data.status === "success") {
            return data.data;
          } else {
            console.error(data.message);
          }
        } else {
          console.error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        console.error(error);
      }
      return [];
    },

    async addNewAddress(address) {
      try {
        const response = await fetch(
          `${process.env.VUE_APP_CLIENT_ORIGIN}/api/users/user/${this.userId}/address`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.accessToken}`,
            },
            body: JSON.stringify({
              street: address.street,
              city: address.city,
              state: address.state,
              zip: address.zip,
              country: address.country,
            }),
          }
        );
        if (response.ok) {
          const data = await response.json();
          if (data.status === "success") {
            let newAddressData = await this.getAddresses();
            this.addressData = newAddressData;
          } else {
            console.error(data.message);
          }
        } else {
          console.error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        console.error(error);
      }
    },

    async addNewCard(card) {
      try {
        const response = await fetch(
          `${process.env.VUE_APP_CLIENT_ORIGIN}/api/users/user/${this.userId}/payment`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.accessToken}`,
            },
            body: JSON.stringify({
              cardName: card.name,
              cardNumber: card.number,
              expiryMonth: card.month,
              expiryYear: card.year,
              cvv: card.cvv,
            }),
          }
        );
        if (response.ok) {
          const data = await response.json();
          if (data.status === "success") {
            let newCardData = await this.getCards();
            this.cardData = newCardData;
          } else {
            console.error(data.message);
          }
        } else {
          console.error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        console.error(error);
      }
    },

    async deleteAddress(addressId) {
      try {
        const response = await fetch(
          `${process.env.VUE_APP_CLIENT_ORIGIN}/api/users/user/${this.userId}/address/${addressId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${this.accessToken}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          if (data.status === "success") {
            let newAddressData = await this.getAddresses();
            this.addressData = newAddressData;
          } else {
            console.error(data.message);
          }
        } else {
          console.error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        console.error(error);
      }
    },

    async deleteCard(cardId) {
      try {
        const response = await fetch(
          `${process.env.VUE_APP_CLIENT_ORIGIN}/api/users/user/${this.userId}/payment/${cardId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${this.accessToken}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          if (data.status === "success") {
            let newCardData = await this.getCards();
            this.cardData = newCardData;
          } else {
            console.error(data.message);
          }
        } else {
          console.error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        console.error(error);
      }
    },
  },

  async mounted() {
    if (!this.cartCount) {
      router.push({ name: "product" })
    }
    let data = await this.getAddresses();
    this.addressData = data;

    data = await this.getCards();
    this.cardData = data;

    this.setOrderAddress(null);
    this.setOrderCard(null);
    this.currentStep = "address";
  }

}
</script>

<style scoped>
#content {
  margin: 30px 20%;
}

.btn-next {
  float: right;
  margin-top: 10px;
}
</style>