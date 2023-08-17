<!-- <template>
  <div>
    <h2>To-Do List</h2>
    <div v-if="todos.length === 0">No to-do items yet.</div>
    <ul v-else>
      <li v-for="(todo, index) in todos" :key="index">
        {{ todo.task }}
        <button @click="updateTodo(todo)">Edit</button>
        <button @click="deleteTodo(todo)">Delete</button>
      </li>
    </ul>
    <form @submit.prevent="addTodo">
      <input v-model="newTodo" type="text" placeholder="Enter a new task" />
      <button type="submit">Add</button>
    </form>
  </div>
</template> -->

<template>
  <div class="container">
    <!-- heading -->
    <h1 class="text-center">Todo App</h1>
    <!-- input -->
    <div>
      <input type="text" v-model="newTodo" placeholder="Enter a new task" required />
      <input type="text" v-model="description" placeholder="Description" required />
      <button class="add-btn" @click="addTodo" :disabled="!newTodo || !description">ADD</button>
    </div>

    <!-- table -->
    <table border="3">
      <thead>
        <tr>
          <th>ID</th>
          <th>Task</th>
          <th>Description</th> <!-- New column for viewing description -->
          <th>Delete</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(todo, index) in todos" :key="index">
          <td>{{ todo.id }}</td>
          <td>{{ todo.task }}</td>
          <td>
            <button class="view-desc-btn" @click="openModal(todo.description)">View Description</button>
            <!-- New button -->
          </td>
          <td>
            <button class="del-btn" @click="deleteTodo(todo)">Delete</button>
          </td>
          <td>
            <button class="edit-btn" @click="updateTodo(todo)">Edit</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Modal for viewing description -->
    <TaskDescriptionModal :isOpen="isModalOpen" :description="taskDescription" @close="closeModal" />
  </div>
</template>

  
<style scoped>
.container {
  width: 600px;
  margin: auto;

}

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  margin-top: 20px;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}

.add-btn {
  border: none;
  width: 100px;
  height: 30px;
  padding: 2px;
  background-color: teal;
  color: white;
}

.del-btn {
  border: none;
  background-color: red;
  color: white;
}

.edit-btn {
  border: none;
  background-color: #77b631;
  color: white;

}
</style>

<script>
import axios from 'axios';
import TaskDescriptionModal from './TaskDescriptionModal.vue'; // Import the modal component

axios.defaults.baseURL = 'http://localhost:3000';

export default {
  components: {
    TaskDescriptionModal, // Register the modal component
  },

  data() {
    return {
      todos: [], // To store the fetched to-do items
      newTodo: '', // To store the value of the new to-do item
      isModalOpen: false, // To control whether the modal is open or closed
      taskDescription: '', // To store the description of the task to display in the modal
    };
  },

  mounted() {
    // Fetch the to-do items from the backend API when the component is mounted
    this.fetchTodos();
  },
  methods: {
    openModal(description) {
      this.isModalOpen = true;
      this.taskDescription = description;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    fetchTodos() {
      const token = localStorage.getItem('token');
      if (!token) {
        this.$router.push('/login'); // Redirect to /login using Vue Router
        return; // Exit the function early to prevent further execution
      }

      axios.get('/api/todo', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then((response) => {
          this.todos = response.data;
        })
        .catch((error) => {
          if (error.response && error.response.status === 403) {
            // Handle the 403 error specifically
            this.showNotification('You are not authorized to add a new to-do item.');
            this.$router.push('/login'); // Redirect to /login using Vue Router
          } else {
            console.error('Error adding a new to-do item:', error);
          }
        });
    },

    addTodo() {
      const token = localStorage.getItem('token');
      if (!token) {
        this.$router.push('/login'); // Redirect to /login using Vue Router
        return; // Exit the function early to prevent further execution
      }

      axios.post('/api/todo', { task: this.newTodo, description: this.description }, { headers: { 'Authorization': `Bearer ${token}` } })
        .then((response) => {
          this.todos.push(response.data);
          this.newTodo = '';
        })
        .catch((error) => {
          if (error.response && error.response.status === 403) {
            // Handle the 403 error specifically
            this.showNotification('You are not authorized to add a new to-do item.');
            this.$router.push('/login'); // Redirect to /login using Vue Router
          } else {
            console.error('Error adding a new to-do item:', error);
          }
        });
    },

    showNotification(message) {
      alert(message);
    },


    async updateTodo(todo) {
      const token = localStorage.getItem('token');
      if (!token) {
        this.$router.push('/login'); // Redirect to /login using Vue Router
        return; // Exit the function early to prevent further execution
      }
      const updatedTask = prompt('Enter the updated task:', todo.task);

      if (updatedTask) {
        try {
          const response = await axios.put(`/api/todo/${todo.id}`, { task: updatedTask }, { headers: { 'Authorization': `Bearer ${token}` } });

          const updatedTodoIndex = this.todos.findIndex((t) => t.id === response.data.id);
          this.todos[updatedTodoIndex] = response.data;

          // Trigger reactivity by cloning the todos array
          this.todos = [...this.todos];
        } catch (error) {
          if (error.response && error.response.status === 403) {
            this.showNotification('You are not authorized to update this to-do item.');
            this.$router.push('/login'); // Redirect to /login using Vue Router
          } else {
            console.error('Error updating the to-do item:', error);
          }
        }
      }
    },

    deleteTodo(todo) {
      const token = localStorage.getItem('token');
      if (!token) {
        this.$router.push('/login'); // Redirect to /login using Vue Router
        return; // Exit the function early to prevent further execution
      }

      if (confirm(`Are you sure you want to delete "${todo.task}"?`)) {
        axios.delete(`/api/todo/${todo.id}`, { headers: { 'Authorization': `Bearer ${token}` } })
          .then(() => {
            this.todos = this.todos.filter((t) => t.id !== todo.id);
          })
          .catch((error) => {
            console.error('Error deleting the to-do item:', error);
          });
      }
    },
  },
};

</script>