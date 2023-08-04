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
  </div>
</template>

<script>

import axios from '@/axios-config';

export default {
  
  data() {
    return {
      username: '',
      password: ''
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
        if (response.status === 200) {
          this.$router.push('/login');
        } else {
          // Handle error (e.g., show an error message)
        }
      } catch (error) {
        // Handle error (e.g., show an error message)
      }
    },
  },
}
</script>