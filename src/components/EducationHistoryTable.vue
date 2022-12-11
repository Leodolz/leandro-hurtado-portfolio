<template>
  <section class="academic-experience"> <!-- Section for talking about work experience -->
    <h2>Academic experience</h2>
    <p>
      Below is my academic experience which is sorted from most recent to least recent.
    </p>
    <table> <!-- Table for tabulating work experience in a structured way -->
      <thead>
      <tr> <!-- First row composed of headers -->
        <th scope="col">Time period</th>
        <th scope="col">University</th>
        <th scope="col">Degree</th>
        <th scope="col">Description</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="academicHistoryItem in academicHistoryItems" :key="academicHistoryItem.timePeriod">
        <td data-label="Time period">{{ academicHistoryItem.timePeriod }}</td>
        <td data-label="University">
          <img :src="academicHistoryItem.institutionImage.source"
               :alt="academicHistoryItem.institutionImage.alt"
          /> <!-- Image of company's logo, better presentation than just naming the company -->
        </td>
        <td data-label="Degree">
          <a :href="academicHistoryItem.degree.link">
            {{ academicHistoryItem.degree.title }}
          </a>
        </td>
        <td data-label="Description">
          <p class="multiline-data-entry">
            {{ academicHistoryItem.degree.description }}
          </p>
        </td>
      </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
export default {
  name: "EducationHistoryTable",
  props: {
    academicHistoryItems: Array
  },
}
</script>
