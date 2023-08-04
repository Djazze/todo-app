<!-- eslint-disable vue/multi-word-component-names -->
<!-- src/views/Login.vue -->
<template>
    <div>
        <h1>Login</h1>
        <form @submit.prevent="login">
            <input type="text" v-model="username" placeholder="Username" required />
            <input type="password" v-model="password" placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
    </div>
</template>
  
<script>
import axios from '@/axios-config'; // Import your Axios configuration

export default {
    data() {
        return {
            username: '',
            password: ''
        };
    },
    methods: {
        async login() {
            try {
                // Send login request to the backend
                const response = await axios.post('/api/login', {
                    username: this.username,
                    password: this.password
                });

                // Store the token and navigate to the home page
                localStorage.setItem('token', response.data.token);
                this.$router.push('/');
            } catch (error) {
                // Handle error (e.g., show an error message)
            }
        }
    }
};
</script>
