<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="register">
      <input type="text" v-model="username" placeholder="Username" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success">{{ successMessage }}</p>
  </div>
</template>

<script>
import axios from '@/axios-config';

export default {
  name: 'RegisterForm', // Updated component name
  data() {
    return {
      username: '',
      password: '',
      errorMessage: null,
      successMessage: null
    };
  },
  methods: {
    async register() {
      try {
        const response = await axios.post('/api/register', {
          username: this.username,
          password: this.password
        });
        if (response.status === 201) {
          this.successMessage = "User registered successfully";
          this.$router.push('/login');
        } else {
          this.errorMessage = "An error occurred while registering.";
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          this.errorMessage = "Username already exists.";
        } else {
          this.errorMessage = "An error occurred while registering.";
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
