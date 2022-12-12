<template>
  <section class="work-experience"> <!-- Section for talking about work experience -->
    <h2>Work experience</h2>
    <p>
      Below is tabulated my work experience from most recent to least recent, I have worked in different positions
      and a diverse set of languages.
    </p>
    <!-- Conditional rendering of table when work items were loaded -->
    <table v-if="workItemsLoaded"> <!-- Table for tabulating work experience in a structured way -->
      <thead>
        <tr> <!-- First row is composed of headers of the table -->
          <th scope="col">Time period</th>
          <th scope="col">Company</th>
          <th scope="col">Position</th>
          <th scope="col">Job Description</th>
        </tr>
      </thead>
      <tbody>
      <!-- One row for each work history item from the array passed on by props -->
        <tr v-for="workHistoryItem in workHistoryItems" :key="workHistoryItem.timePeriod">
          <!-- Table cell for time period for each work item -->
          <td data-label="Time period">{{ workHistoryItem.timePeriod }}</td>
          <!-- Table cell for company image and source -->
          <td data-label="Company">
            <img :src="workHistoryItem.image.source"
                 :alt="workHistoryItem.image.alt"
            /> <!-- Image of company's logo, better presentation than just naming the company -->
          </td>
          <!-- Table cell for indicating the work history item's position -->
          <td data-label="Position">{{ workHistoryItem.position }}</td>
          <!-- Table cell for describing the job position -->
          <td data-label="Job Description">
            <p class="multiline-data-entry">
              {{ workHistoryItem.description }}
            </p>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- If the table is not rendered because items were not loaded, show thi label -->
    <p v-else>Loading work items, please wait...</p>
  </section>
</template>

<script>
export default {
  // Component name and properties passed on by its parent component
  name: "WorkHistoryTable",
  props: {
    workHistoryItems: Array,
    workItemsLoaded: Boolean,
  }
}
</script>
