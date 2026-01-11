<template>
  <div class="home">
    <v-card class="mx-auto" max-width="900" v-if="fetched">

      <!-- TODO: Add your NewTaskForm component -->
      <!-- Make sure to pass in any necessary props -->

      <v-divider></v-divider>
      <v-list subheader two-line flat>
        <v-list-subheader>

          <!-- TODO: use the `user` prop to display the user's username here -->'s Tasks:

        </v-list-subheader>

        <!-- TODO: Add your TaskList component -->
        <!-- Make sure to pass in any necessary props -->

      </v-list>
    </v-card>
  </div>
</template>

<script>
import { getCurrentDate, formatDate } from '@/util'
// TODO: Import the components you want to use from their files
export default {
  name: 'Home',
  components: {
    // TODO: Use the Vue Documentation to find out how to use this property
  },
  props: {
    // TODO: Add the user object as a prop that's passed in from the App.vue component
  },
  data: () => ({
    fetched: false, // This keeps us from getting an error when the page loads, but there's no data
    tasks: [], // This will hold the list of tasks you get from your API
    form: {
      // TODO: Add 2 properties to this form data object to track the Text and the Date
      // HINT: Capitalize the "Text" and "Date" properties to make it easier to pass the data to your API
      // HINT: You can use the `getCurrentDate()` method to get today's date in the proper format for the date picker
    },
  }),
  mounted() {
    // TODO: Call the method that gets the tasks from your API
  },
  methods: {
    createTask(form) {
      // TODO: Use fetch() to send a POST request to your API that includes the data from this.form
      // TODO: Remember to get the updated task list when it's done
      // TODO: Remember to reset the values in this.form to their initial values when it's done
    },
    readTasks() {
      // TODO: Use fetch() to send a GET request to your API and update this.fetched and this.tasks with the data that's returned
    },
    updateTask(task) {
      // TODO: Use fetch() to send a PUT request to your API to update an task to be Done/not Done.
      // TODO: Remember that the task's ID should be included in the path of the request, i.e. http://yourserverurl/api/v1/tasks/2r984hfiwufw948feoi
      // TODO: Remember to get the updated task list when it's done
    },
    // This method is given to you. Use it to see how to make fetch() requests.
    deleteTask(task) {
      fetch(
        // The first parameter is a string that contains the full URL to your endpoint
        `${process.env.VUE_APP_API_ORIGIN}/api/v1/tasks/${task._id}`,
        // The second parameter is an object with options. You can include request
        // headers here, options for credentials, which method, which mode, etc.
        {
          method: `DELETE`,
          credentials: `include`,
        }
        // Note: The default for method is GET, so you don't need to include the
        // method on any GET requests.
      ).then(response => {
        // Here we're just checking if the response was successful or not before
        // trying to do anything about it.
        if (response.ok) {
          // If it is successful, we want to update the task list.
          this.readTasks()
        }
      })
    }
  }
}
</script>

<style scoped>
.form {
  padding: 0 1rem;
}
</style>


