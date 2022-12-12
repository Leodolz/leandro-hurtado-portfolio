<template>
  <!-- Background container -->
  <div class="background">
    <!-- Work history table component where we pass on the props of the work items and a boolean that they loaded -->
    <WorkHistoryTable :work-history-items="workItems" :work-items-loaded="workItemsLoaded"/>
    <!-- Education history table component where we pass the props of the education items and a flag to show that
     they loaded -->
    <EducationHistoryTable :academic-history-items="academicItems" :academic-items-loaded="academicItemsLoaded"/>
  </div>
  <!-- Section containing the resume link -->
  <section id="resume-link">
    <!-- Resume link -->
    <a href="https://cdn.glitch.global/2dde6655-7e97-4432-87fe-f1f52e07f800/LeandroHurtadoCVToDate.pdf">
      Take a look at my resume in PDF
    </a>
  </section>
</template>

<script>
// @ is an alias to /src

import WorkHistoryTable from "@/components/WorkHistoryTable";
import workHistoryItems from "@/constants/workHistoryItems";
import EducationHistoryTable from "@/components/EducationHistoryTable";
import academicHistoryItems from "@/constants/academicHistoryItems";
import fetchHelper from "@/helpers/fetchHelper";

export default {
  // Name and components
  name: 'BackgroundView',
  components: {
    EducationHistoryTable,
    WorkHistoryTable
  },
  // We declare the attributes we can access on this component
  data() {
    return {
      workItems: [],
      academicItems: [],
      // By default, we have not loaded yet the arrays
      academicItemsLoaded: false,
      workItemsLoaded: false,
    }
  },
  // Lifecycle event, if it is mounted, load the arrays needed
  async mounted() {
    // Get the academic history items using async method
    let academicRecords = await this.getAcademicHistoryItems();
    // If these records are indeed an array with size, save these in our state
    if (academicRecords !== null && academicRecords.length > 0) {
      this.academicItems = academicRecords;
    }
    // Get the work items using async method just as above
    let workRecords = await this.getWorkItems();
    // If these records are indeed an array with size, save these in our state
    if (workRecords !== null && workRecords.length > 0) {
      this.workItems = workRecords;
    }
  },
  methods: {
    // Method for loading the academic history items
    getAcademicHistoryItems: async function () {
      // Fetch items from academic records url and using academic history as label
      let fetchedItems = await fetchHelper.getFetchedItems("/academicRecords", "academic history",
          academicHistoryItems);
      // Set that the process finished
      this.academicItemsLoaded = true;
      // Return the fetched items
      return fetchedItems;
    },
    getWorkItems: async function () {
      // Fetch items from work records url and using work history label
      let workItems = await fetchHelper.getFetchedItems("/workRecords", "work history",
          workHistoryItems);
      // Set that the process for loading work items finished
      this.workItemsLoaded = true;
      // Return the fetched items
      return workItems;
    }
  }
}
</script>

<style>
/* Import style from background style, as this is not scoped, we simply use normal css */
@import "@/styles/backgroundStyle.css";

</style>