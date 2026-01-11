<template>
  <table class="table table-dark text-center">
    <tr>
      <th></th>
      <th v-for="header in tableHeaders">{{ header }}</th>
      <th></th>
    </tr>
    <tr v-if="dataType == 'address'" v-for="entry in dataSource" :key="entry.id">
      <td class="address-select">
        <input type="radio" @click="selectEntry(entry)" name="selectedAddress" class="form-check-input" />
      </td>
      <td>
        {{ entry.street }}, {{ entry.city }},
        {{ entry.state }}, {{ entry.zip }}
      </td>
      <td>{{ entry.country }}</td>
      <td class="address-select">
          <i @click="deleteEntry(entry.id)" class="far fa-trash-alt delete-button"></i>
      </td>
    </tr>

    <tr v-if="dataType == 'card'" v-for="entry in dataSource" :key="entry.id">
      <td>
        <input type="radio" @click="selectEntry(entry)" name="selectedCard" class="form-check-input" />
      </td>
      <td>{{ entry.cardHolderName }}</td>
      <td>{{ entry.cardNumber }}</td>
      <td>{{ entry.expiryMonth }} / {{ entry.expiryYear }}</td>
      <td>
          <i @click="deleteEntry(entry.id)" class="far fa-trash-alt delete-button"></i>
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  props: ["dataSource", "dataType"],

  data() {
  },

  computed: {
    tableHeaders() {
      if (this.dataType == "address") {
        return ["Address", "Country"];
      }
      else if (this.dataType == "card") {
        return ["Cardholder Name", "Card Number", "Expiration Date"]
      }
    }
  },

  methods: {
    selectEntry(entry) {
      this.$emit('selected', entry);
    },

    deleteEntry(entry) {
      this.$emit('deleted', entry);
    }
  },

}
</script>

<style scoped>
th {
  background-color: #333333;
}

td {
  background-color: #444444;
  border: 1px solid #333333;
}

th, td {
  padding: 5px;
}

.delete-button:hover {
  background-color: red;
}
</style>