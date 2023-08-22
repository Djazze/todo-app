<!-- src/views/Login.vue -->
<template>
    <div>
        <h1>Login</h1>
        <form @submit.prevent="login">
            <input type="text" v-model="username" placeholder="Username" required />
            <input type="password" v-model="password" placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
</template>

<script>
import axios from '@/axios-config';

export default {
    name: 'LoginForm',
    data() {
        return {
            username: '',
            password: '',
            errorMessage: null
        };
    },
    methods: {
        login: async function () {
            try {
                const response = await axios.post('/api/login', {
                    username: this.username,
                    password: this.password
                });
                localStorage.setItem('token', response.data.token);
                this.$router.push('/');
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    this.errorMessage = 'Invalid credentials';
                } else {
                    this.$router.push('/error'); // Redirect to an error page
                }
            }
        }
    }
};
</script>
