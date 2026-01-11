<template>
  <div class="main">
    <div class="content">
      <h1>Customer Feedback</h1>
      <form v-if="!formSubmitted" @submit.prevent="submit" class="form-container">
        <div class="form-field spacing author-container">
          <label>Author</label>
          <input v-model="author" type="text" placeholder="Author's Name" required />
        </div>

        <div class="form-field spacing review-container">
          <textarea id="comment" v-model="feedback" rows="4" cols="50" maxlength="160" placeholder="Write your review..."
            required></textarea>
          <em>Max: 160 characters</em>
          <p class="hint">{{ feedback.length }}/160</p>
        </div>

        <div class="rating-container">
          <label>Rating</label>
          <input id="rating" type="range" min="1" max="5" v-model="rating" required />
        </div>

        <button class="btn btn-secondary">Submit</button>

      </form>
      <div v-else>
        {{ message }}
      </div>
    </div>
  </div>
</template>
    
<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      author: "",
      feedback: "",
      rating: 5,
      message: "",
      formSubmitted: false
    };
  },

  computed: {
    ...mapGetters(["userId"]),
  },

  methods: {
    async submit() {
      if (!this.author || !this.feedback || !this.rating) {
        return;
      }

      const feedbackData = {
        userId: this.userId,
        author: this.author,
        feedback: this.feedback,
        rating: this.rating,
      };
      console.log(feedbackData);
      try {
        const response = await fetch(
          `${process.env.VUE_APP_CLIENT_ORIGIN}/api/users/feedback`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(feedbackData),
          }
        );

        if (!response.ok) {
          console.error(`HTTP error! status: ${response.status}`);
        } else {
          this.message = "Feedback submitted. Thanks for your response."
          this.formSubmitted = true;
        }
      } catch (error) {
        console.error("There was an error with the fetch operation: ", error);
      }
    },
  },

};
</script>

<style scoped>
body {
  background-color: #333;
  color: #fff;
}

.main {
  justify-content: center;
  align-items: center;
  margin: 30px 20%;
}

.content {
  background-color: #333333;
  padding: 20px;
}

.form-field {
  display: flex;
  flex-direction: column;
}

.form-field>input,
.form-field>textarea {
  border-radius: 5px;
  padding: 0.5rem;
  border: none;
  background: #666;
  color: #fff;
}

.form-field>input::placeholder,
.form-field>textarea::placeholder {
  color: #bbb;
  opacity: 0.7;
}

.hint {
  color: #bbb;
  font-size: 0.875em;
}

.spacing {
  margin-bottom: 10px;
}

.rating-container {
  display: flex;
  margin-bottom: 10px;
}
.rating-container > label {
  margin-right: 5px;
}
</style>