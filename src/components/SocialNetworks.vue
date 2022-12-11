<template>
  <section class="social-media">
    <h3><strong>Social Networks</strong></h3>
    <article v-for="socialItem in socialItems" :key="socialItem.title">
      <a :href="socialItem.linkPage">
        <img :src="socialItem.image.source"
             class="icon"
             :alt="socialItem.image.alt">
        <p>{{ socialItem.title }}</p>
      </a>
    </article>
  </section>
</template>

<script>
export default {
  name: "SocialNetworks",
  props: {
    socialItems: Array
  }
}
</script>

<style scoped>


/* Relative width for normal icons to be clicked in mobile device */
.icon {
  width: 4em;
  margin-right: 1em;
}

/* Social media class text align as we want its clickables to be centered */
.social-media {
  text-align: center;
  margin-left: 1em;
}

/* Format for header in social media should be left */
.social-media h3 {
  text-align: left;
}

/*
    For the article items inside a social media class component, its display should place
    sibling items next to each other
 */
.social-media article {
  display: inline-block;
}

/* In mobile devices we do not show the text, just clickable icons */
.social-media p {
  display: none;
}


@media (min-width: 600px) {
  .icon {
    width: 1.5em;
    margin-right: 0;
  }

  /* Social media class text should be left for this kind of media display */
  .social-media {
    text-align: initial;
    margin-bottom: 2em;
  }

  /* Now we place article elements as default */
  .social-media article {
    display: table;
    margin-bottom: 0.5em;
  }

  /* For this media we do show the text on the social media links */
  .social-media p {
    display: initial;
  }

}

</style>