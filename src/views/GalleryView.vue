<template>
  <!-- Container for having a better appearance -->
  <section id="padded-container">
    <!-- Header of this explanation section -->
    <h1>Cochabamba places Gallery</h1>
    <!-- Description and explanation for the gallery -->
    <p>Below is presented some pictures of Cochabamba places, if hovered we can see how they were in the past</p>
    <p>Feel free to use the settings below for changing the early shown by either click or hovering</p>
    <p>The arrows are for going to next or previous images</p>
  </section>
  <!-- Image slider below -->
  <ImageSlider/>
</template>

<script>

import ImageSlider from "@/components/ImageSlider.vue";

// Name and components to be used here
export default {
  name: "GalleryView",
  components: {ImageSlider},
}
</script>

<style scoped lang="scss">
/* Scoped styling using scss importing from external file */
@import "@/styles/genericStyle.scss";

</style>