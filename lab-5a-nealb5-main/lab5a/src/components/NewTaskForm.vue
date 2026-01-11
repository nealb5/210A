<template>
  <div id="new-task-form">
    <v-form v-on:submit.prevent="handleSubmit">
      <v-container>
        <v-row>
          <v-col cols="12" xs="12" sm="6">
            <v-text-field v-model="form.Text" label="Add a task..." prepend-icon="edit" required></v-text-field>
          </v-col>
          <v-col cols="12" xs="12" sm="4">
            <v-menu v-model="menu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
              <template v-slot:activator="{ on }">
                <v-text-field v-model="form.Date" label="When should the task be done?" prepend-icon="event" v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="form.Date" @input="menu = false"></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" xs="4" offset-xs="4" sm="2">
            <v-btn class="mt-3" type="submit" text color="success" block>
              <v-icon left>mdi-plus</v-icon>
              Add Task
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import { getCurrentDate, formatDate } from '@/util'
export default {
  // Defines the component name as 'NewTaskForm'. This is used in referencing the component in other parts of the application.
  name: 'NewTaskForm',
  // This is where you define properties that you expect to change during the component's lifecycle.
  data: () => ({
    // 'menu' is a boolean used to control the visibility of a menu or form element, initially set to false.
    menu: false,
    // 'form' is an object that will hold the user's input data for a new task. Initially, it's an empty object.
    form: {
    },
  }),
  // Methods object defines functions that can be called from this component.
  methods: {
    // 'handleSubmit' is a method that is called when the user submits the form.
    handleSubmit() {
      // Emits an event named 'handleSubmit' and passes the form data to the parent component or event listener.
      this.$emit('handleSubmit', this.form);
      // Resets the form to its initial state after submission.
    },
  },
}

</script>

<style scoped>
form {
  padding: 0 1rem;
}
</style>