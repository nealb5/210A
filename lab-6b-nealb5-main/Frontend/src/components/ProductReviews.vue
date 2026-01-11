<template>
  <div class="reviews">
    <h3>Reviews:</h3>
    <div class="review" v-for="review in reviews" :key="review.id">
      <h4>{{ review.username }}</h4>
      <p>{{ review.review }}</p>
      <p>Rating: {{ review.rating }}</p>
    </div>
  </div>
</template>
  
<script>
export default {
  props: {
    reviews: {
      type: Array,
      required: true,
    },
  },
};
</script>
  
<style scoped>
.review {
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
}
</style>
  