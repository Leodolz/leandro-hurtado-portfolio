<template>
  <NavBar :items="navItems" :active-item=1 />
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import NavBar from "@/components/NavBar";
import navItems from "@/constants/navItems";

export default {
  name: 'App',
  components: {
    NavBar,
    HelloWorld,
  },
  data() {
    return {
      navItems
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
