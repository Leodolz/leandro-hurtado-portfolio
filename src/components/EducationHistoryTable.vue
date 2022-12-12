<template>
  <section class="academic-experience"> <!-- Section for talking about academic experience -->
    <h2>Academic experience</h2>
    <p>
      Below is my academic experience which is sorted from most recent to least recent.
    </p>
    <table v-if="academicItemsLoaded"> <!-- Table for tabulating academic experience in a structured way -->
      <thead>
      <tr> <!-- First row composed of headers -->
        <th scope="col">Time period</th>
        <th scope="col">University</th>
        <th scope="col">Degree</th>
        <th scope="col">Description</th>
      </tr>
      </thead>
      <tbody>
      <!-- Table rows loaded from an array of academicHistory items, there is one row for each item in the array -->
      <tr v-for="academicHistoryItem in academicHistoryItems" :key="academicHistoryItem.timePeriod">
        <!-- Table cell for indicating time period -->
        <td data-label="Time period">{{ academicHistoryItem.timePeriod }}</td>
        <!-- Table cell for indicating -->
        <td data-label="University">
          <img :src="academicHistoryItem.institutionImage.source"
               :alt="academicHistoryItem.institutionImage.alt"
          /> <!-- Image of university's logo, better presentation than just naming the institution -->
        </td>
        <!-- Column for the degree -->
        <td data-label="Degree">
          <!-- Reference to the degree link using the item's attributes -->
          <a :href="academicHistoryItem.degree.link">
            {{ academicHistoryItem.degree.title }}
          </a>
        </td>
        <!-- Column for the degree's description being multiline entry -->
        <td data-label="Description">
          <p class="multiline-data-entry">
            {{ academicHistoryItem.degree.description }}
          </p>
        </td>
      </tr>
      </tbody>
    </table>
    <!-- If educational history items were not loaded yet, we conditionally render this paragraph -->
    <p v-else>Loading educational history items, please wait...</p>
  </section>
</template>

<script>
export default {
  // Component name and properties passed on by parent components
  name: "EducationHistoryTable",
  props: {
    academicHistoryItems: Array,
    academicItemsLoaded: Boolean,
  },
}
</script>
