<template>
  <form @submit.prevent="submitReview">
    <h3>Write a Review</h3>
    <textarea
      v-model="reviewText"
      placeholder="Your review"
      required
    ></textarea>
    <input
      v-model="rating"
      type="number"
      min="1"
      max="5"
      placeholder="Rating (1-5)"
      required
    />
    <button type="submit">Submit</button>
  </form>
</template>
  
<script>
export default {
  props: {
    productId: {
      type: Number,
      required: true,
    },
    userId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      reviewText: "",
      rating: "",
    };
  },
  methods: {
    async submitReview() {
      try {
        const response = await fetch(
          `${process.env.VUE_APP_CLIENT_ORIGIN}/api/products/submit-review`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              review: this.reviewText,
              rating: this.rating,
              product_id: this.productId, // now it's coming from props
              user_id: this.userId, // now it's coming from props
            }),
          }
        );
        console.log("Request body:", {
          review: this.reviewText,
          rating: this.rating,
          product_id: this.productId,
          user_id: this.userId,
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Clear the form
        this.reviewText = "";
        this.rating = "";
      } catch (error) {
        console.error("There was an error with the fetch operation: ", error);
      }
    },
  },
  mounted() {
    console.log("Product ID:", this.productId);
    console.log("User ID:", this.userId);
  },
};
</script>
  
<style scoped>
/* Your CSS styles here... */

/* Form specific styles */
form {
  margin-top: 20px;
}

/* Textarea specific styles */
textarea {
  padding: 10px;
  font-size: 1em;
  border: 1px solid #9e9e9e;
  border-radius: 5px;
  outline: none;
  width: 100%;
  box-sizing: border-box;
  background-color: #424242;
  color: #f5f5f5;
  margin-top: 10px;
}

/* Input specific styles */
input {
  padding: 10px;
  font-size: 1em;
  border: 1px solid #9e9e9e;
  border-radius: 5px;
  outline: none;
  width: 100%;
  box-sizing: border-box;
  background-color: #424242;
  color: #f5f5f5;
  margin-top: 10px;
}

/* Button specific styles */
button {
  margin-top: 10px;
  padding: 10px;
  background-color: #757575;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.1em;
  transition: all 0.3s ease-in-out;
  width: 100%;
  box-sizing: border-box;
}

button:hover {
  background-color: #bdbdbd;
}
</style>
  