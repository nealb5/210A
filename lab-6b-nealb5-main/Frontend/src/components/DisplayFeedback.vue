<template>
  <div class="center-layout">
    <div class="elevation-z6">
      <h1>Customer Feedback</h1>

      <table class="feedback-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Author</th>
            <th>Feedback</th>
            <th>Rating</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="feedback in feedbackEntries" :key="feedback.id">
            <td>{{ feedback.userId }}</td>
            <td>{{ feedback.author }}</td>
            <td v-html="feedback.feedback"></td>
            <td>{{ feedback.rating }}</td>
            <td>{{ new Date(feedback.created_at).toLocaleString() }}</td>
            <td>{{ new Date(feedback.updated_at).toLocaleString() }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      feedbackEntries: [],
    };
  },
  methods: {
    async getFeedback() {
      try {
        const response = await fetch(
          `${process.env.VUE_APP_CLIENT_ORIGIN}/api/users/feedback`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const feedbackEntries = await response.json();
        this.feedbackEntries = feedbackEntries;
      } catch (error) {
        console.error("There was an error with the fetch operation: ", error);
      }
    },
  },
  async created() {
    await this.getFeedback();
  },
};
</script>

<style scoped>
.center-layout {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  color: #fff;
}

.elevation-z6 {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  padding: 2em;
  background-color: #404040;
  border-radius: 5px;
  color: #ccc;
  min-height: 80vh;
  width: 100%;
}

.feedback-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 2em;
}

.feedback-table th,
.feedback-table td {
  padding: 1em;
  border-bottom: 1px solid #444;
}

.feedback-table th {
  text-align: left;
  color: #bbb;
}

.feedback-table td {
  color: #ccc;
}

.feedback-table tr:last-child td {
  border-bottom: none;
}
</style>
