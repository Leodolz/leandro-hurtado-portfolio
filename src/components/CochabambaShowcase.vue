<template>
  <!-- Section for the hometown summary -->
  <section class="hometown-summary">
    <!-- Image for showing at the starting of this section -->
    <img src="https://drive.google.com/uc?export=view&id=11_hnW4eIz7Bo85LLmFflfxC68EpNMeHm"
         alt="An illustration of Cochabamba City viewed from the top of the Christ statue"
         class="front-img"
    />
    <!-- Title of the hometown -->
    <h2>My hometown: Cochabamba</h2>
    <!-- Hometown description -->
    <p>
      I currently reside in Cochabamba, Bolivia. Born and raised! I identify myself as Latino, and I am very happy
      with the heritage that involves, my country is not as popular as some other from the South America region.
      I would like to share that this country involves a giant set of different cultures (Almost 30 different
      cultures!), which means that there is a lot of diversity of mindset and a lot of cultural events.

      My hometown, Cochabamba, is located in the centered-region of Bolivia, which is mostly composed of valleys
      and have a generally warm temperature. This town is one of the three most important cities in Bolivia and
      therefore, it contains a high amount of population alongside with a bigger number of companies that offer
      different kinds of local products and services, it is more known for the places to eat as this town is
      very rich of people that innovated with national dishes such as: Silpancho, Pique Macho, Chicharron, etc.
    </p>
    <!-- Things for Cochabamba for a list loading the fetched items -->
    <h3>Things to do in Cochabamba</h3>
    <!-- If activities were loaded, show this list -->
    <ol v-if="activitiesLoaded">
      <!-- We use v-for for loading all items as we use each item's title and description -->
      <li v-for="thingToDo in thingsToDo" :key="thingToDo.title">
        {{ thingToDo.description }}
      </li>
    </ol>
    <!-- If activities were not loaded yet, show this label -->
    <p v-else>Loading things to do, please wait...</p>
    <!-- Video with previous description -->
    <p>
      A video is given below for things to do in Bolivia by a tourist perspective:
    </p>
    <iframe src="https://www.youtube.com/embed/VbFPyYPcd5U"
            title="YouTube video player" allowfullscreen>
    </iframe>
  </section>
</template>

<script>
export default {
  // Component name and properties passed on
  name: "CochabambaShowcase",
  props: {
    thingsToDo: Array,
    activitiesLoaded: Boolean,
  }
}
</script>

<style scoped>

/* The hometown summary will have a relative size with a relatively wide image */
.hometown-summary img {
  display: flex;
  margin-left: auto;
  margin-right: auto;
}

/*
    For the frame that loads to youtube, this will cover all the screen width and a relative height
*/
iframe {
  width: 100%;
  height: 15em;
}

@media (min-width: 800px) {

  /* The hometown summary will have a relative size with a relatively wide image */
  .hometown-summary img {
    display: initial;
    width: 20em;
  }

  /* The iframe will have a defined size for bigger screens */
  iframe {
    width: 560px;
    height: 315px;
  }

}
</style>