<template>
  <div class="about">
    <h2>Elmer Leandro Hurtado Dolz : Personal Info</h2>
    <CochabambaShowcase :things-to-do="thingsToDoItems" />
    <HobbiesListView :hobbies="hobbyItems" title="My Hobbies" />
  </div>
</template>


<script>
// @ is an alias to /src
import CochabambaShowcase from "@/components/CochabambaShowcase";
import thingsToDoItems from "@/constants/thingsToDoItems";
import HobbiesListView from "@/components/HobbiesListView";
import hobbyItems from "@/constants/hobbyItems";

export default {
  name: 'PersonalInfoView',
  components: {
    CochabambaShowcase,
    HobbiesListView,
  },
  data() {
    return {
      thingsToDoItems,
      hobbyItems
    }
  }
}
</script>

<style>

.about {
  margin: 2em 2em;
  padding-bottom: 2em;
}

/* In a mobile device, it is better to cover full screen width for card front image */
.front-img {
  width: 100%;
}

</style>

