<template>
  <div class="home">
    <v-card class="mx-auto" max-width="900" v-if="fetched">
      <!-- Listen for the add-task event instead of using a prop -->
      <new-task-form v-bind:form="form" @handleSubmit="createTask"></new-task-form>
      <v-divider></v-divider>
      <v-list subheader two-line flat>
        <v-list-subheader>{{ user.username }}'s Tasks:</v-list-subheader>
        <TaskList :tasks="tasks" @deleteTask="deleteTask" @updateTask="updateTask"></TaskList>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import { formatDate, getCurrentDate } from '@/util';
import NewTaskForm from '@/components/NewTaskForm.vue';
import TaskList from '@/components/TaskList.vue';

export default {
  name: 'Home',
  components: {
    NewTaskForm,
    TaskList,
  },
  props: {
    user: Object,
  },
  data: () => ({
    fetched: false, // This keeps us from getting an error when the page loads, but there's no data
    tasks: [], // This will hold the list of tasks you get from your API
    form: {
      Text: '',
      Date: formatDate(getCurrentDate()),
    },
  }),
  mounted() {
    this.readTasks();
  },
  methods: {
    async createTask(form) {
        console.log("createTask is reached")
        console.log(form)
        fetch(`${process.env.VUE_APP_API_ORIGIN}/api/v1/tasks`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })
      .then(response => {
        if (response.ok) {
        this.readTasks();
        this.form.Text = '';
        this.form.Date = formatDate(getCurrentDate());
        }
      });
    },
    readTasks() {
      fetch(`${process.env.VUE_APP_API_ORIGIN}/api/v1/tasks`, {
        method: 'GET',
        credentials: 'include',
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.tasks = data;
        this.fetched = true;
      });
    },
    updateTask(task) {
      fetch(`${process.env.VUE_APP_API_ORIGIN}/api/v1/tasks/${task._id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Done: !task.Done }),
      })
      .then(response => {
        if (response.ok) {
          this.readTasks();
        }
      });
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