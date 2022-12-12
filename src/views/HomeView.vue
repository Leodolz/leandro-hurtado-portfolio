<template>
  <!-- Home view container -->
  <div class="home">
    <!-- Card front with a header title -->
    <CardFront header="Elmer Leandro Hurtado Dolz : Biography" />
    <!-- Social network items from fetched array -->
    <SocialNetworks :social-items="socialItemsArray" :loaded-social-items="loadedSocialItems" />
  </div>
</template>

<script>
// @ is an alias to /src
import CardFront from "@/components/CardFront";
import SocialNetworks from "@/components/SocialNetworks";
import socialItems from "@/constants/socialItems";
import fetchHelper from "@/helpers/fetchHelper";

export default {
  // Component name and components to be used
  name: 'HomeView',
  components: {
    SocialNetworks,
    CardFront
  },
  data() {
    return {
      socialItemsArray: [],
      loadedSocialItems: false,
    }
  },
  async mounted() {
    await this.loadSocialItems();
  },
  methods: {
    loadSocialItems: async function () {
      // Fetch items from work records url and using work history label
      let items = await fetchHelper.getFetchedItems("/socialItems", "social items",
          socialItems);
      // Set that the process for loading work items finished
      this.loadedSocialItems = true;
      this.socialItemsArray = items;
    }
  }
}
</script>

<style>
@import "@/styles/personalStyle.css";

</style>
