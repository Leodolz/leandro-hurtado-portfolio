<template>
  <!-- Container from the about page -->
  <div class="about">
    <!-- Header of this container -->
    <h2>Elmer Leandro Hurtado Dolz : Personal Info</h2>
    <!-- Cochabamba showcase section for showing the things to do -->
    <CochabambaShowcase :things-to-do="activityItems" :activities-loaded="activitiesLoaded" />
    <!-- The hobbies items as a list view, we pass the title and the items -->
    <HobbiesListView :hobbies="hobbies" title="My Hobbies" :hobbies-loaded="hobbiesLoaded" />
  </div>
</template>


<script>
// @ is an alias to /src
import CochabambaShowcase from "@/components/CochabambaShowcase";
import thingsToDoItems from "@/constants/thingsToDoItems";
import HobbiesListView from "@/components/HobbiesListView";
import hobbyItems from "@/constants/hobbyItems";
import fetchHelper from "@/helpers/fetchHelper";

export default {
  // Component name and components to be used inside this template
  name: 'PersonalInfoView',
  components: {
    CochabambaShowcase,
    HobbiesListView,
  },
  data() {
    // Activity and hobby items with their respective flags
    return {
      activityItems: [],
      activitiesLoaded: false,
      hobbies: [],
      hobbiesLoaded: false,
    }
  },
  // Lifecycle method, when mounted load the things to do and hobbies from backend
  async mounted() {
    await this.loadThingsToDo();
    await this.loadHobbies();
  },
  methods: {
    // Method for loading the activity items
    loadThingsToDo: async function () {
      // Fetch items from activity records url and using Cochabamba activities as label
      let fetchedItems = await fetchHelper.getFetchedItems("/activities", "Cochabamba activities",
          thingsToDoItems);
      // Set that the process finished
      this.activitiesLoaded = true;
      this.activityItems = fetchedItems;
    },
    loadHobbies: async function () {
      // Fetch items from hobbies url and using personal hobbies label
      let hobbies = await fetchHelper.getFetchedItems("/hobbies", "personal hobbies",
          hobbyItems);
      // Set that the process for loading hobbies finished
      this.hobbiesLoaded = true;
      this.hobbies = hobbies;
    }
  },
}
</script>

<style>
/* Import style for personal info, no scoped therefore it uses normal css */
@import "@/styles/personalStyle.css";
</style>

