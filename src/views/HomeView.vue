<template>
  <div class="home">
    <CardFront header="Elmer Leandro Hurtado Dolz : Biography" />
    <SocialNetworks :social-items="socialItems" />
  </div>
</template>

<script>
// @ is an alias to /src
import CardFront from "@/components/CardFront";
import SocialNetworks from "@/components/SocialNetworks";
import socialItems from "@/constants/socialItems";

export default {
  name: 'HomeView',
  components: {
    SocialNetworks,
    CardFront
  },
  data() {
    return {
      socialItems
    }
  }
}
</script>

<style>

.home {
  padding-bottom: 1em;
}

</style>
