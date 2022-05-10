<script setup>
import TheNavbar from "@/components/TheNavbar.vue";
</script>

<template>
  <the-navbar />
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #e2e8f0;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
