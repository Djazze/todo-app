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
export default {
    data() {
        return {
            username: '',
            password: ''
        };
    },
    methods: {
        async login() {
            // Send login request to the backend
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: this.username, password: this.password })
            });

            // Handle response
            if (response.ok) {
                const data = await response.json();
                // Store the token and navigate to the home page
                localStorage.setItem('token', data.token);
                this.$router.push('/');
            } else {
                // Handle error (e.g., show an error message)
            }
        }
    }
};
</script>
  