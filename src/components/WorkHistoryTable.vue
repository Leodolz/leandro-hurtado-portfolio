<template>
  <section class="work-experience"> <!-- Section for talking about work experience -->
    <h2>Work experience</h2>
    <p>
      Below is tabulated my work experience from most recent to least recent, I have worked in different positions
      and a diverse set of languages.
    </p>
    <table> <!-- Table for tabulating work experience in a structured way -->
      <thead>
        <tr> <!-- First row is composed of headers of the table -->
          <th scope="col">Time period</th>
          <th scope="col">Company</th>
          <th scope="col">Position</th>
          <th scope="col">Job Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="workHistoryItem in workHistoryItems" :key="workHistoryItem.timePeriod">
          <td data-label="Time period">{{ workHistoryItem.timePeriod }}</td>
          <td data-label="Company">
            <img :src="workHistoryItem.image.source"
                 :alt="workHistoryItem.image.alt"
            /> <!-- Image of company's logo, better presentation than just naming the company -->
          </td>
          <td data-label="Position">{{ workHistoryItem.position }}</td>
          <td data-label="Job Description">
            <p class="multiline-data-entry">
              {{ workHistoryItem.description }}
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
export default {
  name: "WorkHistoryTable",
  props: {
    workHistoryItems: Array
  }
}
</script>
