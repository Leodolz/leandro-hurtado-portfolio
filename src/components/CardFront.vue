<template>
  <section class="card-front"> <!-- Using this section as the main content of this page, to be stylized -->
    <h1>{{ header }}</h1> <!-- I put a class to this header for later styling -->
    <img
        class="front-img"
        src="https://drive.google.com/uc?export=view&id=1ziYuEz9zSdGOIv6tUqTvP7JxKpfBnVLG"
        alt="An illustration of Leandro, he has brown hair, wears glasses and a gray jacket"
    />
    <!-- I use this image style format for having the image stay on the left and text on its right, I use em instead of pixels because em is a relative measure and is more stable for different screens -->
    <p> <!-- Paragraph with a summary about myself -->
      I am a software developer residing in Bolivia who is currently studying an MS degree in Software Development
      online at Boston University. My experience in developing applications for a diverse set of environments is
      of 3 years having contributed in different companies in a diverse set of roles. I am always eager to learn
      something new every day and to always interact with different people for having a broader mindset with
      every interaction. I was able to grow in my career starting from being a mentee to being a mentor over time,
      always trying to equip myself with the necessary tools and knowledge and to give back and share my learnings
      to other people.
    </p>
    <p> <!-- Another paragraph summarizing about me -->
      Since I got graduated from a BS in Electronics and Telecommunications, I noticed that my true passion is
      within programming, because this is a field where uniqueness and imagination is a talent and I feel at
      best when I am given the freedom on designing and implementing how to tackle an issue and deliver a
      solution that adapts to the company's needs and adjusts to its mission. My passion has done nothing more
      than growing in this field, making me curious in the different branches of software development and
      programming in general can offer, such fields as frontend programming, backend programming, database design,
      application deployment, data science, etc. I like to challenge myself into learning from each field and
      branch for making me as skillful as possible for being able to reach a higher impact in wherever I decide
      to contribute with my work.
    </p>
  </section>
</template>

<script>
export default {
  name: "CardFront",
  props: {
    header: String
  }
}

//TODO: Download Resume button
</script>

<style scoped>
.contact-info strong {
  font-style: oblique;
}

/* Relative width for mall icons */
.small-icon {
  width: 1em;
}

/* For paragraph items inside this class, we want a specific font family */
.card-front p {
  font-family: "Comic Sans MS", sans-serif;
}

.card-front, .contact-info{
  margin: 1em 1em;
}

.contact-info {
  padding-bottom: 1em;
}

@media (min-width: 600px) {

  /* The card front image should have a relative size and be at the left of some text */
  .card-front img {
    width: 12em;
    float: left;
    margin-right: 2em;
    margin-bottom: 1em;
  }
}
</style>