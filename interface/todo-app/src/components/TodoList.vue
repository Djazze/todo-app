<template>
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
</template>

<script>
import axios from 'axios';
import { authenticateJWT } from '@../../../authenticateJWT.js';
axios.defaults.baseURL = 'http://localhost:3000';

export default {
  data() {
    return {
      todos: [], // To store the fetched to-do items
      newTodo: '', // To store the value of the new to-do item
    };
  },
  mounted() {
    // Fetch the to-do items from the backend API when the component is mounted
    this.fetchTodos();
  },
  methods: {
    fetchTodos() {
      axios.get('/api/todo', { headers: authenticateJWT() })
        .then((response) => {
          this.todos = response.data;
        })
        .catch((error) => {
          console.error('Error fetching to-do items:', error);
        });
    },
    addTodo() {
      axios.post('/api/todo', { task: this.newTodo }, { headers: authenticateJWT() })
        .then((response) => {
          this.todos.push(response.data);
          this.newTodo = '';
        })
        .catch((error) => {
          console.error('Error adding a new to-do item:', error);
        });
    },
    updateTodo(todo) {
      const updatedTask = prompt('Enter the updated task:', todo.task);
      if (updatedTask) {
        axios.put(`/api/todo/${todo._id}`, { task: updatedTask }, { headers: authenticateJWT() })
          .then((response) => {
            const updatedTodoIndex = this.todos.findIndex((t) => t._id === todo._id);
            this.todos[updatedTodoIndex] = response.data;
          })
          .catch((error) => {
            console.error('Error updating the to-do item:', error);
          });
      }
    },
    deleteTodo(todo) {
      if (confirm(`Are you sure you want to delete "${todo.task}"?`)) {
        axios.delete(`/api/todo/${todo._id}`, { headers: authenticateJWT() })
          .then(() => {
            this.todos = this.todos.filter((t) => t._id !== todo._id);
          })
          .catch((error) => {
            console.error('Error deleting the to-do item:', error);
          });
      }
    },
  },
};
</script>
