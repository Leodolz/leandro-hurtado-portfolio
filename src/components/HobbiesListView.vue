<template>
  <!-- Section for hobbies -->
  <section class="hobbies-interests">
    <!-- Title for hobby group, we use prop passed on this component -->
    <h2>{{title}}</h2>
    <!-- Description of this list -->
    <p>
      Below I talk about some of my favorite hobbies and passions I have in my personal life
    </p>
    <!-- Load list only if hobbies were loaded -->
    <ol v-if="hobbiesLoaded">
      <!-- Ordered list of hobbies given as props, we use v-for for having an li element for each in the array -->
      <li v-for="hobby in hobbies" :key="hobby.title">
        <!-- Header of this hobby item -->
        <h3>{{hobby.title}}</h3>
        <!-- Image of the hobby item -->
        <img
            :src="hobby.image.source"
            :alt="hobby.image.alt"
        />
        <!-- paragraphs of this hobby item, there is one paragraph for every new line as we use split to turn
         the single description into an array of lines -->
        <p v-for="hobbyParagraph in hobby.description.split('\n')" :key="hobbyParagraph.slice(0, 20)">
          {{hobbyParagraph}}
        </p>
      </li>
    </ol>
    <!-- If hobbies were not loaded yet, please wait -->
    <p v-else>Loading hobbies, please wait...</p>
  </section>
</template>

<script>
export default {
  // Component name and properties passed on by its parent
  name: "HobbiesListView",
  props: {
    title: String,
    hobbies: Array,
    hobbiesLoaded: Boolean,
  }
}
</script>

<style>
@import "@/styles/hobbyStyle.css";
</style>