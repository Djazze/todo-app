<!-- eslint-disable vue/multi-word-component-names -->
<!-- src/views/Register.vue -->
<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="register">
      <input type="text" v-model="username" placeholder="Username" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p> <!-- Error message display -->
    <p v-if="successMessage" class="success">{{ successMessage }}</p> <!-- Success message display -->
  </div>
</template>

<script>
import axios from '@/axios-config';

export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '', // Error message state
      successMessage: '' // Success message state
    };
  },
  methods: {
    async register() {
      // Send registration request to the backend
      try {
        const response = await axios.post('/api/register', {
          username: this.username,
          password: this.password
        });
        if (response.status === 201) {
          this.successMessage = "User registered successfully"; // Success message
          this.$router.push('/login');
        } else {
          // Handle error (e.g., show an error message)
          this.errorMessage = "An error occurred while registering."; // Example error message
        }
      } catch (error) {
        // Handle error (e.g., show an error message)
        if (error.response && error.response.status === 400) {
          this.errorMessage = "Username already exists."; // Specific error for duplicate username
        } else {
          this.errorMessage = "An error occurred while registering."; // General error message
        }
      }
    },
  },
}
</script>

<style>
.error {
    color: red;
}

.success {
    color: green;
}
</style>
