<template>
  <header id="top"> <!-- I use top as id for the footer button to work as planned -->
    <nav> <!-- Consistent navigation at header -->
      <router-link v-for="item in items" :to="item.linkPage" :key="item.message">
        {{item.message}}
      </router-link>
    </nav>
  </header>
</template>

<script>

export default {
  // Component name and properties passed on
  name: "NavBar",
  props: {
    items: Array
  }
}
</script>

<style scoped lang="scss">
@import "@/styles/navBarStyle.scss";
</style>