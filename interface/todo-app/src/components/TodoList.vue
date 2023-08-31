<template>
  <div class="container">
    <h1 class="text-center">Todo App</h1>
    <!-- table -->
    <table border="3">
      <thead>
        <tr>
          <th>ID</th>
          <th>Task</th>
          <th>Description</th>
          <th>Delete</th>
          <th>Edit</th>
          <th>Status</th> <!-- New column for Status -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="(todo, index) in todos" :key="index">
          <td>{{ todo.id }}</td>
          <td>{{ todo.task }}</td>
          <td>
            <button class="view-desc-btn" @click="openModalDesc(todo.description)">View Description</button>
          </td>
          <td>
            <button class="del-btn" @click="deleteTodo(todo)">Delete</button>
          </td>
          <td>
            <button class="edit-btn" @click="updateTodo(todo)">Edit</button>
          </td>
          <td class="select-wrapper">
            <select v-model="todo.status" @change="updateStatus(todo)" :style="getDropdownColor(todo.status)"
              class="modern-select">
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </td> <!-- New Status column with dropdown -->
        </tr>
      </tbody>
    </table>
    <div>
      <button class="add-btn" :class="{ 'hovered': isButtonHovered }" @mouseover="isButtonHovered = true"
        @mouseout="isButtonHovered = false" @click="openModal">
        Add To-Do
      </button>
    </div>
    <!-- Modal for viewing description -->
    <TaskDescriptionModal :isOpen="isTaskDescriptionModalOpen" :description="taskDescription"
      @close="closeTaskDescriptionModal" />
    <AddTodoModal :showModal="isAddTodoModalOpen" @closeModal="closeAddTodoModal" @add-todo="addTodo"></AddTodoModal>
  </div>
</template>

  
<style scoped>
.container {
  /* width: 600px; */
  margin: auto;
}

.select-wrapper {
  position: relative;
}

.modern-select {
  appearance: menulist-button;
  outline: 0;
  box-shadow: none;
  border: 1px solid #ccc;
  flex: 1;
  padding: 0 1em;
  color: #333;
  background-color: #db4f4f;
  color: #fff;
  cursor: pointer;
}

.modern-select::before {
  content: '\25BC';
  position: absolute;
  top: 0;
  right: 0;
  padding: 0 1em;
  background: #fff;
  cursor: pointer;
  pointer-events: none;
  transition: 0.25s all ease;
}

.select-wrapper:hover .modern-select::before {
  color: #888;
}

.hovered {
  background-color: rgb(1, 102, 102) !important;
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
  width: 200px;
  height: 60px;
  padding: 2px 2px 2px 2px;
  background-color: teal;
  color: white;
  position: fixed;
  bottom: 30px;
  right: 30px;
  border-radius: 5px;
  margin-top: 10px;
  margin-right: 10px;
  cursor: pointer;
  outline: none;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  font-size: 20px;
  font-weight: bold;
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
import AddTodoModal from './AddToDoModall.vue';
import TaskDescriptionModal from './TaskDescriptionModal.vue'; // Import the modal component


axios.defaults.baseURL = 'http://localhost:3000';

export default {
  components: {
    AddTodoModal,
    TaskDescriptionModal, // Register the modal component
  },

  data() {
    return {
      todos: [], // To store the fetched to-do items
      newTodo: '', // To store the value of the new to-do item
      description: '', // To store the value of the description input field
      isAddTodoModalOpen: false, // Control variable for AddTodoModal
      isTaskDescriptionModalOpen: false, // Control variable for TaskDescriptionModal
      taskDescription: '', // To store the description of the task to display in the modal
      activeColumn: 'all',
      isButtonHovered: false,
    };
  },
  computed: {
    // New computed property to filter todos based on the active column
    filteredTodos() {
      if (this.activeColumn === 'all') return this.todos;
      return this.todos.filter(todo => todo.column === this.activeColumn);
    }
  },
  mounted() {
    // Fetch the to-do items from the backend API when the component is mounted
    this.fetchTodos();
  },
  methods: {
    setActiveColumn(column) {
      this.activeColumn = column;
    },
    openModal() {
      this.isAddTodoModalOpen = true; // Open AddTodoModal
    },
    openModalDesc(description) {
      this.isTaskDescriptionModalOpen = true; // Open TaskDescriptionModal
      this.taskDescription = description;
      console.log(description);
      console.log(this.isTaskDescriptionModalOpen);
    },
    closeAddTodoModal() {
      this.isAddTodoModalOpen = false; // Close AddTodoModal
    },
    closeTaskDescriptionModal() {
      this.isTaskDescriptionModalOpen = false; // Close TaskDescriptionModal
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

    addTodo(todoDetails) {
      const token = localStorage.getItem('token');
      if (!token) {
        this.$router.push('/login'); // Redirect to /login using Vue Router
        return; // Exit the function early to prevent further execution
      }

      axios.post('/api/todo', { task: todoDetails.task, description: todoDetails.description }, { headers: { 'Authorization': `Bearer ${token}` } })
        .then((response) => {
          this.todos.push(response.data);
          this.closeAddTodoModal();
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
    async updateStatus(todo) {
      const token = localStorage.getItem('token');
      if (!token) {
        this.$router.push('/login');
        return;
      }
      try {
        const response = await axios.put(`/api/todo/${todo.id}`, { status: todo.status }, { headers: { 'Authorization': `Bearer ${token}` } });
        const updatedTodoIndex = this.todos.findIndex((t) => t.id === response.data.id);
        this.todos[updatedTodoIndex] = response.data;
        this.todos = [...this.todos];
      } catch (error) {
        if (error.response && error.response.status === 403) {
          this.showNotification('You are not authorized to update this to-do item.');
          this.$router.push('/login');
        } else {
          console.error('Error updating the to-do item:', error);
        }
      }
    },

    getDropdownColor(status) {
      switch (status) {
        case 'Pending':
          return { backgroundColor: '#f2d600', color: '#000' };
        case 'In Progress':
          return { backgroundColor: '#ff9f00', color: '#000' };
        case 'Completed':
          return { backgroundColor: '#4caf50', color: '#fff' };
        default:
          return {};
      }
    },
  },
};

</script>