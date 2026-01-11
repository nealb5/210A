<template>
  <div id='task-list'>
  <v-list>
    <v-list-item v-for="task in tasks" :key="task._id">

        <template v-slot:prepend>
          <v-btn variant="text" @click="updateTask(task)">
            <v-icon v-if="task.Done" icon="mdi-checkbox-marked"></v-icon>
            <v-icon v-else icon="mdi-checkbox-blank-outline"></v-icon>
          </v-btn>
        </template>

        <v-list-item-title>
          {{ task.Text }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ task.Date }}
        </v-list-item-subtitle>
        <template v-slot:append>
          <v-btn icon @click="deleteTask(task)" color="red" variant="text">
            <v-icon icon="mdi-trash-can"></v-icon>
          </v-btn>
        </template>

    </v-list-item>
  </v-list>
</div>
</template>

<script>
import { deleteTask, updateTask} from '@/views/Home.vue'
export default {
  // Component name set to 'TaskList' for reference within the application.
  name: 'TaskList',
  // Component properties (props) define how you can pass data into this component from a parent component.
  props: {
    // 'tasks' prop defined to accept an array of tasks, with a default value of an empty array.
    tasks: {
      type: Array,
      default: () => []
    },
  },
  methods: {
    // 'deleteTask' method, emits a custom event 'deleteTask' to the parent component with the task to be deleted.
    deleteTask(task) {
      this.$emit("deleteTask", task)
    },
    // 'updateTask' method, emits a custom event 'updateTask' to the parent component with the task to be updated.
    updateTask(task) {
      this.$emit("updateTask", task)
    },
  },
}
</script>
