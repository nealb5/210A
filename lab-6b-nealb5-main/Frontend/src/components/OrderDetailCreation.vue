<template>
  <details v-if="dataType == 'address'" class="card-details">
    <summary>Add New Address</summary>
    <form @submit.prevent="addNewDetail">
      <div class="field">
        <label>Street</label>
        <input v-model="address.street" placeholder="Enter street" type="text" required />
      </div>

      <div class="field-row">
        <div class="field half">
          <label>City</label>
          <input v-model="address.city" placeholder="Enter city" type="text" required />
        </div>
        <div class="field half">
          <label>State</label>
          <input v-model="address.state" placeholder="Enter state" type="text" required />
        </div>
      </div>

      <div class="field-row">
        <div class="field half">
          <label>ZIP</label>
          <input v-model="address.zip" placeholder="Enter ZIP code" type="number" required />
        </div>
        <div class="field half">
          <label>Country</label>
          <input v-model="address.country" placeholder="Enter Country" type="text" required />
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  </details>
  <details v-if="dataType == 'card'" class="card-details">
    <summary>Add New Card</summary>
    <form @submit.prevent="addNewDetail">
      <div class="field">
        <label>Cardholder Name</label>
        <input v-model="card.name" placeholder="Enter name" type="text" required />
      </div>

      <div class="field-row">
        <div class="field half">
          <label>Card Number</label>
          <input v-model="card.number" placeholder="Enter card number" type="number" required />
        </div>
        <div class="field half">
          <label>CVV</label>
          <input v-model="card.cvv" placeholder="Enter CVV" type="number" required />
        </div>
      </div>

      <div class="field-row">
        <div class="field half">
          <label>Expiry Month</label>
          <select v-model="card.month" required>
            <option v-for="month in months" :key="month" :value="month">
              {{ month }}
            </option>
          </select>
        </div>
        <div class="field half">
          <label>Expiry Year</label>
          <select v-model="card.year" required>
            <option v-for="year in years" :key="year" :value="year">
              {{ year }}
            </option>
          </select>
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  </details>
</template>

<script>
export default {
  props: ["dataType"],

  data() {
    return {
      card: {
        name: "",
        number: "",
        month: "",
        year: "",
        cvv: "",
      },
      address: {
        street: "",
        city: "",
        state: "",
        zip: "",
        country: "",
      }
    }
  },
  computed: {
    months() {
      return Array.from({ length: 12 }, (_, i) => i + 1);
    },
    currentYear() {
      return new Date().getFullYear();
    },
    years() {
      return Array.from({ length: 21 }, (_, i) => this.currentYear + i);
    },
  },
  methods: {
    addNewDetail() {
      if (this.dataType == "card") {
        this.$emit("add", this.card);
      } else if (this.dataType == "address") {
        this.$emit("add", this.address);
      }
      this.card = {
        name: "",
        number: "",
        month: "",
        year: "",
        cvv: "",
      }
      this.address = {
        street: "",
        city: "",
        state: "",
        zip: "",
        country: "",
      }
    }
  }
}
</script>

<style scoped>
input,
select {
  width: 100%;
  padding: 0.5em;
  color: #ccc;
  background-color: #444;
  border: 1px solid #777;
  border-radius: 4px;
}

input::placeholder,
select::placeholder {
  color: #777;
}

button {
  padding: 0.5em 1em;
  margin-top: 1em;
  color: #fff;
  background-color: #555;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #666;
}

button:disabled {
  background-color: #333;
  cursor: not-allowed;
}

details summary {
  padding: 0.5em;
  color: #fff;
  background-color: #333;
  cursor: pointer;
}

form {
  padding: 1em;
  color: #fff;
  background-color: #444;
}

.field-row {
  display: flex;
}

.field {
  margin-top: 15px;
  margin-left: 5px;
  margin-right: 5px;
}

.half {
  width: 50%;
}
</style>