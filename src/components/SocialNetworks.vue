<template>
  <!-- Section covering social media items, we want this to be scalable in the case the social items list grows -->
  <section class="social-media">
    <!-- Header for this section in bold text -->
    <h3><strong>Social Networks</strong></h3>
    <!-- Conditional render of the article social items if they already loaded -->
    <div v-if="loadedSocialItems" id="social-items-container">
      <!-- An article item for each social item given in the array by props -->
      <article v-for="socialItem in socialItems" :key="socialItem.title">
        <!-- Each item has a link reference wrapping an image -->
        <a :href="socialItem.linkPage">
          <!-- Image using as source the attributes from each social item -->
          <img :src="socialItem.image.source"
               class="icon"
               :alt="socialItem.image.alt">
          <p>{{ socialItem.title }}</p>
        </a>
      </article>
    </div>
    <!-- If social link items were not loaded yet, show this render -->
    <p v-else>Loading social links, please wait...</p>
  </section>
</template>

<script>
export default {
  // Name of component and properties passed on from parents
  name: "SocialNetworks",
  props: {
    socialItems: Array,
    loadedSocialItems: Boolean,
  }
}
</script>

<style>
@import "@/styles/personalStyle.css";
</style>