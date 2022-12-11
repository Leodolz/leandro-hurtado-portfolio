<template>
    <NavBar :items="navItems"/>
  <router-view/>
</template>

<script>
import NavBar from "@/components/NavBar";
import navItems from "@/constants/navItems";

export default {
  name: 'App',
  components: {
    NavBar
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
  color: #2c3e50;
  margin: 20px 20px;
  background-color: #b8f5e2;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

</style>
